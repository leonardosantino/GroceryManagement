import { Col, Row } from "@/com/ui";
import { Sidebar } from "@/view/comps/bar/side";
import { NotificationBar } from "@/view/comps/bar/notification";
import { ProductsList } from "@/view/pages/products/list";

export default function ProductsListPage() {
  return (
    <Row height={"inherit"} wrap={"nowrap"}>
      <Sidebar />
      <Col flex={1}>
        <NotificationBar />
        <ProductsList />
      </Col>
    </Row>
  );
}
