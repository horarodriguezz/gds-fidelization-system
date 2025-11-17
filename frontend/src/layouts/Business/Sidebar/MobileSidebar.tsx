import { Menu } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../../components/ui/sheet";
import { useStore } from "@nanostores/react";
import { sidebarIsOpen } from "../../../store/business/global";
import type React from "react";

export default function MobileSidebar({ children }: React.PropsWithChildren) {
  const open = useStore(sidebarIsOpen);

  const handleChange = (value: boolean) => {
    sidebarIsOpen.set(value);
  };

  return (
    <Sheet open={open} onOpenChange={handleChange}>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Menu className='h-6 w-6' />
        </Button>
      </SheetTrigger>

      <SheetContent side='left' className='w-64 p-0' hideCloseButton>
        {children}
      </SheetContent>
    </Sheet>
  );
}
