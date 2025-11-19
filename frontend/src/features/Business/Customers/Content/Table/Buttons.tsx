import React from "react";
import { Button } from "../../../../../components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { CustomerModel } from "../../../../../api/types/Models/CustomerModel";
import {
  $customerPopupOpen,
  $editingCustomer,
} from "../../../../../store/business/customer";
import { CustomersService } from "../../../../../api/business/customers/customers.service";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "../../../../../components/ui/spinner";
import { queryClient } from "../../../../../lib/queryClient";
import { toast } from "sonner";
import type { ApiError } from "../../../../../api/types/Error";

const service = new CustomersService();

function Buttons(customer: CustomerModel) {
  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [service.getResource()] });

    toast.success("Cliente eliminado correctamente");
  };

  const handleError = (e: ApiError) => {
    toast.error("Error al eliminar el cliente", {
      description: e.data?.message ?? e.message,
    });
  };

  const del = useMutation(
    {
      mutationKey: [service.getResource(), customer.id],
      mutationFn: (customerId: string) => service.deleteCustomer(customerId),
      onSuccess: handleSuccess,
      onError: handleError,
    },
    queryClient
  );

  const handleOpenDialog = (customer: any) => {
    $editingCustomer.set(customer);
    $customerPopupOpen.set(true);
  };

  const handleDelete = (customerId: string) => {
    del.mutate(customerId);
  };

  return (
    <div className='flex items-center justify-end gap-2'>
      <Button
        variant='ghost'
        size='sm'
        onClick={() => handleOpenDialog(customer)}
        disabled={customer.isValidated}
      >
        <Pencil className='h-4 w-4' />
      </Button>

      <Button
        variant='ghost'
        size='sm'
        onClick={() => handleDelete(customer.id)}
        disabled={customer.isValidated}
      >
        {del.status === "pending" ? (
          <Spinner className='w-4 h-4 stroke-destructive' />
        ) : (
          <Trash2 className='h-4 w-4 text-destructive' />
        )}
      </Button>
    </div>
  );
}

export default React.memo(Buttons);
