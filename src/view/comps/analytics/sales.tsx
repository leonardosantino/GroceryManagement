import { Col, Paper, Row, Text, Divider } from "@/com/ui/comps";

export function BestSellers() {
  return (
    <Paper flex={1} direction={"column"} padding={1}>
      <Text weight={"bold"}>Mais Vendidos</Text>

      <Col padding={2}>
        <Col>
          <Row justify={"space-between"} align="center">
            <Text size={"small"}>Itens</Text>
            <Text>0</Text>
          </Row>
          <Divider marginY={1} />
        </Col>
      </Col>
    </Paper>
  );
}
