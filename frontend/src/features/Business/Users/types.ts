import type { UserModel } from "../../../api/types/Models/User";

export interface HeaderProps {
  children: React.ReactNode;
}

export interface CreateButtonProps {
  disabled?: boolean;
}

export interface ContentProps {
  data: UserModel[];
}
