import { Col, Row } from "@/com/ui";
import { NotificationBar } from "@/view/comps/bar/notification";
import { Sidebar } from "@/view/comps/bar/side";
import { Main } from "@/view/entry/main";

export function Entry() {
  return (
    <Row height={"inherit"} wrap={"nowrap"}>
      <Sidebar />
      <Col flex={1}>
        <NotificationBar />
        <Main />
      </Col>
    </Row>
  );
}
