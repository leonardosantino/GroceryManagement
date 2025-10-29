import { Col, Deco, Row, Text, DeleteIcon, IconButton } from "@/com/ui/comps";

export function ProductUnit() {
  return (
    <Deco>
      <Row justify={"space-between"} align={"center"}>
        <Text>Pizza de Calabresa</Text>

        <Text>Grande</Text>
        <Text>8 Fatias</Text>

        <Row align={"center"} gap={1}>
          <Text>R$</Text>
          <Text>59,90</Text>
        </Row>

        <Row align={"center"} gap={1}>
          <Text color={"warning"}>100</Text>
          <Text>Unidades</Text>
        </Row>

        <Col justify={"center"}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Col>
      </Row>
    </Deco>
  );
}
