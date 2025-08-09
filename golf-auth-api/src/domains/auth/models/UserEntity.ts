import { Email } from "@/domains/auth/valueObjects/Email";
import { UserResponseDTO } from "@/domains/auth/types/dto";
import { Password } from "@/domains/auth/valueObjects/Password";

export class UserEntity {
  private constructor(
    private readonly id: string,
    private readonly email: Email,
    private readonly password: Password,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {}

  static create(data: { id: string, email: Email, password: Password, createdAt: Date, updatedAt: Date }): UserEntity {
    return new UserEntity(
      data.id,
      data.email,
      data.password,
      data.createdAt,
      data.updatedAt
    );
  }

  getId(): string { return this.id; }
  getEmail(): Email { return this.email; }
  getPassword(): Password { return this.password; }

  // データ取得用
  toResponse(): UserResponseDTO {
    return {
      id: this.id,
      email: this.email.toString(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}