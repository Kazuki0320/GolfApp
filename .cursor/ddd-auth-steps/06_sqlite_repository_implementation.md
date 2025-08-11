# SQLiteRepository実装ステップ

## 1. 環境構築
- [ ] SQLite3のインストールと設定
  ```bash
  npm install sqlite3
  npm install @types/sqlite3 --save-dev
  ```
- [ ] 環境変数の設定
  - [ ] `.env`ファイルの作成
  - [ ] `DATABASE_URL`の設定
  - [ ] `dotenv`パッケージのインストール

## 2. データベース設定
- [ ] データベースファイルの作成場所の決定
  ```typescript
  // src/infrastructure/database/config.ts
  export const DB_FILE = process.env.NODE_ENV === 'test' 
    ? ':memory:' 
    : process.env.DATABASE_URL;
  ```
- [ ] マイグレーションスクリプトの作成
  ```sql
  -- migrations/001_create_users.sql
  CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  ```

## 3. SQLiteRepositoryの実装
- [ ] ベース実装
  ```typescript
  // src/infrastructure/repositories/SQLiteUserRepository.ts
  export class SQLiteUserRepository implements UserRepository {
    constructor(private db: Database) {}
  }
  ```

- [ ] メソッド実装
  - [ ] `findByEmail`
    - [ ] SQLクエリの作成
    - [ ] パラメータのバインド
    - [ ] 結果のマッピング
  - [ ] `findById`
    - [ ] SQLクエリの作成
    - [ ] パラメータのバインド
    - [ ] 結果のマッピング
  - [ ] `save`
    - [ ] INSERTクエリの作成
    - [ ] パラメータのバインド
    - [ ] トランザクション処理

## 4. テスト実装
- [ ] テスト用データベースの設定
  - [ ] インメモリデータベースの使用
  - [ ] テスト用マイグレーション実行
- [ ] テストケース実装
  - [ ] `findByEmail`のテスト
    - [ ] 存在するメールアドレス
    - [ ] 存在しないメールアドレス
  - [ ] `findById`のテスト
    - [ ] 存在するID
    - [ ] 存在しないID
  - [ ] `save`のテスト
    - [ ] 新規ユーザーの保存
    - [ ] メールアドレス重複時のエラー

## 5. エラーハンドリング
- [ ] カスタムエラークラスの作成
  ```typescript
  export class DatabaseError extends Error {
    constructor(message: string, public readonly cause?: Error) {
      super(message);
    }
  }
  ```
- [ ] エラーケースの実装
  - [ ] 接続エラー
  - [ ] クエリエラー
  - [ ] 一意制約違反

## 6. リファクタリング
- [ ] SQLクエリの定数化
- [ ] トランザクション処理の共通化
- [ ] エラーメッセージの定数化

## コミット計画
1. chore: add sqlite and related packages
2. feat: add database configuration and migrations
3. feat: implement SQLiteUserRepository
4. test: add SQLiteUserRepository tests
5. feat: add database error handling
6. refactor: improve SQLiteUserRepository implementation

## 次のステップ
- AuthServiceの実装完了
- パスワードハッシュ化の実装 