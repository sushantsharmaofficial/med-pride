import ProductsPage from "../../../views/products/products-page";
import { Metadata } from "next";

// Map category slugs to proper names for metadata
const categorySlugToName: Record<string, string> = {
  "diagnostic-equipment": "Diagnostic Equipment",
  "surgical-instruments": "Surgical Instruments",
  "monitoring-devices": "Monitoring Devices",
  "imaging-systems": "Imaging Systems",
  "laboratory-equipment": "Laboratory Equipment",
  "dental-equipment": "Dental Equipment",
  "physiotherapy-equipment": "Physiotherapy Equipment",
  "emergency-care": "Emergency Care",
};

// Map brand slugs to proper names for metadata
const brandSlugToName: Record<string, string> = {
  "siemens-healthineers": "Siemens Healthineers",
  "philips-healthcare": "Philips Healthcare",
  "ge-healthcare": "GE Healthcare",
  medtronic: "Medtronic",
  drager: "Drager",
  "carl-zeiss": "Carl Zeiss",
};

type PageProps = {
  params: Promise<{
    slug?: string[];
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// Generate dynamic metadata based on the route params
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // Get slug parameters
  const resolvedParams = await params;
  const slugParams = resolvedParams.slug ?? [];

  // Base title and description
  let title = "Medical Equipment | MediPride";
  let description =
    "Browse our collection of high-quality medical equipment for healthcare facilities";

  // Check if we have category or brand in the URL
  if (slugParams.length >= 2) {
    const [type, slug] = slugParams;

    if (type === "category" && categorySlugToName[slug]) {
      const categoryName = categorySlugToName[slug];
      title = `${categoryName} | Medical Equipment | MediPride`;
      description = `Browse our collection of high-quality ${categoryName.toLowerCase()} for healthcare professionals and facilities`;
    } else if (type === "brand" && brandSlugToName[slug]) {
      const brandName = brandSlugToName[slug];
      title = `${brandName} Products | Medical Equipment | MediPride`;
      description = `Explore medical equipment from ${brandName} - trusted solutions for healthcare facilities`;
    }
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ["/og-image.jpg"],
      type: "website",
      siteName: "MediPride Medical Equipment",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
    metadataBase: new URL("https://medipride.example.com"),
  };
}

export default async function ProductsPageWrapper({ params }: PageProps) {
  // Extract slug after awaiting
  const resolvedParams = await params;
  const slugParams = {
    slug: resolvedParams.slug || [],
  };

  return <ProductsPage params={slugParams} />;
}
