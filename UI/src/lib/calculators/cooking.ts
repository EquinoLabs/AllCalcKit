/**
 * Pure Cooking & Food Calculation Engine for AllCalcKit
 */

export function scaleRecipeQuantity(
  originalQty: number,
  originalServings: number,
  targetServings: number
): number {
  if (originalQty <= 0 || originalServings <= 0 || targetServings <= 0) return 0;
  const factor = targetServings / originalServings;
  const scaled = originalQty * factor;
  return parseFloat(scaled.toFixed(4));
}
