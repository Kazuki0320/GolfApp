import { UserEntity } from "@/domains/auth/models/UserEntity";
import { CreateUserDTO, UserResponseDTO } from "@/domains/auth/types/dto";
import { UserRepository } from "@/domains/auth/types/UserRepository";
import { PasswordHasher } from "@/domains/auth/types/PasswordHasher";
import { EmailDuplicationCheckDomainService } from "@/domains/auth/services/EmailDuplicationCheckDomainService";
import { Email } from "@/domains/auth/valueObjects/Email";

export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hasher: PasswordHasher,
    private readonly emailDuplicationCheckDomainService: EmailDuplicationCheckDomainService
  ) {}

  async register(input: CreateUserDTO): Promise<UserResponseDTO> {
    // メールアドレスの重複チェック
    const isDuplicated = await this.emailDuplicationCheckDomainService.isDuplicated(Email.create(input.email));
    if (isDuplicated) {
      throw new Error("このメールアドレスは既に登録されています");
    }

    // ユーザーエンティティの作成と保存
    const user = await UserEntity.create({
      email: input.email,
      password: input.password,
    }, this.hasher);

    await this.userRepo.save(user);

    // レスポンスDTOを返す
    return {
      id: user.getId(),
      email: user.getEmail().toString(),
      createdAt: user.toResponse().createdAt,
      updatedAt: user.toResponse().updatedAt
    };
  }
}