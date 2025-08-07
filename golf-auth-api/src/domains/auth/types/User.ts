/**
 * ユーザーモデルの定義
 */
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ユーザー作成時に必要なデータ
 */
export interface CreateUser {
  email: string;
  password: string;
}