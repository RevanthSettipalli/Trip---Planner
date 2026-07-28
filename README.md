# ✈️ Trip Craft AI — Interactive AI Trip Planner

An interactive, stateful React / Next.js application that converts free-form travel prompts into structured day-by-day itineraries. Built as part of the **Frontend Internship Assignment**.

---

## 🌟 Key Features

1. **Free-Form Prompt to Structured Data**:
   - Takes natural language requests (e.g. *"4 days in Tokyo focusing on food, anime, and historic shrines on a moderate budget"*).
   - Generates pure **structured JSON** from the LLM, validated with strict Zod schemas, and renders interactive UI components (no raw text chat boxes).

2. **Interactive Stateful UI**:
   - **Expand / Collapse**: View stop details, opening hours, insider tips, and estimated costs.
   - **Reorder Stops**: Move stops up and down within any day's sequence.
   - **Edit & Remove Stops**: Edit titles, descriptions, and costs, or remove stops with an **Undo** notification toast.
   - **Manual Stop Addition**: Add custom landmarks or restaurants to any day.

3. **Multi-Block UI Visualization (Stretch Goal)**:
   - **Visual Route Map**: Geographic stop sequence map with interactive marker selection.
   - **Budget Breakdown Chart**: Visual stacked breakdown of estimated expenses (food, sightseeing, transport, stay).
   - **Interactive Packing Checklist**: Pre-trip preparation & packing checklist with progress tracking.

4. **Refinement Loop (Stretch Goal)**:
   - Submit follow-up modification prompts (e.g. *"Make Day 2 less intense on walking"*) without regenerating the entire trip from scratch.

5. **Session Persistence (Stretch Goal)**:
   - Save, load, and manage multiple trip planning sessions via `localStorage`.

---

## 🛡️ Resilience & Failure Handling (20% Grade Weight)

Handling unpredictable AI output is a core highlight of this project:

- **JSON Extraction & Auto-Repair (`lib/schema.ts`)**:
  - Automatically strips markdown fences (` ```json ... ``` `).
  - Repair heuristics for trailing commas, unclosed brackets, missing quotes around keys, and trailing garbage.

- **Strict Zod Schema Validation**:
  - Validates nested schemas (`TripItinerary`, `DayItinerary`, `ItineraryStop`).
  - Implements fallback defaults and auto-repair for non-critical missing properties.

- **Race Condition & Stale Response Protection (`hooks/useTripPlanner.ts`)**:
  - Uses `AbortController` and timestamped Request IDs to cancel in-flight fetches and ignore late-arriving responses when a user submits consecutive prompts.

- **Evaluator Test Workbench (`components/FailureSimulator.tsx`)**:
  - An interactive test panel allowing evaluators to simulate:
    - 💥 **Malformed JSON** (syntax errors)
    - ⚠️ **Wrong Schema Shape** (missing key arrays)
    - ⌛ **Network Timeout** (12-second latency test)
    - 🚫 **Server 500 Failure** (API key or provider outage)
    - 📭 **Empty AI Response** (0-token output)

- **Zero-Config Mock AI Mode**:
  - If no `GEMINI_API_KEY` is configured in `.env.local`, the application seamlessly falls back to a realistic offline AI generator so evaluators can run `npm install && npm run dev` immediately without needing API keys.

---

## 🛠️ Stack & Architecture

- **Frontend**: Next.js 14 (App Router), React 18 (Hooks), TypeScript, Tailwind CSS, Lucide Icons, Framer Motion.
- **AI Integration**: Server-side Next.js API Routes (`/api/generate` & `/api/refine`) consuming `@google/generative-ai` (Gemini 1.5 Flash).
- **Validation**: Zod schema validation & auto-repair parser.
- **Storage**: LocalStorage session management.

---

## 🚀 Quickstart & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables (Optional)
Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
> **Note**: If `GEMINI_API_KEY` is omitted, the app automatically operates in zero-config **Mock AI Mode** with full interactive functionality!

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤖 AI Usage Note (Honest Disclosure)

In accordance with assignment guidelines:
- **AI Tools Used**: **Antigravity AI (Gemini 3.6 Flash)** pair programming assistant.
- **What AI was used for**:
  - Initial scaffolding of Next.js App Router structure and TypeScript interfaces.
  - Formulating Zod validation schemas and auto-repair regex heuristics.
  - Designing responsive Tailwind CSS UI cards and mock travel data sets.
- **Developer Ownership**: All component state logic, race condition abort controllers, error boundary flow, stop reordering state machines, and API route security were reviewed, integrated, and verified to ensure full code understanding for live interview extension.

---

## ⏱️ Time Spent & Known Limitations

- **Time Spent**: ~4.5 hours total (planning, architecture setup, failure handling, UI components, refinement loop, and testing).
- **Known Limitations & Future Roadmap**:
  - *Google Maps API*: Current map route uses interactive SVG timeline coordinates; future iteration can connect directly to Google Places API key for real-time traffic route calculations.
  - *Calendar Export*: Future update can add `.ics` iCal export for direct sync into Apple / Google Calendar.
