import { Deco, Row, ScrollCol } from "@/com/ui";

export function Empty() {
  return (
    <ScrollCol gap={2} wrap={"wrap"}>
      <Row height={600}>
        <Deco height={200} width={200} boxColor={"error"} />
      </Row>
    </ScrollCol>
  );
}
