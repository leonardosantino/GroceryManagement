import SignIn from "@/view/pages/signin/signin";
import { Row } from "@/com/ui/comps";

export default function LoginPage() {
  return (
    <Row height={"inherit"} wrap={"nowrap"}>
      <SignIn />
    </Row>
  );
}
