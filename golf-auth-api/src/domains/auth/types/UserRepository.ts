import { UserEntity } from "@/domains/auth/models/UserEntity";
import { Email } from "@/domains/auth/valueObjects/Email";

export interface UserRepository {
	findByEmail(email: Email): Promise<UserEntity | null>
	findById(id: string): Promise<UserEntity | null>
	save(user: UserEntity): Promise<void>
}