import { Email } from "@/domains/auth/valueObjects/Email";
import { UserResponseDTO, CreateUserDTO } from "@/domains/auth/types/dto";
import { Password } from "@/domains/auth/valueObjects/Password";
import { generateId } from "@/infrastructure/adapters/generateId";
import { PasswordHasher } from "../types/PasswordHasher";

export class UserEntity {
  private constructor(
    private readonly id: string,
    private readonly email: Email,
    private readonly password: Password,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {}

  static async create(
    data: CreateUserDTO,
    passwordHasher: PasswordHasher,
  ): Promise<UserEntity> {
    
    return new UserEntity(
      generateId(),
      Email.create(data.email),
      await Password.create(data.password, passwordHasher),
      new Date(),
      new Date()
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