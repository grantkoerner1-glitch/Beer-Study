# Beer Study Website (Durham)

Modern single-page marketing site for **Beer Study**, crafted for local discovery, foot traffic, and event-driven engagement.

## File structure

- `index.html` — semantic page structure and branded content sections.
- `styles.css` — responsive visual system, layout, and animations.
- `script.js` — tap list filtering, mobile nav, reveal animations, and dynamic year.

## Run locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Quick customization

- Update tap items in `script.js` (`tapData` array).
- Update hours/contact in `index.html` under `#visit`.
- Adjust color system in `styles.css` under `:root` variables.
