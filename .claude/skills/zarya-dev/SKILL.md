---
name: zarya-dev
description: >
  Development guide and code generation assistant for the ZARYA (ЗАРЯ) project — an AI-powered urban environment monitoring platform website. Use this skill whenever the user asks to generate, build, develop, style, create, or modify any part of the ZARYA website: landing page sections, components, pages, design system, CSS/styling, layout, navigation, responsive behavior, animations, or UI elements. Also trigger when the user references the ZARYA color palette, typography, visual direction, section structure, or placeholder content rules. This skill should be used for ANY frontend work in the MGSZARYA project, even if the user doesn't explicitly say "ZARYA" — if they're working in this repo and asking about components, pages, or styles, this skill applies.
---

# ZARYA Development Guide

You are building the website for **ЗАРЯ** (ZARYA) — an AI platform for monitoring container sites and urban environment conditions. The system receives images from cameras, analyzes them via AI, and helps operators see site status, camera cards, a map of monitoring points, and reports.

This guide defines the visual language, architecture, content rules, and technical standards for all frontend work on this project. Treat it as the source of truth for every component, page, and style decision.

---

## Phase Strategy

**Phase 1 (current):** Landing page at `/`. This is the only page being built now.

**Future pages** (architecture must support easy expansion):
| Route         | Purpose                                      |
|---------------|----------------------------------------------|
| `/about`      | Platform description, role in urban monitoring |
| `/technology` | AI module, image processing, analysis logic   |
| `/features`   | System functions and use cases                |
| `/demo`       | Screenshots, mockups, interface demonstration |
| `/roadmap`    | Development plan (placeholder content)        |
| `/contacts`   | Contact form, CTA                             |

The header navigation should already include links to these future pages (they can point to anchors or placeholder routes for now). Code structure (routing, component organization, shared layouts) must make adding new pages trivial — no full redesign needed.

---

## Visual Direction

### Character
- **Industrial minimalism** — clean, grid-based, functional
- **Soviet-tech / poster mood** — bold typography, structured compositions, a sense of state-level infrastructure
- **Slight punk brutalism** — raw, confident, but NOT chaotic
- Atmospheric reference: the graphic environment of *Atomic Heart* — but translated into a modern, clean, minimalist product website. No aggression, no game UI, no visual overload.

### What the design must convey
Control. Monitoring. Analysis. Urban infrastructure. Technology. Precision.

### What to avoid (hard rules)
- Standard SaaS templates or "marketing startup" aesthetics
- Glossy UI, glassmorphism, bright/acid gradients, neon
- Material Design patterns
- Heavy animations, parallax, complex 3D effects
- Turning the site into a red monolith — the accent color must be used sparingly

---

## Color Palette

| Token              | Value     | Usage                                                        |
|--------------------|-----------|--------------------------------------------------------------|
| `--color-accent`   | `#882426` | Headings, accent lines, hover states, rare highlights        |
| `--color-secondary`| `#cdbea7` | Soft accents, light backgrounds, muted UI elements           |
| `--color-text`     | `#323030` | Main body text, thin lines, outlines, icons                  |
| `--color-bg`       | `#f5f3ef` | Primary warm light background                                |
| `--color-dark`     | `#111111` | Footer backgrounds, dark sections, contrast blocks           |
| `--color-muted`    | `#e8e6e1` | Dividers, card backgrounds, subtle separators                |

### Color rules
- The red-burgundy accent (`#882426`) is powerful — use it **sparingly**. It works for: headings, thin accent lines, hover states, small labels, occasional button fills. It should NOT dominate the page.
- The main text mass is dark (`#323030`), never red.
- The primary background is warm and light (`#f5f3ef`).
- When in doubt, use more neutrals and less accent.

---

## Typography

| Role      | Font          | Fallback                                    |
|-----------|---------------|---------------------------------------------|
| Headings  | `Gros Ventre` | Any brutalist grotesk / display sans-serif   |
| Body      | `Steppe`      | `Inter`, `Manrope`, `Arial`, sans-serif      |

### Typographic principles
- **Very large headings** — H1 should be visually dominant, oversized, confident
- **Clear hierarchy**: H1 > H2 > H3, each level distinctly different in size and weight
- **Generous whitespace** — lots of breathing room between sections and text blocks
- Headings: dense, bold, industrial character
- Body: neat, readable, zero decorativeness
- System/technical labels (e.g., `SYSTEM`, `MODULE`, `AI STATUS`) can appear in small caps or monospace, used very sparingly as atmospheric detail

---

## UI Design Principles

- **Grid-based layout** — consistent columns, aligned elements
- **Thin lines and outlines** — 1px borders, subtle separators
- **Cards**: clean, with soft border-radius (`4px`–`8px`), thin borders or subtle shadows
- **Buttons**: primarily outline style with restrained hover effects (color fill on hover, subtle transitions)
- **Small system labels**: `MONITORING PLATFORM`, `AI STATUS`, `MODULE` — used as decorative/atmospheric elements, not as primary UI. Very sparingly.
- **Background technical elements**: faint coordinate grids, delicate dividers, small monospace labels — these add texture without competing for attention
- **No heavy decorations** — every visual element must serve a purpose

---

## Landing Page Sections

The landing page has **10 sections** in this order. When generating any section, follow the structure and content rules below.

### 01. Hero
Large typographic screen. The first impression defines the entire site's character.
- **Heading**: powerful, short. Reference: *"Видеть. Анализировать. Управлять."* or similar in mood
- **Subtext**: 1–2 lines of placeholder about the system
- **Visual**: large image area / UI mockup / industrial photo treatment on the right or as background
- **Buttons**: "Посмотреть демо" (outline) and "О проекте" (filled or secondary)

### 02. Проблема (Problem)
Why the product exists. 3–4 cards or bullet points.
- Use **only generalized placeholder formulations** in Russian
- Example placeholders: `[Описание проблемы 1]`, `[Описание проблемы 2]`, etc.
- **No specific numbers, promises, real processes, or case studies**

### 03. Решение (Solution)
What the system does. Three key directions:
1. AI-анализ изображений (AI image analysis)
2. Карта мониторинга (Monitoring map)
3. Отчёты и история (Reports & history)

Each block gets a short placeholder description.

### 04. Как это работает (How It Works)
A clear 4-step scheme, best shown as a horizontal timeline or pipeline:

**Камеры** → **AI-анализ** → **Статус площадки** → **Оператор / Карта / Отчёт**

Each step gets a small icon/illustration placeholder and a brief label.

### 05. Функции системы (System Features)
A grid of 6 feature cards:
| Feature        | Russian             |
|----------------|---------------------|
| Monitoring     | Мониторинг          |
| Analytics      | Аналитика           |
| History        | История             |
| Reports        | Отчёты              |
| Map            | Карта               |
| Notifications  | Уведомления         |

Each card: icon placeholder + name + 1–2 line placeholder description.

### 06. Демонстрация интерфейса (UI Demo)
A block showcasing a **fake dashboard / mock UI**. Can include:
- A city map with pins
- A camera card with status
- An AI detection result block
- A reporting panel

All data is **fictional/neutral** — no real addresses, metrics, or operational data. This is a visual demonstration only.

### 07. Эффект от внедрения (Impact)
A value section — but **without invented KPIs**. Only general statements:
- Повышение прозрачности (increased transparency)
- Ускорение реакции (faster response)
- Улучшение контроля (better control)
- Цифровизация процессов (process digitalization)

No percentages, no "3x faster", no specific savings.

### 08. Roadmap
A visually compelling timeline section with placeholder phases:
- **Phase 01** / **Phase 02** / **Phase 03** / **Phase 04**
- Or conditional quarters without strict binding
- No real dates, no hard commitments, no partner names

### 09. CTA
A large closing block:
- Heading: *"Запросить демонстрацию системы"* or similar
- Short placeholder text underneath
- 1–2 buttons (primary action + secondary)

### 10. Footer
- Project logo / name
- Navigation links (including future pages)
- Placeholder contacts (email, placeholder phone, placeholder address)

---

## Content Rules (CRITICAL)

These rules are non-negotiable. Breaking them undermines the project's credibility.

**NEVER invent:**
- KPIs or efficiency metrics (no "reduces costs by 40%")
- Implementation dates or deadlines
- Partner names, municipalities, or organizations
- Budget figures
- Real case studies or pilot project names
- Specific maps or geographic references
- Performance promises

**ALWAYS use:**
- Neutral Russian placeholder text where business content hasn't been approved
- Generic formulations that are obviously replaceable
- Bracket notation for obviously missing content: `[Описание]`, `[Название партнёра]`

**Priority:** The visual execution must be stronger than the content. Right now, atmosphere, structure, grid, typography, and UI language matter more than copy. Build a design system first, fill in content later.

---

## Technical Requirements

### Stack
- **Semantic HTML5** — proper heading hierarchy, landmarks, accessible structure
- **CSS** (custom properties preferred) or **Tailwind CSS**
- **Vanilla JS** or **lightweight React** — no unnecessary complexity
- Code should read as a **production-ready frontend prototype**

### Responsive Design
- **Desktop-first** approach
- Mobile and tablet must look polished and intentional, not just "shrunk"
- Test mental model: does this section make sense on a phone screen?

### Code Quality
- Clean, readable structure
- Consistent naming conventions
- CSS custom properties for all design tokens (colors, spacing, typography)
- Component-oriented architecture even in vanilla HTML/CSS (clear section boundaries, reusable patterns)

### Animations
Only these types are allowed:
- `fade-in` / `fade-out` (opacity transitions)
- `translate` (subtle slide-in on scroll)
- `underline` effects on hover
- Color transitions on hover (buttons, links)
- Duration: 200ms–400ms, easing: ease-out or ease-in-out

**Forbidden:** heavy motion graphics, parallax scrolling, complex 3D transforms, canvas animations, particle effects, scroll-jacking.

---

## CSS Custom Properties Template

When starting a new file or component, ensure these design tokens are available:

```css
:root {
  /* Colors */
  --color-accent: #882426;
  --color-secondary: #cdbea7;
  --color-text: #323030;
  --color-bg: #f5f3ef;
  --color-dark: #111111;
  --color-muted: #e8e6e1;

  /* Typography */
  --font-heading: 'Gros Ventre', 'Arial Black', 'Impact', sans-serif;
  --font-body: 'Steppe', 'Inter', 'Manrope', Arial, sans-serif;

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 6rem;
  --space-section: 8rem;

  /* UI */
  --radius: 6px;
  --border: 1px solid var(--color-muted);
  --transition: 300ms ease-out;
}
```

---

## Generating a New Section

When asked to create or modify a landing page section:

1. Identify which of the 10 sections it corresponds to
2. Follow the content rules — use placeholders, never invent data
3. Apply the color palette — accent sparingly, dark text, warm background
4. Use the typography system — large headings, clear hierarchy
5. Ensure responsive behavior — desktop-first, test mobile mental model
6. Keep animations minimal — fade/translate only
7. Output semantic HTML with the CSS custom properties

## Generating a New Page

When asked to create a future page (/about, /technology, etc.):

1. Reuse the shared header/footer/navigation from the landing page
2. Apply the same design system (colors, typography, spacing, UI patterns)
3. Use placeholder content throughout — the page structure matters more than copy
4. Ensure the page integrates naturally into the existing navigation
5. Follow the same responsive and animation rules
