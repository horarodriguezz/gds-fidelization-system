import { useStore } from "@nanostores/react";
import { registerData } from "@/store/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CircleCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pathname } from "../../../../config/Pathname";

function SuccessDialog() {
  const data = useStore(registerData);

  const handleCloseConfirmation = () => {
    registerData.set({ success: false, email: "" });

    window.location.href = Pathname.LOGIN;
  };

  return (
    <Dialog open={data.success} onOpenChange={handleCloseConfirmation}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <div className='flex justify-center mb-4'>
            <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center'>
              <Mail className='w-8 h-8 text-primary' />
            </div>
          </div>

          <DialogTitle className='text-center text-2xl'>
            ¡Revisa tu email!
          </DialogTitle>

          <DialogDescription className='text-center text-base pt-2'>
            Hemos enviado un correo de confirmación a{" "}
            <strong className='text-foreground'>{data.email}</strong>
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4 pt-4'>
          <div className='bg-muted/50 rounded-lg p-4 space-y-2'>
            <div className='flex items-start gap-3'>
              <CircleCheck className='w-5 h-5 text-primary mt-0.5 shrink-0' />
              <p className='text-sm text-muted-foreground'>
                Haz clic en el enlace del correo para activar tu cuenta
              </p>
            </div>
            <div className='flex items-start gap-3'>
              <CircleCheck className='w-5 h-5 text-primary mt-0.5 shrink-0' />
              <p className='text-sm text-muted-foreground'>
                Si no lo ves, revisa tu carpeta de spam
              </p>
            </div>
          </div>

          <Button
            onClick={handleCloseConfirmation}
            className='w-full'
            size='lg'
          >
            Ir al inicio de sesión
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessDialog;
