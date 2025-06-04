"use client";

import {
  Add as AddIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

const products = [
  {
    id: 1,
    name: "Pizza de Calabresa",
    sku: "Delicious Calabresa Pizza",
    price: "G",
    stock: "8 Fatias",
    status: "R$ 69,90",
    category: "37",
    image: "/placeholder.svg?height=40&width=40",
  },
];

export function ProductsList() {
  return (
    <>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<AddIcon />} />

        <TextField
          placeholder="Search products..."
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <Button variant="outlined" startIcon={<FilterIcon />} />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Unidade</TableCell>
              <TableCell>Descrição da Unidade</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      src={product.image}
                      variant="rounded"
                      sx={{ width: 40, height: 40 }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {product.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {product.sku}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {product.price}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{product.stock}</Typography>
                </TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {product.category}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
