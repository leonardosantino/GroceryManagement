"use client";

import { Add, FilterList, MoreVert } from "@mui/icons-material";
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
import { useEffect, useState } from "react";

import { MarketApi } from "@/api/market";
import { currencyFromDouble } from "@/com/ui/comps/input/currency";
import { Product } from "@/model/product";

const api = new MarketApi();

export function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.productFindAll().then((data) => {
      setProducts(data.items);
    });
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Add />} />

        <TextField
          placeholder="Search products..."
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <Button variant="outlined" startIcon={<FilterList />} />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell colSpan={2}>Unidade</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell colSpan={2}>Quantidade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      src={[...product.images][0]}
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
                    {product.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {product.unit.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {product.unit.description}
                  </Typography>
                </TableCell>
                <TableCell>{currencyFromDouble(product.unit.price)}</TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {product.unit.quantity}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small">
                    <MoreVert />
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
