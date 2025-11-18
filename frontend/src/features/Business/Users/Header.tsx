import React from "react";
import type { HeaderProps } from "./types";

function Header(props: HeaderProps) {
  const { children } = props;

  return (
    <header className='border-b border-border bg-card'>
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

          {children}
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);
