import { defineMiddleware } from "astro:middleware";
import { Pathname } from "./config/Pathname";
import { httpClient } from "./api/http";
import { AuthService } from "./api/business/auth/auth.service";
import { CookieName } from "./config/cookies";

const AUTH_ROUTES = [Pathname.LOGIN, Pathname.REGISTER];

export const onRequest = defineMiddleware((context, next) => {
  const isAuthRequest = AUTH_ROUTES.some((route) =>
    context.url.pathname.startsWith(route)
  );

  const token = context.cookies.get(CookieName.BUSINESS_TOKEN);
  const userCookie = context.cookies.get(CookieName.USER);

  const isAuthenticated = token !== undefined;

  if (isAuthenticated) {
    httpClient.setAuthorizationToken(token.value);
  }

  if (isAuthRequest && isAuthenticated) {
    return Response.redirect(
      new URL(Pathname.BUSINESS_DASHBOARD, context.url).toString()
    );
  }

  const isBusinessAppRequest = context.url.pathname.startsWith("/business");

  if (isBusinessAppRequest && !isAuthenticated) {
    return Response.redirect(new URL(Pathname.LOGIN, context.url).toString());
  }

  const hasUser = userCookie !== undefined && userCookie.value !== "";

  if (hasUser) {
    context.locals.user = JSON.parse(decodeURIComponent(userCookie.value));
  }

  if (isBusinessAppRequest && !hasUser) {
    const service = new AuthService();

    return service
      .getMyInfo()
      .then((response) => {
        context.locals.user = response.data.user;
        context.cookies.set(
          CookieName.USER,
          encodeURIComponent(JSON.stringify(response.data.user))
        );

        return next();
      })
      .catch(() => {
        return Response.redirect(
          new URL(Pathname.LOGIN, context.url).toString()
        );
      });
  }

  return next();
});
