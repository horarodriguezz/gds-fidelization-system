import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";
import type { CustomerModel } from "../../../../../api/types/Models/CustomerModel";
import concatStrings from "../../../../../lib/utils/concatStrings";
import getAvatarInfo from "../../../../../lib/utils/getAvatarInfo";

function Name(customer: CustomerModel) {
  const avatarInfo = getAvatarInfo(customer.firstName, customer.lastName);

  return (
    <div className='flex items-center gap-3'>
      <Avatar className='h-10 w-10'>
        <AvatarImage src={customer.profilePicture || "/placeholder.svg"} />
        <AvatarFallback
          className={`${avatarInfo.bg} ${avatarInfo.text} font-semibold`}
        >
          {avatarInfo.initials}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className='font-medium text-foreground'>
          {concatStrings([customer.firstName, customer.lastName])}
        </p>
        <p className='text-sm text-muted-foreground'>
          Desde {new Date(customer.createdAt).toLocaleDateString("es-AR")}
        </p>
      </div>
    </div>
  );
}

export default React.memo(Name);
