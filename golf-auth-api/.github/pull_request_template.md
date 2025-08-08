# 概要
<!-- 変更の目的、背景など、レビュワーに変更の文脈を理解してもらうための情報を記載 -->

# 内容
<!-- 具体的な変更内容を記載。必要に応じてスクリーンショットなども添付 -->

## 変更内容
- 

## スクリーンショット
<!-- 必要に応じてスクリーンショットを添付 -->

---

## 実装チェックリスト

### ドメイン層
* [x] **UserEntity 実装**
  * [x] id, name, email(VO), password(VO), createdAt, updatedAt
  * [x] `toObject()` / getter
  * [x] バリデーションは VO 側で実装

* [x] **Value Object 実装**
  * [x] `Email`：形式チェック
  * [x] `Password`：条件チェック（長さ・文字種）

* [x] **UserRepository インターフェース定義**
  * [x] `findByEmail(email: Email): Promise<UserEntity | null>`
  * [x] `findById(id: string): Promise<UserEntity | null>`
  * [x] `save(user: UserEntity): Promise<void>`

* [x] **MockUserRepository 実装**
  * [x] インメモリでの実装
  * [x] テストの実装

### アプリケーション層
* [ ] **AuthService 実装**（ユースケース）
  * [ ] メール重複チェック
  * [ ] `UserEntity.create()` 呼び出し
  * [ ] 保存

* [ ] **AuthService ユニットテスト**
  * [ ] 正常登録
  * [ ] メール重複エラー
  * [ ] VO バリデーションエラー

### インフラ層
* [ ] **HTTP コントローラ実装**
  * [ ] POST `/auth/register`
  * [ ] リクエストのバリデーション
  * [ ] エラーハンドリング

* [ ] **DI 配線**
  * [ ] 環境変数で InMemoryRepo / 本番Repo 切り替え

* [ ] **本番用 Repository 実装**
  * [ ] SQLite + Prismaでの実装
  * [ ] インターフェースに従って DB 操作

### その他
* [ ] **エラーハンドリング**
  * [ ] エラー型の定義
  * [ ] エラーレスポンスの統一

* [ ] **ログ出力**
  * [ ] ログレベルの定義
  * [ ] ログフォーマットの統一

---

## 補足事項
<!-- レビュワーに特に確認してもらいたい点、注意点など -->

