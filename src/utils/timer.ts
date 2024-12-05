/**
 * タイマー関数
 * @param ms
 * @returns
 */
export const timer = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
