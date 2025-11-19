import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import type { CustomerModel } from "../../../../api/types/Models/CustomerModel";
import { Button } from "../../../../components/ui/button";

function CustomerPopup() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerModel | null>(
    null
  );

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {};

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCustomer(null);
    setFormData({ nombre: "", apellido: "", telefono: "", email: "" });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>
            {editingCustomer ? "Editar Cliente" : "Agregar Nuevo Cliente"}
          </DialogTitle>
          <DialogDescription>
            {editingCustomer
              ? "Modifica la información del cliente"
              : "Completa los datos del nuevo cliente"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className='space-y-4 py-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='nombre'>
                  Nombre <span className='text-destructive'>*</span>
                </Label>
                <Input
                  id='nombre'
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='apellido'>Apellido</Label>
                <Input
                  id='apellido'
                  value={formData.apellido}
                  onChange={(e) =>
                    setFormData({ ...formData, apellido: e.target.value })
                  }
                />
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='telefono'>
                Teléfono <span className='text-destructive'>*</span>
              </Label>
              <Input
                id='telefono'
                type='tel'
                placeholder='+54 11 1234-5678'
                value={formData.telefono}
                onChange={(e) =>
                  setFormData({ ...formData, telefono: e.target.value })
                }
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='cliente@email.com'
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={handleCloseDialog}>
              Cancelar
            </Button>
            <Button type='submit'>
              {editingCustomer ? "Guardar Cambios" : "Agregar Cliente"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(CustomerPopup);
