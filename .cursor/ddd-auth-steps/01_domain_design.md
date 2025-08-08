# 認証ドメイン設計ドキュメント

## 🛠 技術スタック

### バックエンド基盤
- **ランタイム**: Node.js
- **フレームワーク**: Express
- **開発言語**: JavaScript

### データベース
- **RDBMS**: SQLite
- **ORM**: なし（Raw SQLiteを使用）

### 認証・セキュリティ
- **パスワードハッシュ化**: bcrypt
- **トークン管理**: jsonwebtoken (JWT)

### 依存パッケージ
```json
{
  "dependencies": {
    "express": "^4.x.x",
    "bcrypt": "^5.x.x",
    "jsonwebtoken": "^9.x.x",
    "sqlite3": "^5.x.x"
  }
}
```

## 📝 ドメインの定義

### ユースケース
1. **ユーザー登録 (Register)**
   - 入力: email, password
   - 処理: バリデーション → パスワードハッシュ化 → ユーザー保存 → JWT生成
   - 出力: JWT token

2. **ログイン (Login)**
   - 入力: email, password
   - 処理: ユーザー検索 → パスワード照合 → JWT生成
   - 出力: JWT token

3. **トークン検証 (Verify Token)**
   - 入力: JWT token
   - 処理: トークン検証 → ユーザー情報取得
   - 出力: ユーザー情報

### ドメインモデル

#### User エンティティ
```typescript
interface User {
  id: string;
  email: string;
  password: string;  // ハッシュ化済み
  createdAt: Date;
  updatedAt: Date;
}
```

#### Value Objects
```typescript
interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}
```

## 🔄 ビジネスフロー

### 登録フロー
1. メールアドレス重複チェック
2. パスワードバリデーション
3. パスワードハッシュ化
4. ユーザー情報保存
5. JWTトークン生成・返却

### ログインフロー
1. ユーザー存在確認
2. パスワード照合
3. JWTトークン生成・返却

### 認証フロー
1. トークン形式検証
2. トークン署名検証
3. ユーザー情報取得・返却

## 📋 ドメインルール

### バリデーションルール
1. メールアドレス
   - 必須
   - 正しい形式（RFC準拠）
   - 一意制約

2. パスワード
   - 最小8文字
   - 英数字混在
   - 特殊文字を含むことを推奨

### セキュリティルール
1. パスワード
   - bcryptでハッシュ化（salt rounds: 10）
   - 平文での保存禁止

2. JWT
   - 有効期限: 1時間
   - リフレッシュトークン: 30日

## 🔍 技術的考慮事項

### パフォーマンス
- インデックス設定（email列）
- キャッシュ戦略の検討

### スケーラビリティ
- ステートレス設計
- 水平スケーリング対応

### セキュリティ
- レート制限
- CSRF対策
- XSS対策 