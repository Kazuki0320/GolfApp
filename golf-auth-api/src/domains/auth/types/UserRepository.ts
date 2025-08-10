import { UserEntity } from "@/domains/auth/models/UserEntity";

export interface UserRepository {
	findByEmail(email: string): Promise<UserEntity | null>
	findById(id: string): Promise<UserEntity | null>
	save(user: UserEntity): Promise<void>
}