# AllCalcKit — Calculator Content Migration Tracker

This document tracks the structured rollout of the calculator content architecture across all calculators in AllCalcKit.

## Architecture Status

- **Architecture Status**: Approved & Verified
- **Reference Implementation**: `TASK-000` (Length Converter)
- **Shared Renderer**: `src/components/calculator-content/CalculatorContent.astro`
- **Content Registry**: `src/data/calculator-content/index.ts`

---

## Migration Progress Overview

| Status | Count |
|---|---|
| **Complete** | 39 |
| **In Progress** | 0 |
| **Pending** | 0 |
| **Total Calculators** | 39 |

---

## Master Task List

### Reference Pilot

| Task ID | Calculator ID | Calculator Name | Category | Status | Content File |
|---|---|---|---|---|---|
| `TASK-000` | `length` | Length Converter | Unit Converters | **Complete / Reference** | `src/data/calculator-content/length.ts` |

---

### Batch 1 — Simple, Low-Risk & Core Everyday Tools (ALL COMPLETE)

| Task ID | Calculator ID | Calculator Name | Category | Status | Content File |
|---|---|---|---|---|---|
| `TASK-001` | `percentage` | Percentage Calculator | Math & Numbers | **Complete** | `src/data/calculator-content/percentage.ts` |
| `TASK-002` | `age-calc` | Age Calculator | Health & Fitness | **Complete** | `src/data/calculator-content/age-calc.ts` |
| `TASK-003` | `date-diff` | Date Difference | Date & Time | **Complete** | `src/data/calculator-content/date-diff.ts` |
| `TASK-004` | `word-counter` | Word & Character Counter | Text & Encoding | **Complete** | `src/data/calculator-content/word-counter.ts` |
| `TASK-005` | `weight` | Weight & Mass | Unit Converters | **Complete** | `src/data/calculator-content/weight.ts` |
| `TASK-006` | `temperature` | Temperature Converter | Unit Converters | **Complete** | `src/data/calculator-content/temperature.ts` |
| `TASK-007` | `volume` | Volume Converter | Unit Converters | **Complete** | `src/data/calculator-content/volume.ts` |

---

### Batch 2 — Remaining Unit Converters, Math, Cooking & Utilities (ALL COMPLETE)

| Task ID | Calculator ID | Calculator Name | Category | Status | Content File |
|---|---|---|---|---|---|
| `TASK-008` | `area` | Area Converter | Unit Converters | **Complete** | `src/data/calculator-content/area.ts` |
| `TASK-009` | `speed` | Speed Converter | Unit Converters | **Complete** | `src/data/calculator-content/speed.ts` |
| `TASK-010` | `data` | Data Storage Converter | Unit Converters | **Complete** | `src/data/calculator-content/data.ts` |
| `TASK-011` | `pressure` | Pressure Converter | Unit Converters | **Complete** | `src/data/calculator-content/pressure.ts` |
| `TASK-012` | `energy` | Energy Converter | Unit Converters | **Complete** | `src/data/calculator-content/energy.ts` |
| `TASK-013` | `time-units` | Time Unit Converter | Unit Converters | **Complete** | `src/data/calculator-content/time-units.ts` |
| `TASK-014` | `angle` | Angle Converter | Unit Converters | **Complete** | `src/data/calculator-content/angle.ts` |
| `TASK-015` | `fuel-efficiency` | Fuel Efficiency | Unit Converters | **Complete** | `src/data/calculator-content/fuel-efficiency.ts` |
| `TASK-016` | `cooking-units` | Cooking Measurements | Cooking & Food | **Complete** | `src/data/calculator-content/cooking-units.ts` |
| `TASK-017` | `fraction-decimal` | Fraction ↔ Decimal | Math & Numbers | **Complete** | `src/data/calculator-content/fraction-decimal.ts` |
| `TASK-018` | `number-base` | Number Base Converter | Math & Numbers | **Complete** | `src/data/calculator-content/number-base.ts` |
| `TASK-019` | `prime-checker` | Prime Number Checker | Math & Numbers | **Complete** | `src/data/calculator-content/prime-checker.ts` |
| `TASK-020` | `case-converter` | Text Case Converter | Text & Encoding | **Complete** | `src/data/calculator-content/case-converter.ts` |
| `TASK-021` | `color-converter` | Color Code Converter | Text & Encoding | **Complete** | `src/data/calculator-content/color-converter.ts` |
| `TASK-022` | `date-add` | Date Add / Subtract | Date & Time | **Complete** | `src/data/calculator-content/date-add.ts` |
| `TASK-023` | `unix-timestamp` | Unix Timestamp Converter | Date & Time | **Complete** | `src/data/calculator-content/unix-timestamp.ts` |
| `TASK-024` | `recipe-converter` | Recipe Scaler | Cooking & Food | **Complete** | `src/data/calculator-content/recipe-converter.ts` |
| `TASK-025` | `fuel-cost` | Fuel Trip Cost Calculator | Construction & Life | **Complete** | `src/data/calculator-content/fuel-cost.ts` |
| `TASK-026` | `electricity-bill` | Electricity Bill Estimator | Construction & Life | **Complete** | `src/data/calculator-content/electricity-bill.ts` |

---

### Batch 3 — Financial Calculators & Health & Fitness Metrics (ALL COMPLETE)

| Task ID | Calculator ID | Calculator Name | Category | Status | Content File |
|---|---|---|---|---|---|
| `TASK-027` | `currency` | Currency Converter | Financial Calculators | **Complete** | `src/data/calculator-content/currency.ts` |
| `TASK-028` | `loan-emi` | Loan / EMI Calculator | Currency & Finance | **Complete** | `src/data/calculator-content/loan-emi.ts` |
| `TASK-029` | `sip` | SIP Investment Calculator | Currency & Finance | **Complete** | `src/data/calculator-content/sip.ts` |
| `TASK-030` | `compound-interest` | Compound Interest | Currency & Finance | **Complete** | `src/data/calculator-content/compound-interest.ts` |
| `TASK-031` | `fd-rd` | FD & RD Calculator | Currency & Finance | **Complete** | `src/data/calculator-content/fd-rd.ts` |
| `TASK-032` | `tax-gst` | GST & Sales Tax | Currency & Finance | **Complete** | `src/data/calculator-content/tax-gst.ts` |
| `TASK-033` | `discount` | Discount Calculator | Currency & Finance | **Complete** | `src/data/calculator-content/discount.ts` |
| `TASK-034` | `tip-split` | Tip & Bill Splitter | Currency & Finance | **Complete** | `src/data/calculator-content/tip-split.ts` |
| `TASK-035` | `bmi` | BMI Calculator | Health & Fitness | **Complete** | `src/data/calculator-content/bmi.ts` |
| `TASK-036` | `bmr` | BMR Calculator | Health & Fitness | **Complete** | `src/data/calculator-content/bmr.ts` |
| `TASK-037` | `tdee` | TDEE Calculator | Health & Fitness | **Complete** | `src/data/calculator-content/tdee.ts` |
| `TASK-038` | `water-intake` | Daily Water Intake | Health & Fitness | **Complete** | `src/data/calculator-content/water-intake.ts` |
