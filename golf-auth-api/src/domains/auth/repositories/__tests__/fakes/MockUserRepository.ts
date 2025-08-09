import { UserRepository } from "@/domains/auth/types/UserRepository";
import { UserEntity } from "@/domains/auth/models/UserEntity";
import { Email } from "@/domains/auth/valueObjects/Email";

export class MockUserRepository implements UserRepository {
  private byId = new Map<string, UserEntity>();
  private byEmail = new Map<string, UserEntity>();

  async save(user: UserEntity): Promise<void> {
    this.byId.set(user.getId(), user);
    this.byEmail.set(user.getEmail().toString(), user);
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.byId.get(id) ?? null;
  }
  
  async findByEmail(email: Email): Promise<UserEntity | null> {
    return this.byEmail.get(email.toString()) ?? null;
  }

  clear(): void {
    this.byId.clear();
    this.byEmail.clear();
  }
} 