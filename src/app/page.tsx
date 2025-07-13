"use client";

import { Row } from "@/com/ui/comps";
import { Sidebar } from "@/view/comps/bar/side";
import { UpBar } from "@/view/comps/bar/up";
import { Main } from "@/view/comps/main";

export default function App() {
  return (
    <Row sx={{ height: "inherit" }}>
      <Sidebar />
      <Main />
      <UpBar />
    </Row>
  );
}
