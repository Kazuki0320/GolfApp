/**
 * Result型の定義
 * 成功または失敗のどちらかの状態を表現する
 */
export type Result<T> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: Error };

/**
 * 成功時のResult生成関数
 */
export const resultSuccess = <T>(data: T): Result<T> => ({
  success: true,
  data,
  error: null,
});

/**
 * エラー時のResult生成関数
 */
export const resultError = <T>(err: Error): Result<T> => ({
  success: false,
  data: null,
  error: err,
}); 