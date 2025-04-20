# Med-Eqip Frontend

A modern medical equipment e-commerce platform built with Next.js.

## Component Documentation

### ProductFilter Component

The `ProductFilter` component is a reusable filter sidebar/drawer component that can be used across multiple pages to provide consistent filtering functionality.

#### Features

- Responsive design with mobile and desktop variants
- Sticky positioning for desktop sidebar
- Animated filter groups with expand/collapse
- Support for multiple filter types (categories, brands, price ranges)
- Show/hide functionality for long filter lists
- Applied filter tags with easy removal
- Badge counter for active filters on mobile
- Consistent styling and theming

#### File Location

```
src/components/atom/ProductFilter.tsx
```

#### Usage

Import the component and its interface:

```tsx
import ProductFilter, { FilterState } from "@/components/atom/ProductFilter";
```

Use in your page component:

```tsx
function YourPage() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRanges: [],
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Apply filtering logic here
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <div className="flex">
      {/* Filter component for both mobile and desktop */}
      <div className="md:w-1/4">
        <ProductFilter
          onFilterChange={handleFilterChange}
          initialFilters={filters}
          productCount={productCount}
          isMobileFilterOpen={isMobileFilterOpen}
          onToggleMobileFilter={toggleMobileFilter}
        />
      </div>

      {/* Your content */}
      <div className="md:w-3/4">{/* Page content */}</div>
    </div>
  );
}
```

#### Props

| Prop                   | Type                             | Description                               |
| ---------------------- | -------------------------------- | ----------------------------------------- |
| `onFilterChange`       | `(filters: FilterState) => void` | Callback when filters are changed         |
| `categories`           | `FilterItem[]`                   | Optional array of category objects        |
| `brands`               | `FilterItem[]`                   | Optional array of brand objects           |
| `priceRanges`          | `FilterItem[]`                   | Optional array of price range objects     |
| `initialFilters`       | `FilterState`                    | Initial filter state                      |
| `productCount`         | `number`                         | Number of products (shown in mobile view) |
| `isMobileFilterOpen`   | `boolean`                        | Whether mobile filter is open             |
| `onToggleMobileFilter` | `() => void`                     | Callback to toggle mobile filter          |

#### FilterState Interface

```tsx
export interface FilterState {
  categories?: string[];
  brands?: string[];
  priceRanges?: string[];
}
```

#### FilterItem Interface

```tsx
interface FilterItem {
  id: string;
  name: string;
  count: number;
}
```

## Pages Using ProductFilter

- Product Catalog Page (`src/views/catalog/catalog-page.tsx`)
- Products Page (`src/views/products/products-page.tsx`)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
