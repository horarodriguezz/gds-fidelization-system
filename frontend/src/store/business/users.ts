import { map } from "nanostores";
import type { UserModel } from "../../api/types/Models/User";

interface UserPopupData extends Partial<UserModel> {
  isOpen: boolean;
}

export const userPopupData = map<UserPopupData>({
  isOpen: false,
});
