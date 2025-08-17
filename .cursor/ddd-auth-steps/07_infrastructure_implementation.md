# インフラ層実装ステップ

## 1. BcryptPasswordHasher実装

### 1-1. 基本設定
- [⭕️] bcryptパッケージのインストール確認
- [⭕️] `src/infrastructure/crypto/BcryptPasswordHasher.ts`の作成

### 1-2. 実装
```typescript
export class BcryptPasswordHasher implements PasswordHasher {
  private readonly SALT_ROUNDS = 10;

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.SALT_ROUNDS);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
```

### 1-3. テスト
```typescript
describe("BcryptPasswordHasher", () => {
  it("パスワードをハッシュ化して検証できること", async () => {
    const hasher = new BcryptPasswordHasher();
    const plain = "12345678";
    
    const hashed = await hasher.hash(plain);
    const isValid = await hasher.compare(plain, hashed);
    
    expect(isValid).toBe(true);
  });
});
```

## 2. JWTAdapter実装

### 2-1. 基本設定
- [ ] jsonwebtokenパッケージのインストール確認
- [ ] `src/infrastructure/jwt/JWTAdapter.ts`の作成

### 2-2. 実装
```typescript
export class JWTAdapter implements JWTGenerator {
  constructor(
    private readonly secret: string = process.env.JWT_SECRET ?? "default_secret"
  ) {}

  async sign(payload: object): Promise<string> {
    return jwt.sign(payload, this.secret, { expiresIn: "1h" });
  }

  async verify(token: string): Promise<object> {
    return jwt.verify(token, this.secret) as object;
  }
}
```

### 2-3. テスト
```typescript
describe("JWTAdapter", () => {
  it("トークンの生成と検証ができること", async () => {
    const adapter = new JWTAdapter();
    const payload = { userId: "123" };
    
    const token = await adapter.sign(payload);
    const verified = await adapter.verify(token);
    
    expect(verified).toMatchObject(payload);
  });
});
```

## 3. SQLiteRepository実装

### 3-1. 基本設定
- [ ] sqlite3パッケージのインストール確認
- [ ] `src/infrastructure/database/schema.sql`の作成

```sql
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);
```

### 3-2. Repository実装
```typescript
export class SQLiteUserRepository implements UserRepository {
  constructor(private readonly db: Database) {}

  async save(user: UserEntity): Promise<void> {
    const { id, email, password, createdAt, updatedAt } = user.toObject();
    
    await this.db.run(`
      INSERT INTO users (id, email, password, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `, [id, email, password, createdAt, updatedAt]);
  }

  async findByEmail(email: Email): Promise<UserEntity | null> {
    const row = await this.db.get(
      "SELECT * FROM users WHERE email = ?",
      [email.toString()]
    );
    return row ? this.rowToEntity(row) : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const row = await this.db.get(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    return row ? this.rowToEntity(row) : null;
  }
}
```

### 3-3. テスト
```typescript
describe("SQLiteUserRepository", () => {
  it("ユーザーを保存して取得できること", async () => {
    const repo = new SQLiteUserRepository(testDb);
    const user = await UserEntity.create({
      email: "test@example.com",
      password: 12345678,
      hasher: mockHasher
    });

    await repo.save(user);
    const found = await repo.findById(user.getId());
    
    expect(found).not.toBeNull();
    expect(found?.toObject()).toEqual(user.toObject());
  });
});
```

## 実装の優先順位

1. **BcryptPasswordHasher**
   - パスワードのハッシュ化は認証の基本機能

2. **SQLiteRepository**
   - ユーザーデータの永続化が必要

3. **JWTAdapter**
   - ログイン機能実装時に必要 