# DDD風認証基盤実装ステップ

## 📂 フォルダ構成

```
src/
├── domains/
│   └── auth/
│       ├── controllers/       # APIルートハンドラ
│       │   └── registerController.js
│       ├── services/          # 認証ユースケース実装
│       │   └── AuthService.js
│       ├── models/           # Userエンティティ
│       │   └── User.js
│       ├── repositories/     # UserRepository
│       │   └── UserRepository.js
│       └── validators/       # リクエストバリデーション
│           └── authValidator.js
└── infrastructure/
    ├── crypto/
    │   └── bcryptAdapter.js  # ハッシュ化・照合
    └── jwt/
        └── jwtAdapter.js     # sign(), verify()
```

## 🚀 実装の優先順位とステップ

### ✅ 優先順位：ドメイン層からの実装

ドメイン層を最初に実装する理由：
- ビジネスルールの核であり、他層に依存せず単体で設計可能
- 残りの層はドメインの仕様に従って実装される
- インターフェース設計を先に決めることで後工程がブレにくい

### 🥇 Step 1：ドメイン層の実装（最優先）

#### User.js（ユーザーエンティティ）
```typescript
interface UserProps {
  id?: string;
  email: string;
  password: string;  // ハッシュ済み
  createdAt?: Date;
  updatedAt?: Date;
}

class User {
  private props: UserProps;

  constructor(props: UserProps) {
    this.validate(props);
    this.props = props;
  }

  private validate(props: UserProps) {
    // ドメインルールの検証
  }
}
```

#### UserRepository.js（インターフェース）
```typescript
interface IUserRepository {
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
```

#### AuthService.js（ユースケース）
```typescript
class AuthService {
  constructor(
    private userRepo: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private tokenGenerator: ITokenGenerator
  ) {}

  async register(userData: UserRegistrationData): Promise<AuthResult> {
    // 実装の流れ
  }
}
```

### 🥈 Step 2：インフラ層の実装

#### BcryptAdapter.js
```typescript
class BcryptAdapter implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    // bcryptでのハッシュ化実装
  }

  async compare(password: string, hash: string): Promise<boolean> {
    // パスワード照合実装
  }
}
```

#### JwtAdapter.js
```typescript
class JwtAdapter implements ITokenGenerator {
  sign(payload: JWTPayload): string {
    // JWT生成実装
  }

  verify(token: string): JWTPayload {
    // トークン検証実装
  }
}
```

#### UserRepositoryImpl.js
```typescript
class SQLiteUserRepository implements IUserRepository {
  async save(user: User): Promise<User> {
    // DB保存実装
  }

  async findByEmail(email: string): Promise<User | null> {
    // DB検索実装
  }
}
```

### 🥉 Step 3：アプリケーション層の実装

#### authValidator.js
```typescript
class AuthValidator {
  validate(input: unknown): ValidationResult {
    // バリデーションルール実装
  }
}
```

#### registerController.js
```typescript
class RegisterController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response) {
    // リクエスト処理実装
  }
}
```

## 📝 実装の優先順位まとめ

1. **User Entity**（ドメインモデル）
2. **UserRepository Interface**（永続化インターフェース）
3. **AuthService**（ユースケース実装）
4. **BcryptAdapter / JwtAdapter**（技術依存の実装）
5. **UserRepositoryImpl**（DB実装）
6. **Validator / Controller**（外部インターフェース）

## 🎯 この実装順序のメリット

| メリット | 解説 |
|---------|------|
| ✅ 仕様の安定性 | ドメイン起点で設計するため、後からの変更が少ない |
| ✅ テスタビリティ | ドメイン層は外部依存なしでテスト可能 |
| ✅ 段階的な実装 | 各層を独立して実装・テスト可能 |
| ✅ 依存の制御 | 内側から外側への依存関係が明確 |

## 🧪 テスト計画

### ユニットテスト
- [ ] User モデル
- [ ] AuthService
- [ ] バリデーター

### 統合テスト
- [ ] リポジトリ層
- [ ] API エンドポイント
