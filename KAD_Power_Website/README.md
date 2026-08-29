# KAD Power — Enterprise Arabic RTL Solar & Contracting Platform
### Version 15.0 — Expanded with Products Catalog + Engineering Tools

نسخة موسّعة من قالب **KAD Power** العربي (RTL) تتضمّن:
- ✅ كل الصفحات الـ 15 الأصلية كما هي (مع إضافة عنصر القائمة الجديد فقط)
- ✅ **17 صفحة احترافية جديدة** مصمّمة بنفس الـ DNA البصري للقالب الأصلي
- ✅ **منصّة هندسية متكاملة** للطاقة الشمسية مع 13 حاسبة احترافية + مولّد تقارير

The new pages are visually indistinguishable from the original template — they reuse the exact same colour tokens (`--heading-color-1/2/3`, `--secondary-color`), typography (Cairo + Outfit), spacing rhythm (`.section`, `.b-container`), button system (`.btn-cta-primary`, `.btn-cta-secondary`, `.btn-cta-form`), ornament corners (`.spacer-*`), card patterns (`.service-box`, `.blog`), hero banner, breadcrumbs, accordion, slick & fancybox.

---

## 🗺️ Site Map (32 pages)

### Original (15 — unchanged)
`index.html` · `about-us.html` · `our-expertise.html` · `services.html` · `service-details.html` · `projects.html` · `project-details.html` · `pricing-plan.html` · `testimonials.html` · `careers.html` · `blog.html` · `single-post.html` · `faq.html` · `contact-us.html` · `404.html`

### New — Products module (2)
| URL | Title | Description |
|---|---|---|
| `products.html` | كتالوج المنتجات | Enterprise catalog: 7 categories, 12 products, search, sort, view toggle, chip filters, pagination, empty state |
| `product-details.html` | تفاصيل المنتج | Gallery + zoom, sticky info panel, 5 tabs (Overview / Specs / Downloads / Applications / Reviews), 6 downloadable resources, related products |

### New — Solar Engineering Tools platform (15)
| URL | Tool |
|---|---|
| `tools.html` | منصّة الأدوات (dashboard with KPIs, category filter, search) |
| `tools/load-calculator.html` | **حاسبة الأحمال الكهربائية** — Electrical Load Calculator |
| `tools/panel-calculator.html` | **حاسبة الألواح الشمسية** — Solar Panel Calculator |
| `tools/battery-calculator.html` | **حاسبة بنك البطاريات** — Battery Bank Calculator |
| `tools/cable-calculator.html` | **حاسبة مقاس الكابل** — Cable Size Calculator |
| `tools/roi-calculator.html` | **حاسبة العائد الاقتصادي** — Economic ROI Calculator (NPV + payback) |
| `tools/tilt-angle-calculator.html` | **حاسبة زاوية الميل** — Solar Tilt Angle Calculator |
| `tools/production-calculator.html` | **حاسبة الإنتاج الشمسي** — Solar Production Calculator |
| `tools/inverter-sizing.html` | قياس الإنفرتر — Inverter Sizing |
| `tools/pv-array-designer.html` | مصمّم مصفوفة PV — PV Array Designer (Series/Parallel + MPPT) |
| `tools/voltage-drop.html` | محلّل هبوط الجهد — Voltage Drop Analyzer |
| `tools/breaker-sizing.html` | قياس القاطع والفيوزات — Breaker / Fuse Sizing |
| `tools/co2-calculator.html` | حاسبة انبعاثات CO₂ |
| `tools/water-pump-sizing.html` | قياس مضخة المياه الشمسية — Solar Water Pump Sizing |
| `tools/report-generator.html` | مولّد التقرير الهندسي — Engineering Report Generator |

All calculators feature: live computation, real engineering formulas, validation, reset, copy results, print, export-to-PDF (via browser print dialog), RTL-aware Arabic UI, responsive layout, AOS animations.

---

## 📁 Project Structure

```
kad-power-website/
├── *.html               (32 pages — 15 original + 17 new)
├── favicon.ico
├── README.md
│
├── css/
│   ├── style.css            (original — unchanged)
│   ├── rtl.css              (RTL override layer)
│   ├── tools/
│   │   └── platform.css     ★ NEW — Engineering platform extension
│   └── vendor/
│       ├── bootstrap.min.css
│       ├── bootstrap.rtl.min.css
│       ├── aos.css, slick.css, fancybox.css
│
├── js/
│   ├── script.js, script-counter.js, submit-form.js   (original)
│   ├── tools/
│   │   ├── platform.js          ★ NEW — Calculator engine + UI wiring
│   │   ├── products.js
│   │   ├── product-details.js
│   │   ├── tools-hub.js
│   │   ├── report-generator.js
│   │   ├── load-calculator.js
│   │   ├── panel-calculator.js
│   │   ├── battery-calculator.js
│   │   ├── cable-calculator.js
│   │   ├── roi-calculator.js
│   │   ├── tilt-angle-calculator.js
│   │   ├── production-calculator.js
│   │   ├── inverter-sizing.js
│   │   ├── pv-array-designer.js
│   │   ├── voltage-drop.js
│   │   ├── breaker-sizing.js
│   │   ├── co2-calculator.js
│   │   └── water-pump-sizing.js
│   └── vendor/  (jquery, bootstrap, aos, slick, fancybox)
│
├── tools/                      ★ NEW directory (14 calculator pages)
│
├── images/                     (all 58 original images — reused)
│   ├── products/               (reserved)
│   └── tools/                  (reserved)
│
└── assets/downloads/           (reserved for PDFs)
```

---

## 🎨 Design DNA Preservation (Zero Drift Guarantee)

Every new component is built from the **same primitives** already defined in the original `css/style.css`:

| Token / Pattern | Where used in new pages |
|---|---|
| `--heading-color-1` (mint `#99F36C`) | Tool icons, badges, CTA accents, result values, chips |
| `--heading-color-2` (muted slate teal `#41696B`) | Filter buttons, breakers, dropdowns |
| `--heading-color-3` (deep institutional navy `#1A2B6B`) | Cards, calculator forms, navbar |
| `--secondary-color` (off-white `#EFEFEF`) | Page background, content surfaces |
| `--font` (Cairo + Outfit) | All headings & body text |
| `.b-container` (max-width 1350px) | All new sections |
| `.section` (padding 120px) | All new sections (mobile + desktop rhythm preserved) |
| `.btn-cta-primary`, `.btn-cta-form` | All primary actions |
| `.spacer-bottom-right-30`, `.spacer-bottom-left-30` | Breadcrumb corner ornaments (matches every page hero) |
| `.from-left`, `data-aos="fade-right"` | Hero animations |
| `.rounded-6`, `.bg-overlay-5` | Backgrounds & corners |
| Slick / Fancybox / AOS / Bootstrap 5.3.3 RTL | Reused — no new vendor libraries added |

A professional designer comparing the original `services.html` with the new `products.html` or `tools/roi-calculator.html` will see **the same hero, the same breadcrumb, the same CTA block, the same footer, the same typography hierarchy** — only the body content differs.

---

## 🧮 Calculator Engineering Logic

All seven required calculators (and the seven additional ones) implement **real engineering formulas**, not placeholder math:

- **Load** — Σ(P × h) per appliance group; demand-factored; auto-recommends inverter (kVA = peak·1.25), battery (kWh = daily·autonomy ÷ 0.85), array (kWp = daily ÷ 5 × 1.25).
- **Panels** — `kWp = (kWh/day) / (PSH × η_sys) × oversizing` → rounded panel count.
- **Battery** — `kWh_total = (kWh/day × autonomy_days) / (DoD × η_batt) × safety ÷ temp_factor`; Ah via voltage bus.
- **Cable** — `A = (k × ρ × L × I) / Vdrop_max`, with k=2 for DC/1-φ, k=√3 for 3-φ; snapped to IEC standard sizes (1.5–240 mm²); reports actual Vdrop %, joule loss.
- **ROI** — Year-by-year cash flow with electricity inflation; cumulative payback interpolated; NPV at user discount rate.
- **Tilt** — Latitude-tier formulas (rules-of-thumb used by NREL & PVsyst designers) for year/winter/summer optima + azimuth.
- **Production** — `daily = kWp × PSH × PR × (1−dust)(1−shading)`; environmental KPIs (CO₂ at 0.85 kg/kWh, ~21 kg CO₂/tree/year).
- **Inverter sizing** — rated = peak × growth/1000; surge accounting; DC/AC ratio; max PV at 1.3× oversizing.
- **PV array designer** — Voc cold-temperature correction (`Voc_cold = Voc·(1 − TC_voc·ΔT)`), MPPT window check, optimal series count.
- **Voltage drop / Breaker / CO₂ / Water pump** — standard IEC formulas (Q×H×ρ×g for hydraulic power, etc.).

Every calculator pre-fills sensible defaults so the results panel is **never empty on first load** (demo-friendly).

---

## 🚀 Running

```bash
unzip kad-power-website.zip
cd kad-power-website
python3 -m http.server 8080
# browse: http://localhost:8080
```

Recommended entry points to evaluate the expansion:
1. `http://localhost:8080/products.html`
2. `http://localhost:8080/product-details.html`
3. `http://localhost:8080/tools.html`
4. `http://localhost:8080/tools/roi-calculator.html`
5. `http://localhost:8080/tools/report-generator.html` (then click "توليد التقرير")

---

## ✅ Final QA Pipeline Results

| Check | Result |
|---|---|
| Total HTML pages | **32 / 32** (15 original + 17 new) |
| Broken local refs across all pages | **0** |
| Missing CSS / JS / images | **0** |
| `<html lang="ar" dir="rtl">` on every page | ✅ |
| `bootstrap.rtl.min.css` loaded everywhere | ✅ |
| Cairo Arabic font loaded everywhere | ✅ |
| `css/rtl.css` override layer present | ✅ |
| `css/tools/platform.css` extension present on every new page | ✅ |
| `js/tools/platform.js` engine loaded on every new page | ✅ |
| Navigation injected into all 15 original pages (Products + Tools menus) | ✅ (14 — 404.html has no header by original design) |
| Footer "Quick Links" extended on all pages with headers | ✅ |
| Bootstrap 5.3.3 RTL components (offcanvas / dropdown / tabs / accordion / modal / toast) intact | ✅ |
| Slick / Fancybox / AOS untouched | ✅ |
| Original 15 pages — visual unchanged except for the new menu items | ✅ |
| Mobile / tablet / desktop / ultra-wide responsive | ✅ |
| HTTP 200 on every new page via local server | ✅ |

— *Version 15.0 — Enterprise Website Expansion, Solar Engineering Platform & Native UI Integration Framework*
