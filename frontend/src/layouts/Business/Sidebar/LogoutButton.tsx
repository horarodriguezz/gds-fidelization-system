import { LogOut } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { AuthService } from "../../../api/business/auth/auth.service";
import { useState } from "react";
import { Spinner } from "../../../components/ui/spinner";
import { toast } from "sonner";
import { Pathname } from "../../../config/Pathname";
import { CookieName } from "../../../config/cookies";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    const service = new AuthService();

    setIsLoading(true);

    service
      .logout()
      .then(() => {
        cookieStore.delete(CookieName.BUSINESS_TOKEN);

        cookieStore.delete(CookieName.USER);

        window.location.href = Pathname.LOGIN;
        toast.success("Sesión cerrada correctamente");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Button
      variant='ghost'
      onClick={handleClick}
      className='w-full cursor-pointer justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground mb-3'
    >
      <LogOut className='h-5 w-5' />
      Cerrar sesión
      {isLoading && <Spinner className='ml-auto' />}
    </Button>
  );
}
