import { Container } from "@/com/ui/comps";
import { Sidebar } from "@/view/comps/bar/side";
import { ProductsList } from "@/view/pages/products/list";

export default function ProductsListPage() {
  return (
    <Container>
      <Sidebar />

      <ProductsList />
    </Container>
  );
}
