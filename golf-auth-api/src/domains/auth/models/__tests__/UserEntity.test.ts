import { UserEntity } from "@/domains/auth/models/UserEntity";
import { CreateUserDTO } from "@/domains/auth/types/dto";
import { PasswordHasher } from "@/domains/auth/types/PasswordHasher";

const createMockPasswordHasher = (): jest.Mocked<PasswordHasher> => ({
  hash: jest.fn().mockResolvedValue("mocked_hashed_password"),
  compare: jest.fn().mockResolvedValue(true),
});

describe("UserEntity", () => {
  let baseUserData: CreateUserDTO;
  let mockHasher: jest.Mocked<PasswordHasher>;

  beforeEach(async () => {
    mockHasher = createMockPasswordHasher();

    baseUserData = {
      email: "test@example.com",
      password: "12345678",
    };
  });

  describe("create", () => {
    describe("正常系", () => {
      it("有効なemail/passwordでユーザーが作成できること", async () => {
        const user = await UserEntity.create(baseUserData, mockHasher);
        const dto = user.toResponse();

        expect(dto).toEqual({
          id: expect.any(String),
          email: baseUserData.email,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        });
      });
    });
  });
});