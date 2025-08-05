import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// JSONボディパーサーの設定
app.use(express.json());

// 基本的なヘルスチェックエンドポイント
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 