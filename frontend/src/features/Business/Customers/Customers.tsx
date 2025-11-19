"use client";

import Header from "./Header";
import Content from "./Content/Content";
import Loading from "./Content/Loading";
import useCustomers from "./hooks/useCustomers";
import { useStore } from "@nanostores/react";
import { $customerPopupOpen } from "../../../store/business/customer";
import CustomerPopup from "./Popup/CustomerPopup";

export default function ClientesPage() {
  const customerPopupOpen = useStore($customerPopupOpen);

  const { isPending } = useCustomers();

  return (
    <div className='bg-background min-h-screen'>
      <Header />

      {isPending ? <Loading /> : <Content />}

      {customerPopupOpen && <CustomerPopup />}
    </div>
  );
}
