import { Col, Container } from "@/com/ui/comps";
import { Sidebar } from "@/view/comps/bar/side";
import { NotificationBar } from "@/view/comps/bar/notification";
import { Customers } from "@/view/pages/Customers";

export default function CustomersPage() {
  return (
    <Container>
      <Sidebar />
      <Col flex={1}>
        <NotificationBar />
        <Customers />
      </Col>
    </Container>
  );
}
