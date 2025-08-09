import { UserEntity } from "@/domains/auth/models/UserEntity";
import { Email } from "@/domains/auth/valueObjects/Email";
import { UserProps } from "@/domains/auth/types/UserEntity";

describe("UserEntity", () => {
  let baseUserData: UserProps;

  beforeEach(() => {
    const mockHashedPassword = "$2b$10$abcdefghijklmnopqrstuvwxyz123456";
    baseUserData = {
      id: "1",
      email: Email.create("test@example.com"),
      password: mockHashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  describe("create", () => {
    describe("正常系", () => {
      it("有効なemail/passwordでユーザーが作成できること", () => {
        const user = UserEntity.create(baseUserData);
        const dto = user.toResponse();

        expect(dto).toEqual({
          id: baseUserData.id,
          email: baseUserData.email.toString(),
          createdAt: baseUserData.createdAt,
          updatedAt: baseUserData.updatedAt,
        });
      });
    });
  });
});