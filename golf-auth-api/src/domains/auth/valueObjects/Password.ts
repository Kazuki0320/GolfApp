import { Result, resultError, resultSuccess } from "../types/Result";

export class Password {
	private readonly password: string;

	private constructor(value: string) {
		this.password = value;
	}

	static create(password: string): Result<Password> {
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

    return resultSuccess(new Password(password));
  }

	getValue(): string {
		return this.password;
	}
}