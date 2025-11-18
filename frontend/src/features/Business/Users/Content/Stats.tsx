import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Shield, UserCog } from "lucide-react";
import type { ContentProps } from "../types";
import { Role } from "../../../../api/types/Enums/Role";

function Stats(data: ContentProps) {
  const { data: users } = data;

  const totalUsers = users.length;
  const adminUsers = users.filter((user) => user.role === Role.ADMIN).length;
  const regularUsers = users.filter((user) => user.role === Role.USER).length;
  const activeUsers = users.filter((user) => user.isActive).length;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
      <Card>
        <CardContent className='p-3 sm:p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-muted-foreground'>Total Usuarios</p>
              <p className='text-2xl font-bold text-foreground mt-1'>
                {totalUsers}
              </p>
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
              <p className='text-sm text-muted-foreground'>Administradores</p>
              <p className='text-2xl font-bold text-foreground mt-1'>
                {adminUsers}
              </p>
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
              <p className='text-2xl font-bold text-foreground mt-1'>
                {regularUsers}
              </p>
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
              <p className='text-sm text-muted-foreground'>Usuarios Activos</p>
              <p className='text-2xl font-bold text-foreground mt-1'>
                {activeUsers}
              </p>
            </div>
            <div className='h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center'>
              <Shield className='h-6 w-6 text-green-600' />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default React.memo(Stats);
