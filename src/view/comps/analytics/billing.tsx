import {
  TableContainer,
  Text,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/com/ui/comps";

export function Billing() {
  return (
    <Paper direction={"column"} padding={1} flex={1}>
      <Text weight={"bold"}>Faturamento</Text>

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
