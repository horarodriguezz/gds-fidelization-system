// src/features/Business/Auth/Contact/Form.tsx (Componente de Contacto)

import { useState } from "react";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { Mail } from "lucide-react"; // Cambiamos Store por Mail
import { zodResolver } from "@hookform/resolvers/zod";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// La siguiente importación de AuthService ya no se usa para contacto,
// la mantendremos como un placeholder o la reemplazaremos por un servicio de Contacto
import { AuthService } from "@/api/business/auth/auth.service";
import { Spinner } from "@/components/ui/spinner";
import type { ApiError } from "@/api/types/Error";
import { toast } from "sonner";
// import { registerData } from "@/store/auth"; // Ya no se usa para Contacto
// import { Pathname } from "../../../../config/Pathname"; // Ya no se usa para Contacto
import { APP_NAME } from "../../../../config/app";
import { Textarea } from "../../../../components/ui/textarea";
import { httpClient } from "../../../../api/http";

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
  business_name: z
    .string()
    .min(1, "El nombre del negocio es obligatorio")
    .max(100, "El nombre del negocio no puede tener más de 100 caracteres"),

  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(500, "El mensaje no puede tener más de 500 caracteres"),
});

type ContactFormData = z.infer<typeof schema>;

function Form() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(schema),

    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      business_name: "",
      message: "",
    },
  });

  const handleError = (e: ApiError) => {
    if (e.status === 422 && e.data?.errors) {
      const fieldErrors = e.data.errors;

      fieldErrors.forEach((e: any) => {
        form.setError(e.field as keyof z.infer<typeof schema>, {
          type: "server",
          message: e.message,
        });
      });

      return;
    }

    toast.error(e.message || "Ocurrió un error al enviar el mensaje.");
  };

  const onSubmit = (data: ContactFormData) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    httpClient
      .post("/contacts", data)
      .then(() => {
        toast.success("¡Mensaje enviado con éxito! Te contactaremos pronto.");
        form.reset();
      })
      .catch(handleError)
      .finally(() => {
        setIsLoading(false);
      });

    new Promise((resolve) => setTimeout(resolve, 1500))
      .then(() => {})
      .catch((error: ApiError) =>
        toast.error(error.message || "Ocurrió un error al enviar el mensaje.")
      )
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
          <Mail className='w-6 h-6 text-primary' />{" "}
        </div>
        <span className='text-2xl font-bold'>{APP_NAME}</span>
      </div>

      <div className='mb-8'>
        <h2 className='text-3xl font-bold mb-2'>Contáctanos</h2>{" "}
        <p className='text-muted-foreground'>
          Completa el formulario y te responderemos a la brevedad.
        </p>
      </div>

      <form
        id='contact-form'
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
                <FieldLabel htmlFor='email'>Email de contacto</FieldLabel>{" "}
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
            name='message'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='gap-1'>
                <FieldLabel htmlFor='message'>Tu Mensaje</FieldLabel>

                <Textarea
                  {...field}
                  id='message'
                  aria-invalid={fieldState.invalid}
                  placeholder='Escribe aquí tu consulta o comentario...'
                  autoComplete='off'
                  className='h-[90px]'
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className='text-xs' />
                )}
              </Field>
            )}
          />
        </div>

        <Button className='w-full h-11' size='lg' disabled={isLoading}>
          Enviar Mensaje
          {isLoading && <Spinner />}
        </Button>
      </form>

      <div className='mt-6 pt-6 border-t'>
        <p className='text-xs text-center text-muted-foreground'>
          Al enviar este formulario, aceptas nuestros{" "}
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
