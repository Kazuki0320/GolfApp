import { CreateUser, User } from "@/domains/auth/types/User";
import { Result, resultError, resultSuccess } from "@/domains/auth/types/Result";
import { generateId } from "@/infrastructure/adapters/generateId";

/**
 * ユーザーモデルの定義
 */

export class UserEntity {
	private readonly user: User;

	private constructor(userData: User) {
		this.user = {
			id: userData.id,
			name: userData.name,
			email: userData.email,
			password: userData.password,
			createdAt: userData.createdAt || new Date(),
			updatedAt: userData.updatedAt || new Date(),
		}
	}

	/**
	 * メールアドレスのバリデーション
	 * @param email 検証するメールアドレス
	 * @returns boolean
	 */
	private static isEmailValid(email: string): boolean {
		const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return pattern.test(email);
	}

  /**
   * パスワードが有効かどうかを検証する
   * @param password 
   * @returns boolean
   */
  private static isPasswordValid(password: string): Result<void> {
    // 空文字チェック
    if (!password) {
      return resultError(new Error("パスワードは数字のみで入力してください"));
    }

    // 数字のみであることを確認（先にチェック）
    if (!/^\d+$/.test(password)) {
      return resultError(new Error("パスワードは数字のみで入力してください"));
    }

    // 8文字以上であることを確認（後でチェック）
    if (password.length < 8) {
      return resultError(new Error("パスワードは8文字以上で入力してください"));
    }

    return resultSuccess(undefined);
  }

  /**
   * ユーザーデータを取得
   */
  getUser(): User {
    return { ...this.user };
  }

  /**
   * ファクトリーメソッド
   * @param userData ユーザーデータ
   * @returns Result<UserEntity>
   */
  static create(userData: CreateUser): Result<UserEntity> {

    if (!UserEntity.isEmailValid(userData.email)) {
      return resultError(new Error("メールアドレスが無効です"));
    }

    const passwordValidation = UserEntity.isPasswordValid(userData.password);
    if (!passwordValidation.success) {
      return resultError(passwordValidation.error);
    }

    const user: User = {
      id: generateId(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const model = new UserEntity(user);
    return resultSuccess(model);
  }
}