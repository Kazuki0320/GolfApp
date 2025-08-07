export class Email {
  private constructor(private readonly value: string) {}

  /**
   * ファクトリーメソッド
   * @throws {Error} バリデーションエラー時
   */
  static create(email: string): Email {
    Email.validate(email);
    return new Email(email);
  }

  /**
   * メールアドレスのバリデーション
   * @throws {Error} バリデーションエラー時
   */
  private static validate(email: string): void {
    if (!email) {
      throw new Error("メールアドレスは必須です");
    }

    if (!Email.isValid(email)) {
      throw new Error("メールアドレスが無効です");
    }
  }

  /**
   * メールアドレスの形式チェック
   */
  private static isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  toString(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}