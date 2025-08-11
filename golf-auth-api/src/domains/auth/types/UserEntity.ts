import { Email } from "@/domains/auth/valueObjects/Email";
import { Password } from "@/domains/auth/valueObjects/Password";

/**
 * UserEntityの内部状態
 */
export interface UserProps {
  id: string;
  email: Email;
  password: Password;
  createdAt: Date;
  updatedAt: Date;
}
