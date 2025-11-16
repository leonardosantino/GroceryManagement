import { Col, Container } from "@/com/ui/comps";
import { Sidebar } from "@/view/comps/bar/side";
import { NotificationBar } from "@/view/comps/bar/notification";
import { CustomersList } from "@/view/pages/customers/CustomersList";

export default function CustomersPage() {
  return (
    <Container>
      <Sidebar />
      <Col flex={1}>
        <NotificationBar />
        <CustomersList />
      </Col>
    </Container>
  );
}
