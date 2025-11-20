import { Container } from "@/com/ui/comps";
import { Sidebar } from "@/view/comps/bar/side";
import { CustomersList } from "@/view/pages/customers/CustomersList";

export default function CustomersPage() {
  return (
    <Container>
      <Sidebar />
      <CustomersList />
    </Container>
  );
}
