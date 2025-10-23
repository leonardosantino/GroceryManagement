import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Paper, Text } from "@/com/ui";

export function AnalyticsOrders() {
  return (
    <Paper direction={"column"} padding={1}>
      <Text weight={"bold"}>Pedidos</Text>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Recebidos</TableCell>
              <TableCell>Entregues</TableCell>
              <TableCell>Em Andamento</TableCell>
              <TableCell>Cancelados</TableCell>
              <TableCell>Aguardando</TableCell>
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
