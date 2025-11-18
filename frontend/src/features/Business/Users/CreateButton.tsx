import React from "react";
import type { CreateButtonProps } from "./types";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";

function CreateButton(props: CreateButtonProps) {
  const { disabled } = props;

  return (
    <Button className='w-full sm:w-auto' disabled={disabled}>
      <Plus className='h-4 w-4' />
      Agregar Usuario
    </Button>
  );
}

export default React.memo(CreateButton);
