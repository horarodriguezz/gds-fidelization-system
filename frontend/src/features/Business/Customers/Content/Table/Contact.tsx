import React from "react";
import type { CustomerModel } from "../../../../../api/types/Models/CustomerModel";
import { Mail, Phone } from "lucide-react";

function Contact(customer: CustomerModel) {
  return (
    <div className='space-y-1'>
      <div className='flex items-center gap-2 text-sm text-foreground'>
        <Phone className='h-3 w-3 text-muted-foreground' />
        {customer.phoneNumber}
      </div>
      {customer.email && (
        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
          <Mail className='h-3 w-3' />
          {customer.email}
        </div>
      )}
    </div>
  );
}

export default React.memo(Contact);
