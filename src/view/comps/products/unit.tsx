import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { Col, Deco, Row, Text } from "@/com/ui";

export function ProductUnit() {
  return (
    <Deco>
      <Row justify={"space-between"} align={"center"} paddingY={1} paddingX={2}>
        <Text variant={"body2"} sx={{ fontWeight: "bold" }}>
          Pizza de Calabresa
        </Text>

        <Text variant={"body2"}>Grande</Text>
        <Text variant={"body2"}>8 Fatias</Text>

        <Row align={"center"} gap={1}>
          <Text>R$</Text>
          <Text sx={{ color: "success.main" }}>59,90</Text>
        </Row>

        <Row align={"center"} gap={1}>
          <Text color={"warning"}>100</Text>
          <Text variant={"body2"}>Unidades</Text>
        </Row>

        <Col justify={"center"}>
          <IconButton>
            <Delete />
          </IconButton>
        </Col>
      </Row>
    </Deco>
  );
}
