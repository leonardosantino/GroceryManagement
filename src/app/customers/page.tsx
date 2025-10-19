import { Col, Row } from "@/com/ui";
import { Sidebar } from "@/view/comps/bar/side";
import { NotificationBar } from "@/view/comps/bar/notification";
import { Customers } from "@/view/pages/customers";

export default function CustomersPage() {
  return (
    <Row height={"inherit"} wrap={"nowrap"}>
      <Sidebar />
      <Col flex={1}>
        <NotificationBar />
        <Customers />
      </Col>
    </Row>
  );
}
