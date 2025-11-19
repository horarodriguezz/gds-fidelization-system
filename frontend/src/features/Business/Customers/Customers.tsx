"use client";

import Header from "./Header";
import Content from "./Content/Content";
import Loading from "./Content/Loading";
import useCustomers from "./hooks/useCustomers";

export default function ClientesPage() {
  const { isPending } = useCustomers();

  return (
    <div className='bg-background min-h-screen'>
      <Header />

      {isPending ? <Loading /> : <Content />}
    </div>
  );
}
