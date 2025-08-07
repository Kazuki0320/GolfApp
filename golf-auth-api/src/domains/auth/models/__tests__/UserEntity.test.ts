import { UserEntity } from "@/domains/auth/models/UserEntity";
import { CreateUser } from "@/domains/auth/types/User";

describe("UserEntity", () => {
  describe("create", () => {
    describe("正常系", () => {
      it("有効なemail/passwordでユーザーが作成できること", () => {
        const userData: CreateUser = {
          email: "test@example.com",
          password: "12345678"
        };

        const user = UserEntity.create(userData);
        const userObject = user.toObject();

        expect(userObject).toEqual({
          id: expect.any(String),
          name: "",
          email: userData.email,
          password: userData.password,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date)
        });
      });
    });

    describe("異常系", () => {
      it("無効なメールアドレスの場合エラーを投げること", () => {
        const userData: CreateUser = {
          email: "invalid-email",
          password: "12345678"
        };

        expect(() => {
          UserEntity.create(userData);
        }).toThrow("メールアドレスが無効です");
      });

      it("無効なパスワードの場合エラーを投げること", () => {
        const userData: CreateUser = {
          email: "test@example.com",
          password: "123"  // 8文字未満
        };

        expect(() => {
          UserEntity.create(userData);
        }).toThrow("パスワードは8文字以上で入力してください");
      });
    });
  });
});