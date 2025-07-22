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
import React, { useState } from "react";
import { isNullOrEmpty } from "@/com/validation";
import { Menu, MenuItem } from "@mui/material";

import { ContentCopy, Delete, Edit } from "@mui/icons-material";

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Col sx={{ flexGrow: 1, padding: 2, gap: 2 }}>
      {/*Filter*/}
      <Box sx={{ gap: 2, justifyContent: "center", height: 37 }}>
        <Input placeholder="Pesquisar produtos..." sx={{ flexGrow: 0.25 }} />
        <Button variant="outlined" startIcon={<FilterList />}>
          Filtro
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ flexGrow: 1, backgroundColor: "transparent" }}
      >
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
                  <IconButton
                    id={"button".concat(product.id as string)}
                    onClick={handleClick}
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    id={"menu".concat(product?.id ?? "")}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      paper: {
                        style: {
                          boxShadow: "0 0 1px lightgray",
                        },
                      },
                    }}
                  >
                    <MenuItem
                      key={"product-editar"}
                      sx={{
                        fontSize: 12,
                        gap: 1,
                        justifyContent: "space-between",
                        padding: 1,
                      }}
                    >
                      Editar <Edit color={"primary"} />
                    </MenuItem>
                    <MenuItem
                      key={"product-duplicate"}
                      sx={{
                        fontSize: 12,
                        gap: 1,
                        justifyContent: "space-between",
                        padding: 1,
                      }}
                    >
                      Duplicar <ContentCopy color={"action"} />
                    </MenuItem>
                    <MenuItem
                      key={"product-delete"}
                      sx={{
                        fontSize: 12,
                        gap: 1,
                        justifyContent: "space-between",
                        padding: 1,
                      }}
                    >
                      Excluir <Delete color={"error"} />
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/*Pagination*/}
      <Box sx={{ justifyContent: "center" }}>
        <Button
          disabled={isNullOrEmpty(data?.last)}
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
