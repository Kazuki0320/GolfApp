import { Email } from "@/domains/auth/valueObjects/Email";

/**
 * 1. ユーザー作成時の入力データ
 */
export interface CreateUser {
  email: string;
  password: string;
}

/**
 * 2. UserEntityの内部状態
 */
export interface UserProps {
  id: string;
  email: Email;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
