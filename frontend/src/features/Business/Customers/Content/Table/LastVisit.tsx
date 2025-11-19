import React from "react";
import type { CustomerBusinessModel } from "../../../../../api/types/Models/CustomerBusinessModel";

function LastVisit(customer: CustomerBusinessModel) {
  if (!customer.lastVisitAt) {
    return <p className='text-sm text-muted-foreground'>-</p>;
  }

  return (
    <p className='text-sm text-muted-foreground'>
      {new Date(customer.lastVisitAt).toLocaleDateString("es-AR")}
    </p>
  );
}

export default React.memo(LastVisit);
