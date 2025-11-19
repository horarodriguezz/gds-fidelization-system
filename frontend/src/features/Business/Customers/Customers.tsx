"use client";

import Header from "./Header";
import Content from "./Content/Content";
import Loading from "./Content/Loading";

export default function ClientesPage() {
  return (
    <div className='bg-background min-h-screen'>
      <Header />

      <Loading />

      {/* <Content /> */}
    </div>
  );
}
