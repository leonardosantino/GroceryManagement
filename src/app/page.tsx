import { Col, Row } from "@/com/ui";
import { Sidebar } from "@/view/comps/bar/side";
import { NotificationBar } from "@/view/comps/bar/notification";
import { Analytics } from "@/view/pages/analytics";

export default function AnalyticsPage() {
  return (
    <Row height={"inherit"} wrap={"nowrap"}>
      <Sidebar />
      <Col flex={1}>
        <NotificationBar />
        <Analytics />
      </Col>
    </Row>
  );
}
