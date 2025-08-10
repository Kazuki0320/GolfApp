import { PasswordHasher } from "@/domains/auth/types/PasswordHasher";

export class Password {
  private constructor(
    private readonly hashedValue: string,
  ) {}

  static async create(
    plainPassword: string,
    hasher: PasswordHasher
  ): Promise<Password> {
    if (!plainPassword) { throw new Error("パスワードは必須です") }
    if (!this.isNumericOnly(plainPassword)) { throw new Error("パスワードは数字のみで入力してください") }
    if (!this.isValidLength(plainPassword) ) { throw new Error("パスワードは8文字以上で入力してください") }

    const hashedValue = await hasher.hash(plainPassword);
    return new Password(hashedValue);
  }

  private static isNumericOnly(password: string): boolean {
    return /^\d+$/.test(password);
  }

  private static isValidLength(password: string): boolean {
    return password.length >= 8;
  }

  toString(): string {
    return this.hashedValue;
  }

  equals(other: Password): boolean {
    return this.hashedValue === other.hashedValue;
  }
}