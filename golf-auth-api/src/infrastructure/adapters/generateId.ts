// generateId.ts
import { v4 as uuidv4 } from 'uuid';

/**
 * ユニークなIDを生成する
 * @returns string UUID v4
 */
export const generateId = (): string => {
  return uuidv4();
};
