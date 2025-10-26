import { Col, Row } from "@/com/ui/comps";
import { Sidebar } from "@/view/comps/bar/side";
import { NotificationBar } from "@/view/comps/bar/notification";

import { Orders } from "@/view/pages/orders";

export default function OrdersPage() {
  return (
    <Row height={"inherit"} wrap={"nowrap"}>
      <Sidebar />
      <Col flex={1}>
        <NotificationBar />
        <Orders />
      </Col>
    </Row>
  );
}
