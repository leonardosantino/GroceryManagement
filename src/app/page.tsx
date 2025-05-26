"use client";

import { useState } from "react";

import { Col } from "@/common/ui/comps/col";
import { Row } from "@/common/ui/comps/row";
import { Sidebar } from "@/view/comps/bar/side";
import { UpBar } from "@/view/comps/bar/up";
import { Entry } from "@/view/pages/entry";

export default function App() {
  const [view, setView] = useState("");

  return (
    <Row sx={{ height: "inherit" }}>
      <Sidebar activeView={view} setActiveView={setView} />
      <Col sx={{ flexGrow: 1 }}>
        <UpBar />
        <Entry path={view} />
      </Col>
    </Row>
  );
}
