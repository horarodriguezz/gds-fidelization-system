import React, { useState } from "react";
import type { UserModel } from "../../../../api/types/Models/User";
import { Button } from "../../../../components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { userPopupData } from "../../../../store/business/users";
import { UsersService } from "../../../../api/business/users/users.service";
import { Spinner } from "../../../../components/ui/spinner";
import { toast } from "sonner";
import { queryClient } from "../../../../lib/queryClient";
import type { ApiError } from "../../../../api/types/Error";

interface Props {
  user: UserModel;
}

function Actions(props: Props) {
  const { user } = props;

  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    userPopupData.set({ isOpen: true, ...user });
  };

  const handleDeleteSuccess = () => {
    toast.success("Usuario eliminado correctamente");

    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const handleError = (e: ApiError) => {
    toast.error(e.data?.title ?? `Error al eliminar el usuario`, {
      description: e.data?.message ?? e.message,
    });
  };

  const handleDelete = () => {
    const service = new UsersService();

    setIsLoading(true);

    service
      .deleteUser(user.id)
      .then(handleDeleteSuccess)
      .catch(handleError)
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className='flex items-center justify-end gap-2'>
      <Button variant='ghost' size='sm' onClick={handleEdit}>
        <Pencil className='h-4 w-4' />
      </Button>

      <Button variant='ghost' size='sm' onClick={handleDelete}>
        {isLoading ? (
          <Spinner className='h-4 w-4' />
        ) : (
          <Trash2 className='h-4 w-4 text-destructive' />
        )}
      </Button>
    </div>
  );
}

export default React.memo(Actions);
