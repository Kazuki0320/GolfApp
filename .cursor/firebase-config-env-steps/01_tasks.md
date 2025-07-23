# Firebase設定の環境変数化タスクリスト

## 1. 🔍 現状分析と準備

### 環境変数化が必要な設定の特定
- [ ] `src/firebase/firebase.js`内の機密情報の洗い出し
  - [ ] apiKey
  - [ ] authDomain
  - [ ] projectId
  - [ ] storageBucket
  - [ ] messagingSenderId
  - [ ] appId
  - [ ] measurementId

### 開発環境の準備
- [ ] `.env`ファイルの作成
- [ ] `.env.example`テンプレートの作成
- [ ] `.gitignore`への`.env`の追加確認

## 2. 🛠 環境変数の設定

### Vite用の環境変数設定
- [ ] `.env`ファイルの作成
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 環境別の設定ファイル作成
- [ ] `.env.development`の作成（開発環境用）
- [ ] `.env.production`の作成（本番環境用）
- [ ] `.env.test`の作成（テスト環境用）

## 3. 📝 コードの修正

### Firebase設定ファイルの更新
- [ ] `src/firebase/firebase.js`の修正
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};
```

### 型定義の追加（オプション）
- [ ] `env.d.ts`ファイルの作成
```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string
  readonly VITE_FIREBASE_MEASUREMENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## 4. 🧪 テストと検証

### ローカル環境での動作確認
- [ ] 開発サーバーの起動テスト
- [ ] Firebase認証機能の動作確認
- [ ] Firestore接続の確認

### 本番環境の準備
- [ ] CI/CD環境での環境変数の設定
- [ ] 本番デプロイ時の環境変数の確認方法の文書化

## 5. 📚 ドキュメント作成

### 開発者向けドキュメント
- [ ] 環境変数の設定手順
- [ ] ローカル開発環境のセットアップ手順
- [ ] トラブルシューティングガイド

### デプロイ手順の更新
- [ ] 本番環境へのデプロイ手順の更新
- [ ] 環境変数の設定方法の説明
- [ ] セキュリティ考慮事項の文書化

## 6. 🔒 セキュリティ対策

### セキュリティレビュー
- [ ] 環境変数の漏洩リスクの確認
- [ ] GitHubなどのバージョン管理での機密情報の履歴確認
- [ ] 必要に応じて履歴のクリーンアップ

### アクセス制御
- [ ] 環境変数へのアクセス権限の設定
- [ ] 本番環境の環境変数の管理方法の確立 