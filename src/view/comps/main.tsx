import { Row } from "@/common/ui/comps";
import { Entry } from "@/view/pages/entry";

export function Main() {
  return (
    <Row sx={{ flexGrow: 1, justifyContent: "center" }}>
      <Entry />
    </Row>
  );
}
