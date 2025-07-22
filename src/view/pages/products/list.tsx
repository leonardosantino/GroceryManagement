"use client";

import { useQuery } from "@tanstack/react-query";

import { MarketApi } from "@/api/market";
import {
  Avatar,
  Box,
  Button,
  Col,
  FilterList,
  IconButton,
  Input,
  MoreVert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@/com/ui";
import { Product } from "@/model/product";
import { color, fontWeight } from "@/com/ui/style/scheme";
import { currencyFromDouble } from "@/com/format";
import { useState } from "react";

const api = new MarketApi();

export function ProductsList() {
  const [page, setPage] = useState({
    key: "products-y4i8",
    last: "",
    products: [] as Product[],
  });

  const { data } = useQuery({
    queryKey: [page.key, page.last],
    queryFn: async () =>
      await api.productFindAll({ last: page.last }).then((data) => data),
  });

  function getProducts() {
    return page.products.concat(data?.items ?? []);
  }

  function hasNext() {
    return data?.last != "";
  }

  return (
    <Col sx={{ flexGrow: 1, padding: 2, gap: 2 }}>
      {/*Filter*/}
      <Box sx={{ gap: 2, justifyContent: "center" }}>
        <Input placeholder="Pesquisar produtos..." sx={{ flexGrow: 0.25 }} />
        <Button variant="outlined" startIcon={<FilterList />}>
          Filtro
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: color.surface,
                }}
              />
              <TableCell
                sx={{
                  backgroundColor: color.surface,
                  fontWeight: fontWeight.bold,
                }}
              >
                Nome
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: color.surface,
                  fontWeight: fontWeight.bold,
                }}
              >
                Descrição
              </TableCell>
              <TableCell
                colSpan={2}
                align={"center"}
                sx={{
                  backgroundColor: color.surface,
                  fontWeight: fontWeight.bold,
                }}
              >
                Unidade
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: color.surface,
                  fontWeight: fontWeight.bold,
                }}
              >
                Preço
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: color.surface,
                  fontWeight: fontWeight.bold,
                }}
              >
                Quantidade
              </TableCell>
              <TableCell sx={{ backgroundColor: color.surface }} />
            </TableRow>
          </TableHead>

          <TableBody>
            {getProducts().map((product: Product) => (
              <TableRow key={product.id} hover>
                <TableCell sx={{ padding: 1 }}>
                  <Avatar src={product.images[0]} variant="rounded" />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.unity.name}</TableCell>
                <TableCell>{product.unity.description}</TableCell>
                <TableCell>{currencyFromDouble(product.unity.price)}</TableCell>
                <TableCell align={"center"}>{product.unity.quantity}</TableCell>
                <TableCell align="right" sx={{ padding: 1 }}>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/*Pagination*/}
      <Box sx={{ justifyContent: "center" }}>
        <Button
          disabled={!hasNext()}
          variant="outlined"
          color="primary"
          sx={{ width: 120 }}
          onClick={() => {
            setPage((prev) => ({
              key: page.key,
              last: data?.last ?? "",
              products: prev.products.concat(data?.items ?? []),
            }));
          }}
        >
          Mais
        </Button>
      </Box>
    </Col>
  );
}
