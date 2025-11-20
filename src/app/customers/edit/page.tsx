import { CustomersEdit } from "@/view/pages/customers/CustomersEdit";
import { Container } from "@/com/ui/comps";
import { Sidebar } from "@/view/comps/bar/side";

export default function CustomersEditPage() {
  return (
    <Container>
      <Sidebar />
      <CustomersEdit />
    </Container>
  );
}
