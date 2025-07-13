import { Divider } from "@mui/material";

import { Box, Col, Paper, Row, Text } from "@/com/ui/comps";
import { Scheme } from "@/com/ui/style/scheme";

export function BestSellers() {
  return (
    <Paper sx={{ flexGrow: 1 }}>
      <Col sx={{ padding: 1 }}>
        <Row sx={{ gap: 1 }}>
          <Box
            sx={{
              backgroundColor: Scheme.color.info,
              borderRadius: 1,
              width: 20,
              height: 30,
            }}
          />
          <Text variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Mais Vendidos
          </Text>
        </Row>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {data.map((product, index) => (
            <Box key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Text variant="body2" sx={{ fontWeight: 500 }}>
                  {product.name}
                </Text>
                <Text variant="body2">{product.sales.toString()}</Text>
              </Box>
              <Divider />
            </Box>
          ))}
        </Box>
      </Col>
    </Paper>
  );
}

const data = [
  { name: "Wireless Headphones", sales: 245, revenue: "$12,250", progress: 85 },
  { name: "Smart Watch", sales: 189, revenue: "$9,450", progress: 70 },
  { name: "Laptop Stand", sales: 156, revenue: "$4,680", progress: 60 },
  { name: "USB-C Cable", sales: 134, revenue: "$2,010", progress: 45 },
  { name: "Phone Case", sales: 98, revenue: "$1,470", progress: 35 },
];
