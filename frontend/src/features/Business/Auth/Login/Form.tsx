import { useState } from "react";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { Store } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthService } from "@/api/business/auth/auth.service";
import { Spinner } from "@/components/ui/spinner";
import type { ApiError } from "@/api/types/Error";
import { toast } from "sonner";
import { Pathname } from "../../../../config/Pathname";
import { APP_NAME } from "../../../../config/app";
import { HttpStatusCode } from "axios";
import type { LoginResponseData } from "../../../../api/business/auth/auth.types";
import type { SuccessResponse } from "../../../../api/types/Response";
import { ErrorSubCode } from "../../../../api/types/ErrorSubCode";
import { notVerifyPopupData } from "../../../../store/auth";
import { CookieName } from "../../../../config/cookies";

const schema = z.object({
  email: z.string().email("El correo electrónico no es válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(30, "La contraseña no puede tener más de 30 caracteres")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
      "La contraseña debe contener al menos 1 minúscula, 1 mayúscula y 1 número."
    ),
});

function Form() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSuccess = (r: SuccessResponse<LoginResponseData>) => {
    toast.success("Inicio de sesión exitoso");

    cookieStore.set(CookieName.BUSINESS_TOKEN, r.data.token);

    window.location.href = Pathname.BUSINESS_DASHBOARD;
  };

  const handleError = (error: ApiError) => {
    if (error.status === HttpStatusCode.Unauthorized) {
      form.setError("password", { message: error.message });
      form.setError("email", { message: error.message });

      return;
    }

    if (
      error.status === HttpStatusCode.Forbidden &&
      error.subcode === ErrorSubCode.EMAIL_NOT_VERIFIED
    ) {
      notVerifyPopupData.set({ show: true, email: form.getValues("email") });

      return;
    }

    toast.error(error.data?.title, {
      position: "bottom-right",
      description: error.data?.message,
    });
  };

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (isLoading) {
      return;
    }

    const service = new AuthService();

    setIsLoading(true);

    service
      .login(data)
      .then(handleSuccess)
      .catch(handleError)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    form.handleSubmit(onSubmit)();
  };

  return (
    <div className='w-full max-w-md'>
      <div className='lg:hidden flex items-center gap-3 mb-8'>
        <div className='w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center'>
          <Store className='w-6 h-6 text-primary' />
        </div>
        <span className='text-2xl font-bold'>{APP_NAME}</span>
      </div>

      <div className='mb-8'>
        <h2 className='text-3xl font-bold mb-2'>Bienvenido</h2>
        <p className='text-muted-foreground'>
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </div>

      <form
        id='register-form'
        onSubmit={handleSubmit}
        className='space-y-5'
        method='POST'
        aria-disabled={isLoading}
      >
        <div className='space-y-2'>
          <Controller
            name='email'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='gap-1'>
                <FieldLabel htmlFor='email'>Email</FieldLabel>

                <Input
                  {...field}
                  id='email'
                  aria-invalid={fieldState.invalid}
                  placeholder='tu@negocio.com'
                  autoComplete='off'
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className='text-xs' />
                )}
              </Field>
            )}
          />
        </div>

        <div className='space-y-2'>
          <Controller
            name='password'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='gap-1'>
                <FieldLabel htmlFor='password'>Contraseña</FieldLabel>

                <Input
                  {...field}
                  id='password'
                  type='password'
                  aria-invalid={fieldState.invalid}
                  placeholder='••••••••'
                  autoComplete='off'
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className='text-xs' />
                )}
              </Field>
            )}
          />
        </div>

        <Button className='w-full h-11' size='lg' disabled={isLoading}>
          Iniciar Sesión
          {isLoading && <Spinner />}
        </Button>
      </form>

      <div className='mt-8 text-center'>
        <p className='text-sm text-muted-foreground'>
          ¿No tienes una cuenta?{" "}
          <a
            href={Pathname.REGISTER}
            className='text-primary font-medium hover:underline'
          >
            Regístrate gratis
          </a>
        </p>
      </div>

      <div className='mt-8 pt-8 border-t'>
        <p className='text-xs text-center text-muted-foreground'>
          Al iniciar sesión, aceptas nuestros{" "}
          <a href='/terminos' className='underline hover:text-foreground'>
            Términos de Servicio
          </a>{" "}
          y{" "}
          <a href='/privacidad' className='underline hover:text-foreground'>
            Política de Privacidad
          </a>
        </p>
      </div>
    </div>
  );
}

export default Form;
