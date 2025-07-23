# 認証基盤実装フェーズ

## 🔐 ユーザー認証サービス

### AuthService実装
```typescript
class AuthService {
  async register(email: string, password: string): Promise<User> {
    // ユーザー登録ロジック
  }

  async login(email: string, password: string): Promise<{token: string}> {
    // ログインロジック
  }

  async validateToken(token: string): Promise<User> {
    // トークン検証ロジック
  }
}
```

### パスワード管理
- [ ] パスワードハッシュ化の実装
  ```typescript
  const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  };
  ```
- [ ] パスワード検証の実装
- [ ] パスワードポリシーの実装

## 🎫 JWTの実装と運用設計

### トークン生成
```typescript
interface JWTPayload {
  sub: string;      // ユーザーID
  email: string;    // メールアドレス
  iat: number;      // 発行時刻
  exp: number;      // 有効期限
  nbf: number;      // 使用開始時刻
  aud: string[];    // 想定利用者
  iss: string;      // トークン発行者
  role: string[];   // ユーザーロール
}
```

### 環境設定
```env
JWT_SECRET_KEY=your-secret-key
JWT_REFRESH_SECRET_KEY=refresh-secret-key
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
JWT_ISSUER=your-service-name
JWT_AUDIENCE=your-service-audience
```

### トークン管理
- [ ] トークン生成機能
- [ ] トークン検証機能
- [ ] リフレッシュトークンの実装
- [ ] トークン失効管理（denylist）

## 🛡 認証ミドルウェアとセキュリティ

### 認証ミドルウェア
```typescript
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = extractTokenFromHeader(req);
    const user = await validateToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
```

### Cookie認証（オプション）
```typescript
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 3600000 // 1時間
};
```

### CSRF対策
- [ ] CSRFトークンの生成
- [ ] トークン検証ミドルウェア
- [ ] Double Submit Cookie実装

## 🔒 セキュリティ強化

### レート制限
```typescript
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分
  max: 5 // IP毎に5回まで
});
```

### エラーハンドリング
```typescript
class AuthError extends Error {
  constructor(
    message: string,
    public statusCode: number = 401,
    public code: string = 'AUTH_ERROR'
  ) {
    super(message);
  }
}
```

### セキュリティヘッダー
```typescript
const helmet = require('helmet');
app.use(helmet());
```

## 📝 実装チェックリスト

### 基本機能
- [ ] ユーザー登録
- [ ] ログイン/ログアウト
- [ ] トークン検証
- [ ] パスワードリセット

### セキュリティ対策
- [ ] パスワードハッシュ化
- [ ] トークンの適切な管理
- [ ] レート制限の実装
- [ ] セキュリティヘッダーの設定

### エラーハンドリング
- [ ] 適切なエラーメッセージ
- [ ] エラーログの記録
- [ ] リトライ処理の実装

## 🔍 レビューポイント

### コードレビュー
- [ ] セキュリティベストプラクティス
- [ ] エラーハンドリング
- [ ] パフォーマンス
- [ ] テスタビリティ

### セキュリティレビュー
- [ ] 脆弱性チェック
- [ ] セキュリティ設定
- [ ] トークン管理
- [ ] エラー処理 