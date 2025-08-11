import { UserRepository } from "@/domains/auth/types/UserRepository";
import { Email } from "@/domains/auth/valueObjects/Email";

export class EmailDuplicationCheckDomainService {
	constructor (
		private readonly usersRepo: UserRepository
	) {}

	async isDuplicated(email: Email): Promise<boolean> {
		const foundUser = await this.usersRepo.findByEmail(email.toString());
		return foundUser !== null;
	}
}
