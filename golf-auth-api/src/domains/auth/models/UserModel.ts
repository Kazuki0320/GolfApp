import { CreateUser, User } from "@/domains/auth/types/User";
import { Result, resultError, resultSuccess } from "@/domains/auth/types/Result";
import { generateId } from "@/infrastructure/adapters/generateId";

/**
 * ユーザーモデルの定義
 */

class UserEntity {
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
  private static isPasswordValid(password: string): boolean {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return pattern.test(password);
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

    if (!UserEntity.isPasswordValid(userData.password)) {
      return resultError(new Error("パスワードが無効です"));
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