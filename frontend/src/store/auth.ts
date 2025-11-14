import { map } from "nanostores";

export const registerData = map({ success: false, email: "" });

export const notVerifyPopupData = map({ show: false, email: "" });
