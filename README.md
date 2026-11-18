# Nurse’s Closet

A React, Vite and Tailwind CSS storefront for a clinical wear shop in Monrovia, Liberia.

## Run locally

Use Node.js 22 or newer. From the project directory, run:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite. Run `npm run build` for a production build.

## Catalog and orders

Update the products and store number in `src/main.jsx`. Product images are in `public/images`. The sample prices use USD and the clog price covers two pairs. Customers can search the catalog, add products to a bag, and send an order summary through WhatsApp. The shop confirms stock, fit and delivery costs in chat.

The site uses generated demo photography inspired by the product references. Replace these photos with store-approved product images before publishing.

## Pages and hosting

The home page is `/`, the full catalog is `/shop`, and each product has a direct link such as `/products/scrubs`. The bag is stored in the browser's local storage. Vite's development and preview servers serve direct links automatically.

Deploy the contents of `dist` at the domain root. The build includes a Netlify `_redirects` rule and an Apache `.htaccess` rewrite; `vercel.json` supplies the Vercel rewrite. For Nginx, serve assets normally and use `try_files $uri $uri/ /index.html;` for application routes. If using a different static host, configure the same fallback to `index.html` so refreshing `/shop` or `/products/:id` loads the app.
