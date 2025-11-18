import { Role } from "../../api/types/Enums/Role";

export default function getRoleName(role: Role): string {
  switch (role) {
    case Role.ADMIN:
      return "Administrador";
    case Role.USER:
      return "Usuario";
    case Role.OWNER:
      return "Propietario";
    default:
      return "Desconocido";
  }
}
