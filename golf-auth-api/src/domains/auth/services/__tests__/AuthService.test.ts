import { AuthService } from "@/domains/auth/services/AuthService";
import { MockUserRepository } from "@/domains/auth/repositories/__tests__/fakes/MockUserRepository";
import { Email } from "@/domains/auth/valueObjects/Email";
import { PasswordHasher } from "@/domains/auth/types/PasswordHasher";
import { EmailDuplicationCheckDomainService } from "@/domains/auth/services/EmailDuplicationCheckDomainService";
// モックパスワードハッシャー
class MockPasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return `hashed_${password}`;
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return hash === `hashed_${plain}`;
  }
}

describe("AuthService", () => {
  let userRepo: MockUserRepository;
  let passwordHasher: MockPasswordHasher;
  let authService: AuthService;
  let emailDuplicationCheckDomainService: EmailDuplicationCheckDomainService;

  beforeEach(() => {
    userRepo = new MockUserRepository();
    passwordHasher = new MockPasswordHasher();
    emailDuplicationCheckDomainService = new EmailDuplicationCheckDomainService(userRepo);
    authService = new AuthService(userRepo, passwordHasher, emailDuplicationCheckDomainService);
  });

  describe("register", () => {
    const validInput = {
      email: "test@example.com",
      password: "12345678"
    };

    it("新規ユーザーを登録できること", async () => {
      const result = await authService.register(validInput);

      expect(result).toEqual({
        id: expect.any(String),
        email: validInput.email,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      });
    });

    it("既存のメールアドレスの場合エラーを返すこと", async () => {
      // 1回目の登録
      await authService.register(validInput);

      // 2回目の登録（同じメールアドレス）
      await expect(authService.register(validInput))
        .rejects
        .toThrow("このメールアドレスは既に登録されています");
    });

    it("パスワードがハッシュ化されて保存されること", async () => {
      await authService.register(validInput);

      const savedUser = await userRepo.findByEmail(validInput.email);
      expect(savedUser!.getPassword().toString()).toBe(`hashed_${validInput.password}`);
    });
  });
}); 