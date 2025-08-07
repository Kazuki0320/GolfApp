import { CreateUser } from "@/domains/auth/types/User";
import { Result, resultError, resultSuccess } from "@/domains/auth/types/Result";
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
   * @param userData ユーザーデータ
   * @returns Result<UserEntity>
   */
  static create(userData: CreateUser): Result<UserEntity> {

    const emailValidation = Email.create(userData.email);
    if (!emailValidation.success) {
      return resultError(emailValidation.error);
    }

    const passwordValidation = Password.create(userData.password);
    if (!passwordValidation.success) {
      return resultError(passwordValidation.error);
    }

    const userEntity = new UserEntity({
      id: generateId(),
      name: "",
      email: emailValidation.data,
      password: passwordValidation.data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return resultSuccess(userEntity);
  }
}