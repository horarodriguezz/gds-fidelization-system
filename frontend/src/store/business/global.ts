import { atom, map } from "nanostores";
import type { UserModel } from "../../api/types/Models/User";

export const sidebarIsOpen = atom(false);

export const userInfo = map<UserModel>();

export const userInfoIsLoading = atom(true);
