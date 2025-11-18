import React from "react";
import { Button } from "../../../components/ui/button";
import {
  Crown,
  Mail,
  Pencil,
  Phone,
  Plus,
  Shield,
  Trash2,
  UserCog,
} from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { UsersService } from "../../../api/business/users/users.service";
import getAvatarInfo from "../../../lib/utils/getAvatarInfo";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import getRoleColor from "../../../lib/utils/getRoleColor";
import { Badge } from "../../../components/ui/badge";
import { Role } from "../../../api/types/Enums/Role";
import getRoleName from "../../../lib/utils/getRoleName";
import { queryClient } from "../../../lib/queryClient";

const service = new UsersService();

function Users() {
  const {
    data: response,
    error,
    isLoading,
  } = useQuery(
    {
      queryKey: ["users"],
      queryFn: service.getUsers.bind(service),
    },
    queryClient
  );

  const handleOpenDialog = (user?: any) => {
    // Lógica para abrir el diálogo de agregar/editar usuario
  };

  const handleDelete = (userId: string) => {
    // Lógica para eliminar usuario
  };

  const paginatedUsers = response?.data.users || [];

  return (
    <div className='bg-background min-h-screen'>
      <div className='border-b border-border bg-card'>
        <div className='container mx-auto px-4 sm:px-6 py-4 sm:py-6'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-foreground'>
                Usuarios
              </h1>
              <p className='text-muted-foreground mt-1 text-sm sm:text-base'>
                Gestiona los usuarios del sistema y sus permisos
              </p>
            </div>

            <Button
              onClick={() => handleOpenDialog()}
              className='w-full sm:w-auto'
            >
              <Plus className='h-4 w-4 mr-2' />
              Agregar Usuario
            </Button>
          </div>
        </div>
      </div>

      <main className='container mx-auto px-4 sm:px-6 py-6 sm:py-8'>
        {/* Stats Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
          <Card>
            <CardContent className='p-3 sm:p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Total Usuarios
                  </p>
                  <p className='text-2xl font-bold text-foreground mt-1'>{5}</p>
                </div>
                <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center'>
                  <UserCog className='h-6 w-6 text-primary' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-3 sm:p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Administradores
                  </p>
                  <p className='text-2xl font-bold text-foreground mt-1'>{5}</p>
                </div>
                <div className='h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center'>
                  <Shield className='h-6 w-6 text-purple-600' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-3 sm:p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Usuarios Regulares
                  </p>
                  <p className='text-2xl font-bold text-foreground mt-1'>{5}</p>
                </div>
                <div className='h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center'>
                  <UserCog className='h-6 w-6 text-blue-600' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-3 sm:p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Usuarios Activos
                  </p>
                  <p className='text-2xl font-bold text-foreground mt-1'>
                    {20}
                  </p>
                </div>
                <div className='h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center'>
                  <Shield className='h-6 w-6 text-green-600' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='border-b border-border bg-muted/50'>
                <tr>
                  <th className='text-left p-4 font-semibold text-sm text-muted-foreground whitespace-nowrap'>
                    Usuario
                  </th>
                  <th className='text-left p-4 font-semibold text-sm text-muted-foreground whitespace-nowrap'>
                    Contacto
                  </th>
                  <th className='text-left p-4 font-semibold text-sm text-muted-foreground whitespace-nowrap'>
                    Rol
                  </th>
                  <th className='text-left p-4 font-semibold text-sm text-muted-foreground whitespace-nowrap'>
                    Estado
                  </th>
                  <th className='text-right p-4 font-semibold text-sm text-muted-foreground whitespace-nowrap'>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className='text-center p-8 text-muted-foreground'
                    >
                      No se encontraron usuarios
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user) => {
                    const avatarInfo = getAvatarInfo(
                      user.firstName,
                      user.lastName
                    );
                    return (
                      <tr
                        key={user.id}
                        className='border-b border-border hover:bg-muted/50'
                      >
                        <td className='p-4 whitespace-nowrap'>
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
                                Desde{" "}
                                {new Date(user.createdAt).toLocaleDateString(
                                  "es-AR"
                                )}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className='p-4 whitespace-nowrap'>
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
                        </td>
                        <td className='p-4 whitespace-nowrap'>
                          <Badge
                            variant='outline'
                            className={getRoleColor(user.role)}
                          >
                            {user.role === Role.OWNER && (
                              <Crown className='h-3 w-3 mr-1' />
                            )}

                            {getRoleName(user.role)}
                          </Badge>
                        </td>
                        <td className='p-4 whitespace-nowrap'>
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
                        </td>
                        <td className='p-4 whitespace-nowrap'>
                          <div className='flex items-center justify-end gap-2'>
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => handleOpenDialog(user)}
                            >
                              <Pencil className='h-4 w-4' />
                            </Button>
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => handleDelete(user.id)}
                            >
                              <Trash2 className='h-4 w-4 text-destructive' />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default React.memo(Users);
