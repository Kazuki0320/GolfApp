import { UserRepository } from "@/domains/auth/types/UserRepository";
import { UserEntity } from "@/domains/auth/models/UserEntity";
import { Email } from "@/domains/auth/valueObjects/Email";

export class MockUserRepository implements UserRepository {
	private users: UserEntity[] = [];
	 private byId = new Map<string, UserEntity>();
	 private byEmail = new Map<string, UserEntity>();

	async save(user: UserEntity): Promise<void> {
		this.byId.set(user.getId(), user);
		this.byEmail.set(user.getEmail().toString(), user);
	}

	async findById(id: string) {
		return this.byId.get(id) ?? null;
	}

	async findByEmail(email: Email) {
		return this.byEmail.get(email.toString()) ?? null;
	}

	clear() {
		this.byId.clear();
		this.byEmail.clear();
	}
}