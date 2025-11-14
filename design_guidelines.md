# Design Guidelines: Sklep BHP E-Commerce Platform

## Design Approach
**Utility-Focused E-Commerce** - Industrial strength meets modern polish. This B2B/B2C safety equipment store prioritizes clarity, trust, and efficiency while maintaining visual appeal through bold color contrast and clean layouts.

**Reference Inspiration**: Drawing from Amazon's clarity + Shopify's clean product presentation + WorkwearOutfitters' industrial aesthetic.

---

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- Black: `0 0% 0%` - Primary backgrounds, text, headers
- Yellow: `48 100% 50%` - CTAs, accents, highlights, active states
- White: `0 0% 100%` - Secondary backgrounds, cards

**Supporting Colors:**
- Gray 900: `0 0% 15%` - Dark sections, footer
- Gray 800: `0 0% 20%` - Card backgrounds on dark
- Gray 100: `0 0% 96%` - Light section backgrounds
- Gray 600: `0 0% 45%` - Secondary text
- Red 600: `0 72% 51%` - Error states, urgency indicators
- Green 600: `142 71% 45%` - Success, in-stock indicators

**Dark Mode Strategy:**
- Default to light mode for product visibility
- Dark sections for visual rhythm (hero, footer)
- High contrast maintained throughout

### B. Typography

**Font Stack:**
- Primary: 'Inter' (Google Fonts) - Clean, professional, excellent readability
- Headings: 'Inter' weight 700-800
- Body: 'Inter' weight 400-500
- Accent: 'Inter' weight 600 for buttons/labels

**Scale:**
- H1: text-5xl lg:text-6xl font-bold
- H2: text-4xl lg:text-5xl font-bold
- H3: text-2xl lg:text-3xl font-semibold
- H4: text-xl font-semibold
- Body: text-base
- Small: text-sm

### C. Layout System

**Spacing Primitives:** Use Tailwind units 2, 4, 8, 12, 16, 20
- Micro spacing: p-2, gap-2
- Component internal: p-4, gap-4
- Section padding: py-12 md:py-16 lg:py-20
- Container margins: mx-4 md:mx-8

**Grid System:**
- Container: max-w-7xl mx-auto px-4
- Product grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Feature sections: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

### D. Component Library

**Navigation:**
- Sticky header with black background
- Yellow logo accent or yellow underline on active nav items
- Mobile: Hamburger menu, black slide-out panel
- Desktop: Horizontal nav with hover yellow underline

**Hero Section:**
- Full-width with dark background (black or gray-900)
- Large heading in white with yellow keyword highlights
- Yellow CTA button (bg-yellow-400 text-black)
- Background: Industrial texture or safety equipment imagery

**Product Cards:**
- White background with subtle shadow (shadow-md)
- Product image with hover scale effect (hover:scale-105 transition)
- Price in large bold text
- Yellow "Add to Cart" button
- Stock indicator: Green dot + "W magazynie" or Red + "Brak"
- Category badge in top-right

**Buttons:**
- Primary: bg-yellow-400 text-black font-semibold px-8 py-3 rounded-lg hover:bg-yellow-500
- Secondary: border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black
- Outline on images: backdrop-blur-sm bg-black/30 border-2 border-white text-white

**Forms:**
- Input fields: border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20
- Labels: text-sm font-medium text-gray-700
- Error states: border-red-500 text-red-600

**Footer:**
- Black background with yellow accents
- Multi-column layout: Company info, Quick links, Categories, Contact
- White text with yellow highlights on hover
- Location prominently displayed: "Nowy Dwór Mazowiecki, Poland"

### E. Page-Specific Layouts

**Homepage:**
1. Hero: Full-width black background, bold headline, yellow CTA
2. Category Grid: 4 cards with category icons/images
3. Featured Products: 4-8 products in grid
4. Trust Badges: Certifications, shipping info, returns (icons + text)
5. CTA Section: Yellow background, black text, final conversion push

**Product Catalog (/shop):**
- Left sidebar: Category filters, price range, stock filter
- Right main: Product grid with sorting options
- Breadcrumbs at top
- Pagination at bottom

**Product Detail (/product/:id):**
- Left: Large product image with gallery thumbnails
- Right: Name, price, stock status, quantity selector, Add to Cart
- Below: Tabs for Description, Specifications, Reviews

**Cart:**
- Table layout: Product image, name, price, quantity, subtotal
- Right sidebar: Order summary, promo code, checkout button
- Empty cart state: Icon + message + "Kontynuuj zakupy" link

**Checkout:**
- Two-column: Left form (contact, shipping, payment), Right summary
- Progress indicator: Koszyk → Dostawa → Płatność → Potwierdzenie
- Yellow submit button: "Złóż zamówienie"

---

## Images

**Hero Section:**
- Large background image: Industrial warehouse or safety equipment in organized shelving (70% opacity overlay)
- Alternative: Worker in high-vis gear with hard hat, industrial setting

**Category Cards:**
- Workwear: Coveralls on mannequin
- Safety Equipment: Hard hats and safety glasses
- Footwear: Steel-toe boots
- Gloves: Various work gloves display
- Protective Gear: Face shields and respirators

**Product Images:**
- Clean white background
- Front view primary, detail shots in gallery
- Consistent sizing: 600x600px minimum

**Trust Section:**
- Icons for: Fast shipping, 30-day returns, certified products, customer support (use Heroicons)

---

## Polish Language Elements

- All UI text in Polish
- Currency: PLN (zł)
- Common terms: "Dodaj do koszyka", "Kontynuuj zakupy", "Złóż zamówienie", "W magazynie"
- Address format: Nowy Dwór Mazowiecki, Poland (footer + contact)

---

## Key Interactions

- Product card hover: Slight lift (shadow-lg) + image scale
- Cart icon: Yellow badge with item count
- Sticky header: Reduces padding on scroll
- Loading states: Yellow spinner on black background
- Toast notifications: Black background, yellow border, positioned top-right

This industrial-strength design balances professional B2B aesthetics with modern e-commerce UX, using the distinctive black-yellow palette to create memorable brand identity while maintaining excellent usability for Polish customers.