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

// ASUMIMOS QUE TIENES UN COMPONENTE Textarea. Si no, usa <textarea> HTML y adáptalo.
const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    rows={4}
    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
  />
);

// ---------------------------------------------------------------------
// 1. MODIFICAR ESQUEMA: Quitar contraseñas, añadir mensaje.
// ---------------------------------------------------------------------
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

  // NUEVO CAMPO: Mensaje
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(500, "El mensaje no puede tener más de 500 caracteres"),

  // CAMPOS DE CONTRASEÑA ELIMINADOS
  // password: z.string()....,
  // password_confirmation: z.string()...,
});

// Definimos el tipo de datos del formulario de contacto
type ContactFormData = z.infer<typeof schema>;

function Form() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(schema),

    // 2. ACTUALIZAR VALORES POR DEFECTO: Quitar contraseñas, añadir mensaje.
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      business_name: "",
      message: "", // NUEVO: Valor por defecto para el mensaje
    },
  });

  // 3. ACTUALIZAR FUNCIÓN ON SUBMIT: Cambiar lógica de registro por lógica de contacto
  const onSubmit = (data: ContactFormData) => {
    if (isLoading) {
      return;
    }

    // NOTA: Aquí deberías usar un nuevo servicio para enviar el formulario de contacto.
    // Por ahora, solo simularemos el envío con un timeout.
    // const contactService = new ContactService();

    setIsLoading(true);

    // Simulando la llamada API de contacto
    console.log("Datos de contacto a enviar:", data);

    new Promise((resolve) => setTimeout(resolve, 1500))
      .then(() => {
        // Simular un éxito
        toast.success("¡Mensaje enviado con éxito! Te contactaremos pronto.");
        form.reset(); // Limpiar formulario
      })
      .catch((error: ApiError) =>
        toast.error(error.message || "Ocurrió un error al enviar el mensaje.")
      )
      .finally(() => {
        setIsLoading(false);
      });

    // CÓDIGO DE REGISTRO ORIGINAL ELIMINADO:
    // service.register(data).then(() => registerData.set({ email: data.email, success: true })).catch(...)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit(onSubmit)();
  };

  return (
    <div className="w-full max-w-md">
      <div className="lg:hidden flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Mail className="w-6 h-6 text-primary" />{" "}
          {/* Cambiamos el ícono a Mail */}
        </div>
        <span className="text-2xl font-bold">{APP_NAME}</span>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Contáctanos</h2>{" "}
        {/* Texto modificado */}
        <p className="text-muted-foreground">
          Completa el formulario y te responderemos a la brevedad.
        </p>
      </div>

      <form
        id="contact-form" // ID Modificado
        onSubmit={handleSubmit}
        className="space-y-5"
        method="POST"
        aria-disabled={isLoading}
      >
        {/* Campo: Nombre de negocio */}
        <div className="space-y-2">
          <Controller
            name="business_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor="business_name">
                  Nombre de negocio
                </FieldLabel>
                <Input
                  {...field}
                  id="business_name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Mi comercio"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-xs" />
                )}
              </Field>
            )}
          />
        </div>

        {/* Campo: Nombre */}
        <div className="space-y-2">
          <Controller
            name="first_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor="first_name">Tu nombre</FieldLabel>
                <Input
                  {...field}
                  id="first_name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Juan"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-xs" />
                )}
              </Field>
            )}
          />
        </div>

        {/* Campo: Apellido */}
        <div className="space-y-2">
          <Controller
            name="last_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor="last_name">Tu apellido</FieldLabel>
                <Input
                  {...field}
                  id="last_name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Pérez"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-xs" />
                )}
              </Field>
            )}
          />
        </div>

        {/* Campo: Email */}
        <div className="space-y-2">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor="email">Email de contacto</FieldLabel>{" "}
                {/* Texto modificado */}
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="tu@negocio.com"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-xs" />
                )}
              </Field>
            )}
          />
        </div>

        {/* 4. NUEVO CAMPO: Mensaje (Reemplaza las Contraseñas) */}
        <div className="space-y-2">
          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor="message">Tu Mensaje</FieldLabel>

                <Textarea // Usamos el componente Textarea
                  {...field}
                  id="message"
                  aria-invalid={fieldState.invalid}
                  placeholder="Escribe aquí tu consulta o comentario..."
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-xs" />
                )}
              </Field>
            )}
          />
        </div>

        {/* CAMPOS DE CONTRASEÑA ELIMINADOS
        <div className='space-y-2'> ... Campo 'password' ... </div>
        <div className='space-y-2'> ... Campo 'password_confirmation' ... </div> 
        */}

        <Button className="w-full h-11" size="lg" disabled={isLoading}>
          Enviar Mensaje {/* Texto del botón modificado */}
          {isLoading && <Spinner />}
        </Button>
      </form>

      {/* Eliminamos la sección de "Inicia sesión" ya que es un formulario de Contacto */}
      {/* <div className='mt-6 text-center'> ... </div>
       */}

      <div className="mt-6 pt-6 border-t">
        <p className="text-xs text-center text-muted-foreground">
          {/* Mantenemos términos y privacidad, adaptando el texto */}
          Al enviar este formulario, aceptas nuestros{" "}
          <a href="/terminos" className="underline hover:text-foreground">
            Términos de Servicio
          </a>{" "}
          y{" "}
          <a href="/privacidad" className="underline hover:text-foreground">
            Política de Privacidad
          </a>
        </p>
      </div>
    </div>
  );
}

export default Form;
