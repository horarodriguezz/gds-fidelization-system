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
import { registerData } from "@/store/auth";
import { Pathname } from "../../../../config/Pathname";
import { APP_NAME } from "../../../../config/app";

const schema = z.object({
  first_name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  last_name: z
    .string()
    .max(50, "El apellido no puede tener más de 50 caracteres")
    .optional(),
  email: z.string().email("El correo electrónico no es válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(30, "La contraseña no puede tener más de 30 caracteres")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
      "La contraseña debe contener al menos 1 minúscula, 1 mayúscula y 1 número."
    ),
  password_confirmation: z
    .string()
    .min(
      8,
      "La confirmación de la contraseña debe tener al menos 8 caracteres"
    ),
  business_name: z
    .string()
    .min(1, "El nombre del negocio es obligatorio")
    .max(100, "El nombre del negocio no puede tener más de 100 caracteres"),
});

function Form() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),

    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      business_name: "",
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (isLoading) {
      return;
    }

    const service = new AuthService();

    setIsLoading(true);

    service
      .register(data)
      .then(() => registerData.set({ email: data.email, success: true }))
      .catch((error: ApiError) => toast.error(error.message))
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
        <h2 className='text-3xl font-bold mb-2'>Crea tu cuenta</h2>
        <p className='text-muted-foreground'>
          Completa el formulario para comenzar gratis
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
            name='business_name'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='gap-1'>
                <FieldLabel htmlFor='business_name'>
                  Nombre de negocio
                </FieldLabel>

                <Input
                  {...field}
                  id='business_name'
                  aria-invalid={fieldState.invalid}
                  placeholder='Mi comercio'
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
            name='first_name'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='gap-1'>
                <FieldLabel htmlFor='first_name'>Tu nombre</FieldLabel>

                <Input
                  {...field}
                  id='first_name'
                  aria-invalid={fieldState.invalid}
                  placeholder='Juan'
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
            name='last_name'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='gap-1'>
                <FieldLabel htmlFor='last_name'>Tu apellido</FieldLabel>

                <Input
                  {...field}
                  id='last_name'
                  aria-invalid={fieldState.invalid}
                  placeholder='Pérez'
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

        <div className='space-y-2'>
          <Controller
            name='password_confirmation'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='gap-1'>
                <FieldLabel htmlFor='password_confirmation'>
                  Confirmar contraseña
                </FieldLabel>

                <Input
                  {...field}
                  id='password_confirmation'
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
          Crear Cuenta
          {isLoading && <Spinner />}
        </Button>
      </form>

      <div className='mt-6 text-center'>
        <p className='text-sm text-muted-foreground'>
          ¿Ya tienes una cuenta?{" "}
          <a
            href={Pathname.LOGIN}
            className='text-primary font-medium hover:underline'
          >
            Inicia sesión
          </a>
        </p>
      </div>

      <div className='mt-6 pt-6 border-t'>
        <p className='text-xs text-center text-muted-foreground'>
          Al registrarte, aceptas nuestros{" "}
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
