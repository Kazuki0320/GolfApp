import { MockUserRepository } from "@/domains/auth/repositories/__tests__/MockUserRepository";
import { UserEntity } from "@/domains/auth/models/UserEntity"	;
import { Email } from "@/domains/auth/valueObjects/Email";

describe("UserRepository", () => {
  let repository: MockUserRepository;

  beforeEach(() => {
    repository = new MockUserRepository();
  });

  describe("save", () => {
    it("ユーザーを保存できること", async () => {
      const user = UserEntity.create({
        email: "test@example.com",
        password: "12345678"
      });

      await repository.save(user);
      
      const foundById = await repository.findById(user.getId());
      const foundByEmail = await repository.findByEmail(user.getEmail());
      
      expect(foundById).toBe(user);
      expect(foundByEmail).toBe(user);
    });
  });

  describe("findByEmail", () => {
    it("存在しないメールアドレスの場合nullを返すこと", async () => {
      const email = "notfound@example.com";
      const found = await repository.findByEmail(Email.create(email));
      expect(found).toBeNull();
    });
  });

  describe("findById", () => {
    it("存在しないIDの場合nullを返すこと", async () => {
      const found = await repository.findById("not-exist-id");
      expect(found).toBeNull();
    });
  });
});