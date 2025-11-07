import { Col, Container } from "@/com/ui/comps";
import { Sidebar } from "@/view/comps/bar/side";
import { NotificationBar } from "@/view/comps/bar/notification";

import { OrdersList } from "@/view/pages/orders/OrdersList";

export default function OrdersPage() {
  return (
    <Container>
      <Sidebar />
      <Col flex={1}>
        <NotificationBar />
        <OrdersList />
      </Col>
    </Container>
  );
}
