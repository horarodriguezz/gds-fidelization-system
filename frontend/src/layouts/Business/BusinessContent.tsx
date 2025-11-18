import type React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AuthService } from "../../api/business/auth/auth.service";
import { userInfo, userInfoIsLoading } from "../../store/business/global";

export default function BusinessContent({ children }: React.PropsWithChildren) {
  const [client] = useState(() => new QueryClient());

  const getUserInfo = async () => {
    const authService = new AuthService();

    userInfoIsLoading.set(true);

    const response = await authService.getMyInfo();

    console.log("Fetched User Info:", response.data.user);

    userInfo.set(response.data.user);

    userInfoIsLoading.set(false);
  };

  useEffect(() => {
    client.prefetchQuery({ queryKey: ["my-info"], queryFn: getUserInfo });
  }, []);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
