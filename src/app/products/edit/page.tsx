import { Col, Row } from "@/com/ui";
import { Sidebar } from "@/view/comps/bar/side";
import { NotificationBar } from "@/view/comps/bar/notification";

import { ProductsEdit } from "@/view/pages/products/edit";

export default function ProductsEditPage() {
  return (
    <Row height={"inherit"} wrap={"nowrap"}>
      <Sidebar />
      <Col flex={1}>
        <NotificationBar />
        <ProductsEdit />
      </Col>
    </Row>
  );
}
