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

import { User } from "@/domains/auth/types/User";
import { Result, resultError, resultSuccess } from "@/domains/auth/types/Result";

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
	isEmailValid(email: string): boolean {
		const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return pattern.test(email);
	}

	/**
	 * パスワードが有効かどうかを検証する
	 * @param password 
	 * @returns 
	 */
	isPasswordValide(password: string): boolean  {
		const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		return pattern.test(password);
	}

		/**
	 * factoryメソッドを導入
	 **/ 
		create(userData: User): Result<User> {
			
		}
}