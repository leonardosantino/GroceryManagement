"use client";

import { Col } from "@/common/ui/comps/col";
import { Row } from "@/common/ui/comps/row";
import { Sidebar } from "@/view/comps/bar/side";
import { UpBar } from "@/view/comps/bar/up";
import { Entry } from "@/view/pages/entry";

export default function App() {
  return (
    <Row sx={{ height: "inherit" }}>
      <Sidebar />
      <Col sx={{ flexGrow: 1 }}>
        <UpBar />
        <Entry />
      </Col>
    </Row>
  );
}
