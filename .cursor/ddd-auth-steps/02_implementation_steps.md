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
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
```

#### UserRepository.js（インターフェース）
```javascript
class UserRepository {
  async save(user) {
    throw new Error('Method not implemented');
  }

  async findByEmail(email) {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }
}
```

#### AuthService.js（ユースケース）
```javascript
class AuthService {
  constructor(userRepo, passwordHasher, tokenGenerator) {
    this.userRepo = userRepo;
    this.passwordHasher = passwordHasher;
    this.tokenGenerator = tokenGenerator;
  }

  async register(userData) {
    // 実装の流れ
  }
}
```

### 🥈 Step 2：インフラ層の実装

#### BcryptAdapter.js
```javascript
const bcrypt = require('bcrypt');

class BcryptAdapter {
  async hash(password) {
    return bcrypt.hash(password, 10);
  }

  async compare(password, hash) {
    return bcrypt.compare(password, hash);
  }
}
```

#### JwtAdapter.js
```javascript
const jwt = require('jsonwebtoken');

class JwtAdapter {
  constructor(secret) {
    this.secret = secret;
  }

  sign(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: '1h' });
  }

  verify(token) {
    return jwt.verify(token, this.secret);
  }
}
```

#### UserRepositoryImpl.js
```javascript
const sqlite3 = require('sqlite3');

class SQLiteUserRepository extends UserRepository {
  constructor() {
    super();
    this.db = new sqlite3.Database('./auth.db');
  }

  async save(user) {
    // DB保存実装
  }

  async findByEmail(email) {
    // DB検索実装
  }
}
```

### 🥉 Step 3：アプリケーション層の実装

#### authValidator.js
```javascript
class AuthValidator {
  validate(input) {
    // バリデーションルール実装
  }
}
```

#### registerController.js
```javascript
class RegisterController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(req, res) {
    try {
      const result = await this.authService.register(req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
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


