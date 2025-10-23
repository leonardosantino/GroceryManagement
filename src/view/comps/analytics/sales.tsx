import { Divider } from "@mui/material";

import { Col, Paper, Row, Text } from "@/com/ui";

export function BestSellers() {
  return (
    <Paper padding={1} gap={2} direction={"column"}>
      <Text weight={"bold"}>Mais Vendidos</Text>

      {data.map((product) => (
        <Col key={`best-seller-${product.id}`}>
          <Row justify={"space-between"} align="center" gap={4}>
            <Text>{product.name}</Text>
            <Text>{product.sales.toString()}</Text>
          </Row>
          <Divider />
        </Col>
      ))}
    </Paper>
  );
}

const data = [
  { id: 1, name: "Smart Watch", sales: 189, revenue: "$9,450", progress: 70 },
  { id: 2, name: "Laptop Stand", sales: 156, revenue: "$4,680", progress: 60 },
  { id: 3, name: "USB-C Cable", sales: 134, revenue: "$2,010", progress: 45 },
  { id: 4, name: "Phone Case", sales: 98, revenue: "$1,470", progress: 35 },
  {
    id: 5,
    name: "Wireless Headphones",
    sales: 245,
    revenue: "$12,250",
    progress: 85,
  },
];
