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

export function AnalyticsOrders() {
  return (
    <Paper direction={"column"} padding={1} flex={1}>
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
            <TableRow sx={{ "& td": { border: "none" } }}>
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
