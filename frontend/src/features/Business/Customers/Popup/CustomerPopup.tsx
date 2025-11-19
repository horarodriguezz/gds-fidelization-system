import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Field, FieldError, FieldLabel } from "../../../../components/ui/field";
import { Spinner } from "../../../../components/ui/spinner";
import { useStore } from "@nanostores/react";
import {
  $customerPopupOpen,
  $editingCustomer,
} from "../../../../store/business/customer";
import { CustomersService } from "../../../../api/business/customers/customers.service";
import type { ApiError } from "../../../../api/types/Error";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { queryClient } from "../../../../lib/queryClient";
import useMutation from "../../../../hooks/useMutation";

const schema = z.object({
  first_name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  last_name: z
    .string()
    .max(50, "El apellido no puede tener más de 50 caracteres")
    .optional(),
  phone_number: z
    .string()
    .min(1, "El teléfono es obligatorio")
    .max(20, "El teléfono no puede tener más de 20 caracteres"),
  email: z
    .string()
    .email("El correo electrónico no es válido")
    .optional()
    .or(z.literal("")),
});

const service = new CustomersService();

function CustomerPopup() {
  const editingCustomer = useStore($editingCustomer);

  const isEditing = Boolean(editingCustomer);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: editingCustomer?.firstName || "",
      last_name: editingCustomer?.lastName || "",
      phone_number: editingCustomer?.phoneNumber || "",
      email: editingCustomer?.email || "",
    },
  });

  const handleClose = () => {
    $customerPopupOpen.set(false);
    $editingCustomer.set(undefined);

    form.reset();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    }
  };

  const handleError = (e: ApiError) => {
    if (e.status === 422 && e.data?.errors) {
      const fieldErrors = e.data.errors;

      fieldErrors.forEach((e: any) => {
        form.setError(e.field as keyof z.infer<typeof schema>, {
          type: "server",
          message: e.message,
        });
      });
    } else {
      toast.error(e.data?.message || "Error al completar el registro");
    }
  };

  const handleSuccess = () => {
    toast.success(
      isEditing
        ? "Cliente actualizado exitosamente"
        : "Cliente creado exitosamente"
    );

    queryClient.invalidateQueries({ queryKey: [service.getResource()] });

    handleClose();
  };

  const create = useMutation({
    mutationKey: [service.getResource()],
    mutationFn: (data: z.infer<typeof schema>) => service.createCustomer(data),
    onSuccess: handleSuccess,
    onError: (e: any) => handleError(e),
  });

  const update = useMutation({
    mutationKey: [service.getResource(), editingCustomer?.id],
    mutationFn: (data: z.infer<typeof schema>) =>
      service.updateCustomer(editingCustomer!.id, data),
    onSuccess: handleSuccess,
    onError: (e: any) => handleError(e),
  });

  const isLoading = create.status === "pending" || update.status === "pending";

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (!isEditing) {
      create.mutate(data);
    } else if (editingCustomer?.id) {
      update.mutate(data);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit(onSubmit)();
  };

  useEffect(
    () => () => {
      $editingCustomer.set(undefined);
    },
    []
  );

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Cliente" : "Agregar Nuevo Cliente"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifica la información del cliente"
              : "Completa los datos del nuevo cliente"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className='space-y-4 py-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Controller
                  name='first_name'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className='gap-1'>
                      <FieldLabel htmlFor='first_name'>Nombre</FieldLabel>

                      <Input
                        {...field}
                        id='first_name'
                        aria-invalid={fieldState.invalid}
                        placeholder='Nombre del cliente'
                        autoComplete='off'
                      />

                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className='text-xs'
                        />
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
                      <FieldLabel htmlFor='last_name'>Apellido</FieldLabel>

                      <Input
                        {...field}
                        id='last_name'
                        aria-invalid={fieldState.invalid}
                        placeholder='Apellido del cliente'
                        autoComplete='off'
                      />

                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className='text-xs'
                        />
                      )}
                    </Field>
                  )}
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Controller
                name='phone_number'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className='gap-1'>
                    <FieldLabel htmlFor='phone_number'>Teléfono</FieldLabel>

                    <Input
                      {...field}
                      id='phone_number'
                      aria-invalid={fieldState.invalid}
                      placeholder='+54 11 1234-5678'
                      autoComplete='off'
                    />

                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className='text-xs'
                      />
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
                      placeholder='cliente@email.com'
                      autoComplete='off'
                    />

                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className='text-xs'
                      />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={handleClose}>
              Cancelar
            </Button>

            <Button type='submit' disabled={isLoading}>
              {editingCustomer ? "Guardar Cambios" : "Agregar Cliente"}
              {isLoading && <Spinner className='stroke-background w-4 h-4' />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(CustomerPopup);
