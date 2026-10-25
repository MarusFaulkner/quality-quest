# Quality Quest: Stop the Defects

A five-stage browser game that teaches real manufacturing quality skills, hosted by **Mister Quality**. Players work a part from the receiving dock to the shipping dock and earn a rank from **Trainee** to **MISTER QUALITY**.

> Five stages. Real skills. A stronger tomorrow.

## Play

Live at: 

[**https://marusfaulkner.github.io/quality-quest/**](https://marusfaulkner.github.io/quality-quest/)

Works on phones and desktops. No install, no account, no build step.` once deployed (see below).

Works on phones and desktops. No install, no account, no build step.

## The five stages

| Stage | Name | What the player does | Skill |
|---|---|---|---|
| 1 | **The Gatekeeper** | Compares 12 incoming lots against the drawing and receiving packet, then calls ACCEPT, HOLD or REJECT | Incoming inspection, documentation, traceability |
| 2 | **Catch It Before It Ships** | Taps defective housings on a two-lane conveyor before they reach shipping. 60 seconds, rising speed, combo multiplier | Visual defect detection |
| 3 | **Measure Twice** | Reads a blueprint, pulls the right gauge off the tool wall, takes the reading and judges IN or OUT of tolerance | Metrology, gauge selection, the 10:1 rule |
| 4 | **Find the Why** | Reviews an evidence board, writes a problem statement, builds a 5 Whys chain past dead ends and picks a corrective action | Root cause analysis |
| 5 | **Quality Under Pressure** | Boss level against a 3-minute clock: inspect, measure, contain, find the cause, fix it, check the paperwork, make the shipment call | Everything combined |

### Scoring and ranks

- Every stage ends with a rank: **Trainee → Inspector → Quality Specialist → Quality Champion → MISTER QUALITY**.
- An **escape** (passing a bad part) is the most expensive mistake and caps that stage at Quality Specialist.
- **False rejects** cost points too. Good parts scrapped are real money.
- **Badges** for exceptional play: Zero Escapes, Perfect Gauge Picks, No Dead Ends, Containment Pro, Perfect Final Call.
- The **Factory Dashboard** after Stage 5 scores five categories: Inspection Accuracy, Defect Detection, Measurement, Root Cause Analysis and Quality Judgment.
- The **MISTER QUALITY** title requires all five stages, an overall score of 88% or higher, and the right final call. Players who earn it get a celebration screen and a named Certificate of Completion.

The certificate is a game achievement, not a professional quality certification.

## Teaching content

Scenarios are built around real inspection practice:

- Tolerance limits are inclusive. A reading exactly at the limit conforms.
- Unilateral tolerances (+0.05 / −0.00) catch players who only look at the distance from nominal.
- Gauge resolution should be one-tenth of the tolerance band. A caliper on a ±0.010 journal rounds an oversize part into tolerance.
- Missing CoCs, revision mismatches, transposed heat numbers and expired gauge calibration call for HOLD, not ACCEPT.
- Root causes are systemic. Blaming the operator is a dead end, and fixing only the sensor is a weak corrective action.
- Containment follows the evidence back to the last known good check.

## Run locally

Any static file server works. From the project folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` directly from disk also works in most browsers.

## Deploy to GitHub Pages

1. Create a new repository on GitHub named `quality-quest`.
2. Push this folder to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Quality Quest v1.0"
   git branch -M main
   git remote add origin https://github.com/<your-username>/quality-quest.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
4. The included workflow (`.github/workflows/pages.yml`) deploys on every push to `main`. The site URL appears in the **Actions** run summary and on the Pages settings screen.

## Project structure

```
quality-quest/
├── index.html                  Page shell, fonts, shared SVG gradients
├── css/styles.css              All styles, grouped by stage
├── js/game.js                  Game logic, data and screens (no dependencies)
├── assets/
│   ├── favicon.svg
│   └── img/
│       ├── logo.jpg, hero.jpg  Title screen art
│       ├── crate.jpg, scene.jpg, flange.jpg, bg.jpg     Stage 1
│       ├── s2*.jpg … s5*.jpg   Stage intro art and backgrounds
│       └── host/               Mister Quality expression portraits
├── .github/workflows/pages.yml GitHub Pages deployment
└── .nojekyll                   Serve files as-is (no Jekyll processing)
```

### Editing the game

- **Scenario data** sits near the top of each stage's section in `js/game.js`: `LOTS` (Stage 1), `DEFECTS` (Stage 2), `MEAS` (Stage 3), `EVID` / `WHYS` / `ACTIONS` (Stage 4) and the `S5_*` constants (Stage 5). Change the numbers or text there; the screens update automatically.
- **Scoring rules** are commented where they are defined in each stage.
- **Colors and fonts** are CSS custom properties on `:root` at the top of `css/styles.css`.
- **Saved progress** lives in the player's browser (`localStorage` keys `qq-sum` and `qq-name`). Clearing site data resets it.

## Tech notes

- Plain HTML, CSS and JavaScript. No framework, no bundler, no npm.
- Fonts load from Google Fonts (Lilita One, Barlow, Barlow Condensed, Share Tech Mono, Great Vibes) with system fallbacks.
- Sound effects are synthesized with the Web Audio API, start only after the first tap, and can be muted from the top bar.
- Respects `prefers-reduced-motion`.

## Credits

Concept, scenarios and character art direction by **Marcus Faulkner**, Quality Inspector, who plays Mister Quality.

## License

No license has been chosen yet. Until one is added, all rights are reserved by the author. To let others reuse the code, add a `LICENSE` file (MIT is a common choice for code). The character artwork can be kept under separate terms.
