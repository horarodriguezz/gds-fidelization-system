export interface CustomerModel {
  id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phoneNumber: string;
  profilePictureUrl?: string;
  pointsBalance: number;
  createdAt: string;
  updatedAt: string;
}
