/**
 * 上位2桁に切り上げる関数
 * @param num
 * @returns
 */
export const roundUpToTop2Digits = (num: number) => {
  if (num === 0) return 0; // 特殊ケース: 0の場合そのまま返す

  const numStr = Math.abs(num).toString(); // 絶対値にして文字列化
  const length = numStr.length; // 数値の桁数を取得

  if (length <= 2) {
    return Math.ceil(num); // 2桁以下なら通常の切り上げ
  }

  const scale = Math.pow(10, length - 2); // 上位2桁だけにするためのスケーリング
  const rounded = Math.ceil(num / scale) * scale; // スケールダウンして切り上げ、元に戻す

  return rounded;
};
