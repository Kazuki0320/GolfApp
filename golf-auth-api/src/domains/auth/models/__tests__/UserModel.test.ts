import { UserEntity } from "@/domains/auth/models/UserModel";
import { CreateUser } from "@/domains/auth/types/User";

describe("UserEntity", () => {
  describe("create", () => {
    // 正常系のテスト
    describe("正常系", () => {
      it("有効なemail/passwordでユーザーが作成できること", () => {
        const userData: CreateUser = {
          name: "Test User",
          email: "test@example.com",
          password: "12345678"
        };

        const result = UserEntity.create(userData);

        expect(result.success).toBe(true);
        const user = result.data?.getUser();
        expect(user).toEqual({
          id: expect.any(String),
          name: userData.name,
          email: userData.email,
          password: userData.password,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date)
        })
      });
    });

    // 異常系のテスト
    describe("異常系", () => {
      describe("メールアドレスのバリデーション", () => {
        it("無効なemailの場合エラーを返すこと", () => {
          const userData: CreateUser = {
            name: "Test User",
            email: "invalid-email",
            password: "12345678"
          };

          const result = UserEntity.create(userData);

          expect(result.success).toBe(false);
          if (!result.success) {
            expect(result.error.message).toBe("メールアドレスが無効です");
          }
        });
      });

      describe("パスワードのバリデーション", () => {
        it.each([
          ["文字列が含まれる場合", "password123", "パスワードは数字のみで入力してください"],
          ["文字列のみの場合", "password", "パスワードは数字のみで入力してください"],
          ["記号が含まれる場合", "123!456", "パスワードは数字のみで入力してください"],
          ["空文字の場合", "", "パスワードは数字のみで入力してください"],
          ["8文字未満の場合", "123", "パスワードは8文字以上で入力してください"]
        ])("%s、エラーを返すこと", (_, password, expectedError) => {
          const userData: CreateUser = {
            name: "Test User",
            email: "test@example.com",
            password
          };

          const result = UserEntity.create(userData);

          expect(result.success).toBe(false);
          if (!result.success) {
            expect(result.error.message).toBe(expectedError);
          }
        });
      });
    });
  });
});