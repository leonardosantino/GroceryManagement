import { Col, Container } from "@/com/ui/comps";
import { Sidebar } from "@/view/comps/bar/side";
import { NotificationBar } from "@/view/comps/bar/notification";

import { Inventory } from "@/view/pages/inventory";

export default function InventoryPage() {
  return (
    <Container>
      <Sidebar />
      <Col flex={1}>
        <NotificationBar />
        <Inventory />
      </Col>
    </Container>
  );
}
