export interface CustomerModel {
  id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phoneNumber: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
  isValidated: boolean;
}
