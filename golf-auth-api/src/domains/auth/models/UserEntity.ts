import { CreateUser, User } from "@/domains/auth/types/User";
import { generateId } from "@/infrastructure/adapters/generateId";
import { Email } from "@/domains/auth/valueObjects/Email";
import { Password } from "@/domains/auth/valueObjects/Password";

/**
 * ユーザーモデルの定義
 */

export class UserEntity {
	private readonly id: string;
  private readonly name: string;
  private readonly email: Email;
  private readonly password: Password;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

	private constructor(params: {
    id: string;
    name: string;
    email: Email;
    password: Password;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.password = params.password;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
	}

  /**
   * ファクトリーメソッド
   * @throws {Error} バリデーションエラー時
   */
  static create(userData: CreateUser): UserEntity {
    
    const email = Email.create(userData.email);
    const password = Password.create(userData.password);

    return new UserEntity({
      id: generateId(),
      name: "",
      email: email,
      password: password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // データ取得用メソッド
  toObject(): User {
    return {
      id: this.id,
      name: this.name,
      email: this.email.toString(),
      password: this.password.toString(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}