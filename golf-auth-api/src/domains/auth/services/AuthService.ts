import { UserEntity } from "@/domains/auth/models/UserEntity";
import { CreateUser, UserResponseDTO } from "@/domains/auth/types/dto";
import { UserRepository } from "@/domains/auth/types/UserRepository";
import { Email } from "@/domains/auth/valueObjects/Email";
import { Password } from "@/domains/auth/valueObjects/Password";
import { PasswordHasher } from "@/domains/auth/types/Password";
import { generateId } from "@/infrastructure/adapters/generateId";


export class AuthService {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: PasswordHasher
  ) {}

  async register(input: CreateUser): Promise<UserResponseDTO> {
    // メールアドレスの重複チェック
    const emailVO = Email.create(input.email);
    const dupEmail = await this.users.findByEmail(emailVO);
    if (dupEmail) {
      throw new Error("このメールアドレスは既に登録されています");
    }

    // パスワードの検証
    const passwordVO = Password.create(input.password);
    
    // パスワードのハッシュ化
    const hashedPassword = await this.hasher.hash(passwordVO.toString());
    
    // ユーザーエンティティの作成と保存
    const user = UserEntity.create({
      id: generateId(),
      email: emailVO,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    });

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