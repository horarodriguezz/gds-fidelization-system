import type { ColumnDef } from "@tanstack/react-table";
import type { UserModel } from "../../../../api/types/Models/User";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";
import getAvatarInfo from "../../../../lib/utils/getAvatarInfo";
import { Crown, Mail, Pencil, Phone, Trash2 } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import getRoleColor from "../../../../lib/utils/getRoleColor";
import { Role } from "../../../../api/types/Enums/Role";
import getRoleName from "../../../../lib/utils/getRoleName";
import { Button } from "../../../../components/ui/button";
import { CookieName } from "../../../../config/cookies";
import Actions from "./Actions";

export const columns: ColumnDef<UserModel>[] = [
  {
    accessorKey: "firstName",
    header: "Usuario",
    cell: ({ row }) => {
      const user = row.original;

      const avatarInfo = getAvatarInfo(user.firstName, user.lastName);

      return (
        <div className='flex items-center gap-3'>
          <Avatar className='h-10 w-10'>
            <AvatarFallback
              className={`${avatarInfo.bg} ${avatarInfo.text} font-semibold`}
            >
              {avatarInfo.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className='font-medium text-foreground'>
              {user.firstName} {user.lastName}
            </p>
            <p className='text-sm text-muted-foreground'>
              Desde {new Date(user.createdAt).toLocaleDateString("es-AR")}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Contacto",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className='space-y-1'>
          <div className='flex items-center gap-2 text-sm text-foreground'>
            <Mail className='h-3 w-3 text-muted-foreground' />
            {user.email}
          </div>
          {user.phoneNumber && (
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Phone className='h-3 w-3' />
              {user.phoneNumber}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Rol",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Badge variant='outline' className={getRoleColor(user.role)}>
          {user.role === Role.OWNER && <Crown className='h-3 w-3 mr-1' />}

          {getRoleName(user.role)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Estado",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Badge
          variant='outline'
          className={
            user.isActive
              ? "bg-green-500/10 text-green-700 border-green-500/20"
              : "bg-gray-500/10 text-gray-700 border-gray-500/20"
          }
        >
          {user.isActive ? "Activo" : "Inactivo"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const user = row.original;

      return <Actions user={user} />;
    },
  },
];
