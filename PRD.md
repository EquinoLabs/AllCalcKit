# ConverterHub — Product Requirements Document

**Version:** 1.0  
**Date:** 2026-08-06  
**Status:** Draft

---

## Goal

Build a single, clean website that serves as a one-stop tool for all everyday calculations and conversions. The intent is to replace scattered, ad-heavy online calculators with one fast, reliable, and well-designed app that covers everything a person needs in daily life — from unit conversions to financial planning to health tracking.

---

## Vision

> One website for all daily-use calculations and conversions.

No clutter. No ads. No switching between 10 different websites. Everything in one place, accessible instantly.

---

## Target Users

- Students doing assignments or exam prep
- Working professionals handling finance and taxes
- Fitness-conscious individuals tracking health metrics
- Travelers converting currencies and units
- Home cooks scaling recipes
- Anyone who reaches for a calculator in daily life

---

## Features

### 1. Unit Converters
| Feature | Details |
|---|---|
| Length | mm, cm, m, km, inch, foot, yard, mile |
| Weight / Mass | mg, g, kg, ton, oz, lb, stone |
| Temperature | Celsius, Fahrenheit, Kelvin |
| Volume | ml, L, cup, pint, quart, gallon, fl oz |
| Area | cm², m², km², ft², yd², acre, hectare |
| Speed | km/h, mph, m/s, knots |
| Data Storage | bits, bytes, KB, MB, GB, TB |
| Pressure | Pa, bar, psi, atm, mmHg |
| Energy | J, kJ, cal, kcal, kWh, BTU |
| Time | seconds, minutes, hours, days, weeks, months, years |
| Angle | degrees, radians, gradians |
| Fuel Efficiency | km/L, mpg, L/100km |

---

### 2. Currency & Finance
| Feature | Details |
|---|---|
| Currency Converter | Live exchange rates — USD, EUR, INR, GBP, JPY, and more |
| Loan / EMI Calculator | Principal, interest rate, tenure → monthly payment |
| SIP Calculator | Monthly investment + return rate → maturity value |
| FD / RD Calculator | Fixed and recurring deposit maturity amount |
| Compound Interest | Principal, rate, compounding frequency, time |
| Simple Interest | Principal, rate, time |
| GST / VAT / Tax Calculator | Add or remove tax from a price |
| Tip Calculator | Bill amount, tip %, number of people → split amount |
| Discount Calculator | Original price + % off → final price + savings |
| Profit & Loss Calculator | Cost price, selling price → profit/loss % |
| Salary / CTC Calculator | Gross to net with standard deductions |

---

### 3. Health & Fitness
| Feature | Details |
|---|---|
| BMI Calculator | Body Mass Index with category (underweight/normal/obese) |
| BMR Calculator | Basal Metabolic Rate — calories burned at rest |
| TDEE Calculator | Total Daily Energy Expenditure by activity level |
| Body Fat % Calculator | Using Navy method or other standard formulas |
| Ideal Body Weight | Based on height and gender |
| Calorie Intake Planner | Goal-based — lose, gain, or maintain weight |
| Water Intake Calculator | Daily water requirement based on body weight |
| Pregnancy Due Date | From last menstrual period date |
| Ovulation Calculator | Fertile window estimation |
| Age Calculator | Exact age in years, months, and days |

---

### 4. Math & Numbers
| Feature | Details |
|---|---|
| Percentage Calculator | X is what % of Y; % increase/decrease |
| Fraction ↔ Decimal | Convert between fractions and decimals |
| Number Base Converter | Binary, octal, decimal, hexadecimal |
| Scientific Calculator | Standard scientific operations |
| Roman Numeral Converter | Integer ↔ Roman numeral |
| Prime Number Checker | Check if a number is prime |
| LCM / GCD Calculator | Least common multiple and greatest common divisor |
| Ratio & Proportion | Solve for missing values in a ratio |
| Average / Mean / Median / Mode | Statistical measures from a list of numbers |
| Standard Deviation | Population and sample standard deviation |

---

### 5. Date & Time
| Feature | Details |
|---|---|
| Date Difference | Number of days, months, years between two dates |
| Date Add / Subtract | Add or subtract N days/months/years from a date |
| Time Zone Converter | Convert time across global time zones |
| Stopwatch / Timer | Countdown and stopwatch functionality |
| Unix Timestamp | Convert between Unix timestamp and human-readable date |
| Week Number | Find which week of the year a date falls in |
| Working Days Calculator | Count business days, excluding weekends and holidays |

---

### 6. Cooking & Food
| Feature | Details |
|---|---|
| Recipe Converter | Scale ingredient quantities up or down by serving count |
| Cooking Measurements | cups, tablespoon, teaspoon, ml, grams — bidirectional |
| Oven Temperature | °F, °C, and gas mark conversion |
| Nutritional Macro Calculator | Input grams of protein/carbs/fat → calories breakdown |

---

### 7. Construction & Everyday Life
| Feature | Details |
|---|---|
| Area & Paint Calculator | Room dimensions → liters of paint needed |
| Flooring / Tile Calculator | Room area → number of tiles with wastage % |
| Concrete Mix Calculator | Volume → cement, sand, aggregate quantities |
| Electricity Bill Estimator | Appliance wattage × daily hours × rate → monthly cost |
| Fuel Cost Calculator | Distance, fuel efficiency, price per liter → trip cost |
| Clothing Size Converter | US, UK, EU, IN sizing for men, women, kids |

---

### 8. Text & Encoding
| Feature | Details |
|---|---|
| Word / Character Counter | Live count of words, characters, sentences, paragraphs |
| Color Converter | HEX ↔ RGB ↔ HSL with visual color preview |
| Base64 Encoder / Decoder | Encode and decode Base64 strings |
| URL Encoder / Decoder | Percent-encode and decode URLs |
| Case Converter | UPPER, lower, Title Case, camelCase, snake_case, PascalCase |

---

## Design Principles

1. **Speed** — Tools should work instantly, no loading spinners for simple calculations
2. **Simplicity** — Clean UI, minimal steps to get a result
3. **Mobile-first** — Fully responsive, usable on phone with one hand
4. **No login required** — Everything works without an account
5. **No ads** — Clean, distraction-free experience
6. **Offline-capable** — Core converters should work without internet (PWA)

---

## Technical Considerations

- **Currency rates** require a live API (e.g., ExchangeRate-API, Open Exchange Rates)
- **PWA support** for offline use and home screen installation
- **URL-based state** — each calculator should have a shareable URL (e.g., `/bmi?weight=70&height=175`)
- **Dark mode** support
- **Keyboard accessible** — all inputs operable via keyboard

---

## Phases

### Phase 1 — MVP
- All 12 unit converters
- BMI Calculator
- EMI / Loan Calculator
- Percentage Calculator
- Date Difference Calculator
- Tip Calculator
- Currency Converter (with live rates)

### Phase 2 — Health & Finance Suite
- Full Health & Fitness section
- Full Currency & Finance section

### Phase 3 — Complete Feature Set
- Cooking & Food
- Construction & Everyday Life
- Math & Numbers
- Date & Time complete

### Phase 4 — Polish & PWA
- Text & Encoding tools
- PWA / offline support
- Dark mode
- URL-based state sharing
- SEO optimization

---

## Success Metrics

- User can complete any conversion in under 5 seconds
- Works on mobile without horizontal scrolling
- Loads in under 2 seconds on a standard connection
- All calculators produce accurate results (validated against known references)
