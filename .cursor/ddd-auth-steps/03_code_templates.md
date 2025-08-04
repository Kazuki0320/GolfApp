# DDD実装のコードテンプレート

## 📝 ドメインモデル

### User.js
```typescript
class User {
  constructor(
    private email: string,
    private password: string,
    private id?: string,
    private createdAt?: Date,
    private updatedAt?: Date
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.isValidEmail(this.email)) {
      throw new Error('Invalid email format');
    }
    if (!this.isValidPassword(this.password)) {
      throw new Error('Invalid password format');
    }
  }

  private isValidEmail(email: string): boolean {
    // メールアドレスのバリデーション実装
    return true;
  }

  private isValidPassword(password: string): boolean {
    // パスワードのバリデーション実装
    return true;
  }

  // ゲッター
  public getId(): string { return this.id; }
  public getEmail(): string { return this.email; }
  public getPassword(): string { return this.password; }

  // ファクトリメソッド
  static create(email: string, password: string): User {
    return new User(email, password);
  }
}

export default User;
```

## 🔧 インフラストラクチャ層

### bcryptAdapter.js
```typescript
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
```

### jwtAdapter.js
```typescript
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const TOKEN_EXPIRES_IN = '1h';

export const generateToken = (payload: any): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
```

## 📦 リポジトリ層

### UserRepository.js
```typescript
import { Database } from 'sqlite3';
import User from '../models/User';

class UserRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async save(user: User): Promise<void> {
    const sql = `
      INSERT INTO users (email, password, created_at, updated_at)
      VALUES (?, ?, datetime('now'), datetime('now'))
    `;
    
    return new Promise((resolve, reject) => {
      this.db.run(sql, [user.getEmail(), user.getPassword()], (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const sql = 'SELECT * FROM users WHERE email = ?';
    
    return new Promise((resolve, reject) => {
      this.db.get(sql, [email], (err, row) => {
        if (err) reject(err);
        if (!row) resolve(null);
        resolve(new User(row.email, row.password, row.id));
      });
    });
  }
}

export default UserRepository;
```

## 🛠 サービス層

### AuthService.js
```typescript
import User from '../models/User';
import UserRepository from '../repositories/UserRepository';
import { hashPassword } from '../../infrastructure/crypto/bcryptAdapter';
import { generateToken } from '../../infrastructure/jwt/jwtAdapter';

class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(email: string, password: string): Promise<string> {
    // 既存ユーザーチェック
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // パスワードハッシュ化
    const hashedPassword = await hashPassword(password);

    // ユーザー作成
    const user = User.create(email, hashedPassword);
    await this.userRepository.save(user);

    // JWTトークン生成
    return generateToken({ userId: user.getId(), email: user.getEmail() });
  }
}

export default AuthService;
```

## 🎮 コントローラー層

### registerController.js
```typescript
import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    // バリデーション（実際はミドルウェアで実装）
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const authService = new AuthService(/* UserRepository インスタンス */);
    const token = await authService.register(email, password);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

## ✅ バリデーション

### authValidator.js
```typescript
import { Request, Response, NextFunction } from 'express';

export const validateRegistration = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password } = req.body;

  if (!email || !isValidEmail(email)) {
    res.status(400).json({ error: 'Invalid email format' });
    return;
  }

  if (!password || !isValidPassword(password)) {
    res.status(400).json({ error: 'Invalid password format' });
    return;
  }

  next();
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};
``` 