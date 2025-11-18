import { Role } from "../../api/types/Enums/Role";

export default function getRoleColor(role: Role) {
  switch (role) {
    case Role.OWNER:
      return "bg-amber-500/10 text-amber-700 border-amber-500/20";
    case Role.ADMIN:
      return "bg-purple-500/10 text-purple-700 border-purple-500/20";
    case Role.USER:
      return "bg-blue-500/10 text-blue-700 border-blue-500/20";
    default:
      return "bg-muted text-muted-foreground";
  }
}
