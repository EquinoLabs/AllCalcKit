/**
 * Pure Unit Conversion Engine for AllCalcKit
 */

export interface UnitDefinition {
  id: string;
  name: string;
  ratio: number;
  offset?: number;
}

export function convertUnit(
  val: number,
  fromUnit: UnitDefinition,
  toUnit: UnitDefinition,
  isTemperature: boolean = false
): number {
  if (isNaN(val)) return NaN;

  if (isTemperature) {
    let celsius = val;
    if (fromUnit.id === 'f') celsius = (val - 32) * (5 / 9);
    else if (fromUnit.id === 'k') celsius = val - 273.15;

    if (toUnit.id === 'c') return celsius;
    if (toUnit.id === 'f') return (celsius * 9 / 5) + 32;
    if (toUnit.id === 'k') return celsius + 273.15;
    return celsius;
  }

  // Linear ratio-based conversion (pivot to standard base unit)
  const inBase = val * fromUnit.ratio;
  return inBase / toUnit.ratio;
}

export function formatUnitResult(result: number): string {
  if (isNaN(result)) return '';
  if (Number.isInteger(result)) return result.toString();
  return parseFloat(result.toFixed(6)).toString();
}
