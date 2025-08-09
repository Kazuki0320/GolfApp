import { Email } from "@/domains/auth/valueObjects/Email";
import { UserResponseDTO } from "@/domains/auth/types/dto";

export class UserEntity {
  private constructor(
    private readonly id: string,
    private readonly email: Email,
    private readonly password: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {}

  static create(data: { id: string, email: Email, password: string, createdAt: Date, updatedAt: Date }): UserEntity {
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
  getPassword(): string { return this.password; }

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