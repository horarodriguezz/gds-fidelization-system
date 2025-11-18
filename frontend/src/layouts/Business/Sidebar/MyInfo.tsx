import getRoleName from "../../../lib/utils/getRoleName";
import concatStrings from "../../../lib/utils/concatStrings";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import getAvatarInfo from "../../../lib/utils/getAvatarInfo";
import { Role } from "../../../api/types/Enums/Role";

const user = {
  firstName: "Juan",
  lastName: "Pérez",
  role: Role.ADMIN,
};

export default function MyInfo() {
  const avatarInfo = getAvatarInfo(user.firstName, user.lastName);

  return (
    <div className='flex items-center gap-3 rounded-lg bg-sidebar-accent/50 px-3 py-2.5'>
      <Avatar className='h-8 w-8'>
        <AvatarFallback
          className={`${avatarInfo.bg} ${avatarInfo.text} font-semibold`}
        >
          {avatarInfo.initials}
        </AvatarFallback>
      </Avatar>

      <div className='flex flex-col'>
        <span className='text-sm font-medium text-sidebar-foreground'>
          {concatStrings([user.firstName, user.lastName])}
        </span>
        <span className='text-xs text-muted-foreground'>
          {getRoleName(user.role)}
        </span>
      </div>
    </div>
  );
}
