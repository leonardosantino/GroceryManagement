import { Col, Container } from "@/com/ui/comps";
import { Sidebar } from "@/view/comps/bar/side";
import { NotificationBar } from "@/view/comps/bar/notification";

import { Settings } from "@/view/pages/Settings";

export default function SettingsPage() {
  return (
    <Container>
      <Sidebar />
      <Col flex={1}>
        <NotificationBar />
        <Settings />
      </Col>
    </Container>
  );
}
