import React from "react";
import type { CreateButtonProps } from "./types";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { userPopupData } from "../../../store/business/users";

function CreateButton(props: CreateButtonProps) {
  const { disabled } = props;

  const handleClick = () => {
    userPopupData.set({ isOpen: true });
  };

  return (
    <Button
      className='w-full sm:w-auto'
      disabled={disabled}
      onClick={handleClick}
    >
      <Plus className='h-4 w-4' />
      Agregar Usuario
    </Button>
  );
}

export default React.memo(CreateButton);
