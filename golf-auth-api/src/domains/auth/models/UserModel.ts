/**
 * Q.ユーザーのモデルはどの属性を持つべきか？
 * A.ユーザーのモデルは以下の属性を持つべきです。
 * - ユーザーID
 * - ユーザー名
 * -　メールアドレス
 * - パスワード
 * - 作成日時
 * - 更新日時
 * 
 * Q.ユーザーのモデルはどのような振る舞いを持つべきか？
 * - isEmailValid()
 * 	- メールアドレスが有効かどうかを検証する
 * - isPasswordValid()
 * 	- パスワードが有効かどうかを検証する
 */

import { CreateUser, User } from "@/domains/auth/types/User";
import { Result, resultError, resultSuccess } from "@/domains/auth/types/Result";
import { generateId } from "@/infrastructure/adapters/generateId";
/**
 * ユーザーモデルの定義
 */

class UserModel {
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
   * @returns Result<User>
   */
  static create(userData: CreateUser): Result<UserModel> {

		const user: User = {
			id: generateId(),
			name: userData.name,
			email: userData.email,
			password: userData.password,
			createdAt: new Date(),
			updatedAt: new Date(),
		}

    if (!UserModel.isEmailValid(userData.email)) {
      return resultError(new Error("メールアドレスが無効です"));
    }

    if (!UserModel.isPasswordValid(userData.password)) {
      return resultError(new Error("パスワードが無効です"));
    }

    const model = new UserModel(user);
    return resultSuccess(model);
  }
}