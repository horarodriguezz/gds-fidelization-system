import React from "react";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { $customerPopupOpen } from "../../../store/business/customer";

function Header() {
  const handleOpenDialog = () => {
    $customerPopupOpen.set(true);
  };

  return (
    <div className='border-b border-border bg-card'>
      <div className='container mx-auto px-4 sm:px-6 py-4 sm:py-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold text-foreground'>
              Clientes
            </h1>
            <p className='text-muted-foreground mt-1 text-sm sm:text-base'>
              Gestiona tus clientes y su actividad de puntos
            </p>
          </div>

          <Button onClick={handleOpenDialog} className='w-full sm:w-auto'>
            <Plus className='h-4 w-4' />
            Agregar Cliente
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Header);
