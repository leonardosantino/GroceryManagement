import { Col, Row } from "@/com/ui";
import { Sidebar } from "@/view/comps/bar/side";
import { NotificationBar } from "@/view/comps/bar/notification";

import { ProductsAdd } from "@/view/pages/products/add";

export default function ProductsAddPage() {
  return (
    <Row height={"inherit"} wrap={"nowrap"}>
      <Sidebar />
      <Col flex={1}>
        <NotificationBar />
        <ProductsAdd />
      </Col>
    </Row>
  );
}
