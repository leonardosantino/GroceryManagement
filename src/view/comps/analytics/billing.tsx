import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Box, Col, Paper, Row } from "@/com/ui";
import { Sx } from "@/com/ui/style/scheme";

export function Billing() {
  return (
    <Paper>
      <Col sx={{ padding: 1 }}>
        <Row sx={{ gap: 1 }}>
          <Box
            sx={{
              backgroundColor: Sx.color.successVar,
              borderRadius: 1,
              width: 20,
              height: 30,
            }}
          />
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Faturamento
          </Typography>
        </Row>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pedidos</TableCell>
                <TableCell>Recebido</TableCell>
                <TableCell>Frete</TableCell>
                <TableCell>Taxas</TableCell>
                <TableCell>Devoluções</TableCell>
                <TableCell>Líquido</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((order) => (
                <TableRow key={order.id} sx={{ "& td": { border: "none" } }}>
                  <TableCell sx={{ fontWeight: 500 }}>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{order.amount}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{order.amount}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{order.amount}</TableCell>
                  <TableCell>{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Col>
    </Paper>
  );
}

const data = [
  {
    id: "1.234",
    customer: "10.050,90",
    amount: "300,00",
    status: "completed",
    date: "596,90",
  },
];
