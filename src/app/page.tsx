"use client";

import { ReactNode } from "react";

import { Row } from "@/common/ui/comps/row";
import { Sidebar } from "@/view/comps/bar/side";
import { UpBar } from "@/view/comps/bar/up";
import { Entry } from "@/view/pages/entry";

export default function App() {
  return (
    <>
      <Sidebar />
      <Main>
        <Entry />
      </Main>

      <UpBar />
    </>
  );
}

export function Main({ children }: { children: ReactNode }) {
  return <Row sx={{ flexGrow: 1, justifyContent: "center" }}>{children}</Row>;
}
