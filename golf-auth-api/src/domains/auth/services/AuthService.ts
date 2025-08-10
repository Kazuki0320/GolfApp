import { UserEntity } from "@/domains/auth/models/UserEntity";
import { CreateUserDTO, UserResponseDTO } from "@/domains/auth/types/dto";
import { UserRepository } from "@/domains/auth/types/UserRepository";
import { PasswordHasher } from "@/domains/auth/types/PasswordHasher";

export class AuthService {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: PasswordHasher
  ) {}

  async register(input: CreateUserDTO): Promise<UserResponseDTO> {
    // メールアドレスの重複チェック
    const dupEmail = await this.users.findByEmail(input.email);
    if (dupEmail) {
      throw new Error("このメールアドレスは既に登録されています");
    }

    // ユーザーエンティティの作成と保存
    const user = await UserEntity.create({
      email: input.email,
      password: input.password,
    }, this.hasher);

    await this.users.save(user);

    // レスポンスDTOを返す
    return {
      id: user.getId(),
      email: user.getEmail().toString(),
      createdAt: user.toResponse().createdAt,
      updatedAt: user.toResponse().updatedAt
    };
  }
}