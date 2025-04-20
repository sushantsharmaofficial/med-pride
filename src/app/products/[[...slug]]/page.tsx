import ProductsPage from "../../../views/products/products-page";

export default function ProductsPageWrapper({
  params,
}: {
  params: { slug?: string[] };
}) {
  return <ProductsPage params={params} />;
}
