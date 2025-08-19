import { PasswordHasher } from "@/domains/auth/types/PasswordHasher";
import bcrypt from "bcrypt";

export class BcryptPasswordHasher implements PasswordHasher {
	private readonly SALT_ROUNDS = 10;

	async hash(plain: string): Promise<string> {
		return bcrypt.hash(plain, this.SALT_ROUNDS);
	}

	async compare(plain: string, hash: string): Promise<boolean> {
		return bcrypt.compare(plain, hash);
	}
}