/**
 * ユーザーモデルの定義
 */
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// ユーザー作成時に必要なプロパティ
export interface CreateUser {
	name: string;
	email: string;
	password: string;
}