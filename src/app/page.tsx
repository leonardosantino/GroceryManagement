import { Container } from "@/com/ui/comps";
import { Sidebar } from "@/view/comps/bar/side";

import { Analytics } from "@/view/pages/Analytics";

export default function AnalyticsPage() {
  return (
    <Container>
      <Sidebar />
      <Analytics />
    </Container>
  );
}
