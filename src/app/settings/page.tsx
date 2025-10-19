import { Col, Row } from "@/com/ui";
import { Sidebar } from "@/view/comps/bar/side";
import { NotificationBar } from "@/view/comps/bar/notification";
import { Settings } from "@/view/pages/settings";

export default function SettingsPage() {
  return (
    <Row height={"inherit"} wrap={"nowrap"}>
      <Sidebar />
      <Col flex={1}>
        <NotificationBar />
        <Settings />
      </Col>
    </Row>
  );
}
