import { BcryptPasswordHasher } from "@/infrastructure/adapters/crypto/BcryptPasswordHasher";

describe("BcryptPasswordHasher", () => {
	it("パスワードをハッシュ化して検証ができること", async () => {
		const hasher = new BcryptPasswordHasher();
		const plain = "password";

		const hashed = await hasher.hash(plain);
		const isValid = await hasher.compare(plain, hashed);

		expect(isValid).toBe(true);
	})
})