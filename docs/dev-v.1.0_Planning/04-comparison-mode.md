# Feature 4: Comparison Mode

## What this is
Lets a user compare two scenarios side-by-side on the same calculator, instead of only
seeing one result at a time — e.g. two loan offers, two BMI targets, two SIP
contribution amounts.

## Scope for this pass
Pilot this on **one tool only** — Loan/EMI Calculator is the strongest candidate
(comparing two loan offers is a genuinely common real-world need). Do not roll out to
multiple tools in this pass; evaluate after shipping on one before expanding.

## Implementation approach
1. Add a "Compare" toggle/button on the Loan/EMI calculator page. When enabled, the
   page shows two side-by-side (or stacked on mobile) input sets — "Scenario A" and
   "Scenario B" — each with their own amount/rate/tenure sliders.
2. Both scenarios calculate independently using the exact same EMI formula already in
   use on the page (do not duplicate/rewrite the calculation logic — extract it into a
   shared function both scenario instances call, if it isn't already a standalone
   function).
3. Show both results side by side, and ideally a clear callout of the difference
   (e.g. "Scenario A saves $X in total interest" or "$Y lower monthly payment").
4. Keep single-scenario mode as the default view — comparison mode is opt-in via the
   toggle, not the new default, so existing users/links aren't disrupted.

## What NOT to do
- Do not build a generic "comparison framework" meant to work across all tool types in
  this pass — build it specifically for Loan/EMI first, see how it feels, generalize
  later only if it's worth repeating elsewhere.
- Do not duplicate the EMI calculation code between the two scenario instances — reuse
  one function for both.

## Testing
- Verify both scenarios calculate correctly and independently (changing Scenario A's
  inputs should never affect Scenario B's result and vice versa).
- Confirm the layout works on mobile (side-by-side likely needs to stack vertically
  below a certain screen width).
- Confirm toggling comparison mode on/off doesn't lose or corrupt the single-scenario
  calculator's existing state.
