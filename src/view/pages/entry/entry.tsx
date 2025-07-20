import { Row } from "@/com/ui";
import { NotificationBar } from "@/view/comps/bar/notification";
import { Sidebar } from "@/view/comps/bar/side";
import { Main } from "@/view/pages/entry/main";

export function Entry() {
  return (
    <Row sx={{ height: "inherit", flexWrap: "nowrap" }}>
      <Sidebar />
      <Main />
      <NotificationBar />
    </Row>
  );
}
