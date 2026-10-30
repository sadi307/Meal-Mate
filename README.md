# MealMate — responsive frontend
## Live Link : https://mealmateeee.netlify.app

A home-style Bangladeshi meal ordering and subscription site for Chattogram. **Frontend only** — React + Vite + Tailwind, no server, no database. All data lives in your browser.

Fully bilingual (English and বাংলা), real photographs throughout, and every page works from a 320px phone up to a wide desktop.

## Run it in VS Code

1. Unzip the folder somewhere sensible (not inside OneDrive — it makes `node_modules` crawl).
2. **File → Open Folder →** `mealmate-frontend`.
3. Open a terminal with **Ctrl + `** and run:

```bash
npm install
npm run dev
```

It opens `http://localhost:5173` by itself. That is everything — no `.env`, no database, no second terminal.

```bash
npm run build     # production build into dist/
npm run preview   # serve that build locally
```

**Check it on your actual phone:** `npm run dev` prints a Network address like `http://192.168.0.14:5173`. Open that on a phone on the same wifi.

### Recommended extensions
ESLint, Tailwind CSS IntelliSense, ES7+ React snippets. Tailwind IntelliSense will autocomplete the custom colours (`bg-leaf`, `text-turmeric`, `bg-rice-deep`).

## Sign in

The login page has buttons that fill these in for you.

| Role | Email | Password |
|---|---|---|
| Customer | tanvir@mealmate.test | Tanvir@123 |
| Admin | admin@mealmate.test | Admin@12345 |
| Rider | rider@mealmate.test | Rider@1234 |

Registering a new account works too, and gives you ৳250 welcome credit. Account → Settings → **Reset demo data** puts everything back to the starting state.

## What's in it

**23 pages.** Home, menu with search and filters, dish detail with reviews, subscription plans, build-your-own-plate, cart, checkout, order confirmation, about, sign in, register, 404. Eight account pages (dashboard, orders, subscription, wishlist, wallet, notifications, profile, settings). Seven admin pages (overview with charts, orders, meals, customers, subscriptions, coupons, delivery board). Plus a rider board.

Everything works: place an order and it appears in your order history, moves through the admin board, fires notifications, and refunds to your wallet if you cancel it.

## Bengali and English

Tap **EN / বাংলা** in the navbar — top right on desktop, inside the menu on a phone. There's also a control in Account → Settings that saves the choice to the account. The selection is remembered in `localStorage`, and a browser set to Bengali gets Bengali on the first visit.

Switching changes:

- **Every interface string.** About 300 of them, held in `src/data/strings.js` as `{ en, bn }` pairs.
- **Dish names, descriptions and ingredients.** Each meal in `src/data/seed.js` carries `nameBn`, `descriptionBn` and `ingredientsBn`; plans carry `nameBn`, `pitchBn` and `featuresBn`. The dish detail page also shows the other language's name underneath, the way a real Bangladeshi menu does.
- **Numbers.** ৳১,১৫০ rather than ৳1,150 — prices, quantities, counts, calories and dates all use Bengali numerals.
- **Dates, weekdays and delivery slots.** ২১ সেপ্ট, বুধ, ১:০০ টা.
- **Areas.** আগ্রাবাদ, জিইসি মোড়, খুলশী and the rest.
- **The typeface.** Bengali switches to Hind Siliguri with a taller line height, since Latin metrics look cramped in Bengali script. `<html lang>` updates too, so screen readers use the right voice.

Adding a string:

```js
// src/data/strings.js
'cart.title': { en: 'Your cart', bn: 'আপনার কার্ট' },
```

```jsx
const { t } = useLang()
<h1>{t('cart.title')}</h1>
```

Placeholders work as `t('cart.items', { n: 3 })`. A missing key renders as the key itself, so gaps are obvious rather than silent. For bilingual data fields there's `pick(meal, 'name')`, which returns `nameBn` in Bengali and `name` otherwise.

The admin and kitchen screens are deliberately left in English — that's staff-facing tooling, not the customer site. Wiring them up is the same `t()` call if you want it.

## Responsive

Built mobile-first and checked at 320, 375, 414, 768, 1024, 1280 and 1536px.

- One column on phones, two on tablets, three or more on desktop
- Headings step down in size rather than wrapping awkwardly — the home hero runs 31px → 42px → 54px
- Every button and chip is at least 44px tall, the comfortable thumb size
- Inputs are 16px on small screens, so iOS Safari doesn't zoom when you tap one
- Wide admin tables scroll inside their own box; the page itself never scrolls sideways
- The navbar collapses to a slide-down menu, the admin sidebar to an off-canvas drawer
- `env(safe-area-inset-*)` keeps content clear of the notch and the home indicator
- Images use `srcSet` so a phone downloads a 400px file, not a 1200px one
- Everything animated respects `prefers-reduced-motion`

## Images

Real photos from Unsplash, free under the Unsplash licence, credited on the About page.

They are defined in one place — **`src/data/images.js`**. To use your own pictures instead, drop files into `public/images/` and change the values:

```js
export const DISH_PHOTOS = {
  'chicken-curry-rice': '/images/my-chicken-curry.jpg',
  ...
}
```

The `<Dish />` component in `src/components/Dish.jsx` handles the rest: lazy loading, a skeleton while the file arrives, a fixed aspect ratio so the layout never jumps, and a fallback if a URL breaks.

## How the data works

There is no backend. `src/lib/api.js` is a mock API that answers the same calls a real server would:

```js
const { data } = await api.get('/meals?category=lunch&sort=popular')
const { data } = await api.post('/orders', { items, address, slot, paymentMethod })
```

It reads and writes `localStorage`, so your cart, orders, wallet and sign-in survive a page refresh. Pages are written as if a real server were on the other end, which means swapping in a real backend is one file:

```js
// src/lib/api.js
import axios from 'axios'
export default axios.create({ baseURL: 'http://localhost:5000/api' })
```

Nothing else has to change. Sign-in here compares passwords in plain text in the browser — fine for a demo, and the reason the real version of this project hashes them with bcrypt on a server.

## Layout

```
src/
├── components/     Dish, MealCard, Navbar, Layout, Guards, Charts, Icons, Bits
├── context/        Auth, Cart, Toast
├── data/           seed.js (all content), images.js (all photo URLs)
├── lib/            api.js (mock server), format.js
├── pages/          public pages, account/, admin/
├── App.jsx         the route table
└── index.css       Tailwind layers and the responsive base rules
```

Colours, fonts and radii are in `tailwind.config.js`: ink green, leaf, turmeric, chili, rice, steel. Fraunces for headings, Hanken Grotesk for UI, Hind Siliguri for Bengali.
