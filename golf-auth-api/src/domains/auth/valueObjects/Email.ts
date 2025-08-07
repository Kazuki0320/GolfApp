import { Result, resultError, resultSuccess } from "@/domains/auth/types/Result";

export class Email {
  private constructor(private readonly value: string) {}

  /**
   * ファクトリーメソッド
   * @param email メールアドレス
   * @returns Result<Email>
   */
  static create(email: string): Result<Email> {
    if (!email) {
      return resultError(new Error("メールアドレスは必須です"));
    }

    if (!Email.isValid(email)) {
      return resultError(new Error("メールアドレスが無効です"));
    }

    return resultSuccess(new Email(email));
  }

  /**
   * メールアドレスのバリデーション
   * @param email メールアドレス
   * @returns boolean
   */
  private static isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * 文字列に変換
   * @returns string
   */
  toString(): string {
    return this.value;
  }

  /**
   * 値の比較
   * @param other 比較対象のEmail
   * @returns boolean
   */
  equals(other: Email): boolean {
    return this.value === other.value;
  }
}