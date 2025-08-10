import { Password } from "@/domains/auth/valueObjects/Password";
import { PasswordHasher } from "@/domains/auth/types/PasswordHasher";

const createMockPasswordHasher = (): jest.Mocked<PasswordHasher> => ({
  hash: jest.fn().mockResolvedValue("mocked_hashed_password"),
  compare: jest.fn().mockResolvedValue(true),
});

describe("Password", () => {
  describe("create", () => {
    describe("正常系", () => {
      it.each([
        ["最小文字数のパスワード", "12345678"],
        ["より長いパスワード", "123456789012"],
      ])("%s", async (_, plain) => {
        const hasher = createMockPasswordHasher();
        const passwordVO = await Password.create(plain, hasher);

        expect(hasher.hash).toHaveBeenCalledWith(plain);
        expect(passwordVO.toString()).toBe("mocked_hashed_password");
      });
    });

    describe("異常系", () => {
      it.each([
        ["空文字", "", "パスワードは必須です"],
        ["文字列が含まれる", "password123", "パスワードは数字のみで入力してください"],
        ["記号が含まれる", "123!456", "パスワードは数字のみで入力してください"],
        ["8文字未満", "123", "パスワードは8文字以上で入力してください"],
      ])("%s", async (_, input, expected) => {
        const hasher = createMockPasswordHasher();
        await expect(Password.create(input, hasher)).rejects.toThrow(expected);
      });
    });
  });
});
