export class Password {
  private constructor(private readonly value: string) {
    this.validate(value);
  }

  /**
   * ファクトリーメソッド
   * @throws {Error} バリデーションエラー時
   */
  static create(password: string): Password {
    return new Password(password);
  }

  private validate(password: string): void {
    if (!password) {
      throw new Error("パスワードは必須です");
    }
    if (!this.isNumericOnly(password)) {
      throw new Error("パスワードは数字のみで入力してください");
    }
    if (!this.isValidLength(password)) {
      throw new Error("パスワードは8文字以上で入力してください");
    }
  }

  private isNumericOnly(password: string): boolean {
    return /^\d+$/.test(password);
  }

  private isValidLength(password: string): boolean {
    return password.length >= 8;
  }

  toString(): string {
    return this.value;
  }

  equals(other: Password): boolean {
    return this.value === other.value;
  }
}