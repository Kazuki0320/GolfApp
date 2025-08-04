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

## 🚀 実装ステップ

### 1. ドメインモデル実装
- [ ] `models/User.js` の作成
  - [ ] Userクラス/インターフェースの定義
  - [ ] バリデーションメソッドの実装
  - [ ] ファクトリメソッドの実装

### 2. インフラストラクチャ層の実装
- [ ] `infrastructure/crypto/bcryptAdapter.js`
  - [ ] パスワードハッシュ化関数
  - [ ] パスワード照合関数
- [ ] `infrastructure/jwt/jwtAdapter.js`
  - [ ] トークン生成関数
  - [ ] トークン検証関数

### 3. リポジトリ層の実装
- [ ] `repositories/UserRepository.js`
  - [ ] インターフェース定義
  - [ ] SQLite実装
  - [ ] CRUD操作の実装

### 4. サービス層の実装
- [ ] `services/AuthService.js`
  - [ ] register()メソッド
  - [ ] login()メソッド
  - [ ] verifyToken()メソッド

### 5. バリデーション層の実装
- [ ] `validators/authValidator.js`
  - [ ] メールアドレスバリデーション
  - [ ] パスワードバリデーション
  - [ ] トークンバリデーション

### 6. コントローラー層の実装
- [ ] `controllers/registerController.js`
  - [ ] リクエスト処理
  - [ ] レスポンス整形
  - [ ] エラーハンドリング

## 📝 実装の優先順位

1. **基盤実装（Priority: High）**
   - [ ] User モデル
   - [ ] bcrypt アダプター
   - [ ] JWT アダプター

2. **コア機能（Priority: High）**
   - [ ] UserRepository
   - [ ] AuthService（register機能）

3. **API層（Priority: Medium）**
   - [ ] バリデーター
   - [ ] registerController

4. **拡張機能（Priority: Low）**
   - [ ] login機能
   - [ ] トークン検証機能

## 🧪 テスト計画

### ユニットテスト
- [ ] User モデル
- [ ] AuthService
- [ ] バリデーター

### 統合テスト
- [ ] リポジトリ層
- [ ] API エンドポイント
