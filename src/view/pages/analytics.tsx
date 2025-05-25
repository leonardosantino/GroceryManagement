import {
  AttachMoney,
  Inventory,
  People,
  ShoppingCart,
  SvgIconComponent,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Col } from "@/common/ui/comps/col";
import { Row } from "@/common/ui/comps/row";

const recentOrders = [
  {
    id: "#12345",
    customer: "John Doe",
    amount: "$299.99",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "#12346",
    customer: "Jane Smith",
    amount: "$149.50",
    status: "processing",
    date: "2024-01-15",
  },
  {
    id: "#12347",
    customer: "Bob Johnson",
    amount: "$89.99",
    status: "shipped",
    date: "2024-01-14",
  },
  {
    id: "#12348",
    customer: "Alice Brown",
    amount: "$199.99",
    status: "pending",
    date: "2024-01-14",
  },
  {
    id: "#12349",
    customer: "Charlie Wilson",
    amount: "$349.99",
    status: "completed",
    date: "2024-01-13",
  },
];

const topProducts = [
  { name: "Wireless Headphones", sales: 245, revenue: "$12,250", progress: 85 },
  { name: "Smart Watch", sales: 189, revenue: "$9,450", progress: 70 },
  { name: "Laptop Stand", sales: 156, revenue: "$4,680", progress: 60 },
  { name: "USB-C Cable", sales: 134, revenue: "$2,010", progress: 45 },
  { name: "Phone Case", sales: 98, revenue: "$1,470", progress: 35 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "success";
    case "processing":
      return "warning";
    case "shipped":
      return "info";
    case "pending":
      return "default";
    default:
      return "default";
  }
};

export default function Analytics() {
  return (
    <Col
      sx={{
        padding: 2,
        gap: 2,
      }}
    >
      <Row
        sx={{
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Metric
          title="Total Revenue"
          value="$45,231"
          change={12.5}
          Icon={AttachMoney}
          color="primary.main"
        />

        <Metric
          title="Orders"
          value="1,234"
          change={8.2}
          Icon={ShoppingCart}
          color="success.main"
        />

        <Metric
          title="Customers"
          value="892"
          change={-2.1}
          Icon={People}
          color="info.main"
        />

        <Metric
          title="Products"
          value="456"
          change={5.7}
          Icon={Inventory}
          color="warning.main"
        />
      </Row>

      <Row
        sx={{
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Col sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Recent Orders
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell sx={{ fontWeight: 500 }}>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {order.amount}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                      />
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Col>

        <Col sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Top Products
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {topProducts.map((product, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.revenue}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={product.progress}
                    sx={{ flexGrow: 1, height: 6, borderRadius: 3 }}
                  />
                  <Typography variant="caption" color="textSecondary">
                    {product.sales}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Col>
      </Row>
    </Col>
  );
}

type MetricProps = {
  title: string;
  value: string;
  change: number;
  Icon: SvgIconComponent;
  color: string;
};

function Metric({ title, value, change, Icon, color }: MetricProps) {
  return (
    <Card>
      <Row
        sx={{
          alignItems: "center",
          gap: 2,
          padding: 2,
          minWidth: 250,
        }}
      >
        <Col>
          <Typography color="textSecondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
            {value}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            {change > 0 ? (
              <TrendingUp sx={{ color: "success.main", fontSize: 16 }} />
            ) : (
              <TrendingDown sx={{ color: "error.main", fontSize: 16 }} />
            )}
            <Typography
              variant="body2"
              sx={{
                color: change > 0 ? "success.main" : "error.main",
                ml: 0.5,
              }}
            >
              {Math.abs(change)}%
            </Typography>
          </Box>
        </Col>
        <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
          <Icon />
        </Avatar>
      </Row>
    </Card>
  );
}
