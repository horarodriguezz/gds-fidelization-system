import React from "react";
import { Button } from "../../../../../components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { CustomerModel } from "../../../../../api/types/Models/CustomerModel";

function Buttons(customer: CustomerModel) {
  const handleOpenDialog = (customer: any) => {
    // Logic to open edit dialog
  };

  const handleDelete = (customerId: string) => {
    // Logic to delete customer
  };

  return (
    <div className='flex items-center justify-end gap-2'>
      <Button
        variant='ghost'
        size='sm'
        onClick={() => handleOpenDialog(customer)}
      >
        <Pencil className='h-4 w-4' />
      </Button>
      <Button
        variant='ghost'
        size='sm'
        onClick={() => handleDelete(customer.id)}
      >
        <Trash2 className='h-4 w-4 text-destructive' />
      </Button>
    </div>
  );
}

export default React.memo(Buttons);
