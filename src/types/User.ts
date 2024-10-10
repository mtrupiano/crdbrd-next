import { UserRole } from "./UserRole";

export type User = {
  readonly email: string;
  readonly id: number;
  readonly role: UserRole;
};
