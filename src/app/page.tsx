"use client";

import { Main } from "@/common/ui/comps/main";
import { Row } from "@/common/ui/comps/row";
import { Sidebar } from "@/view/comps/bar/side";
import { UpBar } from "@/view/comps/bar/up";
import { Entry } from "@/view/pages/entry";

export default function App() {
  return (
    <Row sx={{ height: "inherit" }}>
      <Sidebar />
      <Main>
        <Entry />
      </Main>
      <UpBar />
    </Row>
  );
}
