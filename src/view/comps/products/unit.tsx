import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { Box, Col, Row, Text } from "@/com/ui/comps";

export function ProductUnit() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Row
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          paddingX: 1,
          paddingY: 2,
        }}
      >
        <Text variant={"body2"} sx={{ fontWeight: "bold" }}>
          Pizza de Calabresa
        </Text>

        <Text variant={"body2"}>Grande</Text>
        <Text variant={"body2"}>8 Fatias</Text>

        <Row
          sx={{
            alignItems: "center",
            gap: 1,
          }}
        >
          <Text>R$</Text>
          <Text sx={{ color: "success.main" }}>59,90</Text>
        </Row>

        <Row
          sx={{
            alignItems: "center",
            gap: 1,
          }}
        >
          <Text color={"warning"}>100</Text>
          <Text variant={"body2"}>Unidades</Text>
        </Row>

        <Col sx={{ justifyContent: "center" }}>
          <IconButton>
            <Delete />
          </IconButton>
        </Col>
      </Row>
    </Box>
  );
}
