import { Col, Container } from "@/com/ui/comps";
import { Sidebar } from "@/view/comps/bar/side";
import { NotificationBar } from "@/view/comps/bar/notification";

import { Analytics } from "@/view/pages/Analytics";

export default function AnalyticsPage() {
  return (
    <Container>
      <Sidebar />
      <Col flex={1}>
        <NotificationBar />
        <Analytics />
      </Col>
    </Container>
  );
}
