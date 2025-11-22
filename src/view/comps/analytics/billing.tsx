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
            <TableRow key={"order-1"} sx={{ "& td": { border: "none" } }}>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
