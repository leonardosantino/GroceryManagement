"use client";

import { useQuery } from "@tanstack/react-query";

import {
  Avatar,
  Box,
  Button,
  Col,
  ContentCopy,
  Edit,
  FilterList,
  IconButton,
  Input,
  MoreVert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@/com/ui";

import { Product } from "@/model/entity/Product";
import { ColorTheme, TextTheme } from "@/com/ui/style/scheme";
import { currencyFromDouble } from "@/com/format";
import React, { useState } from "react";
import { isNullOrEmpty } from "@/com/validation";
import { Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { Api } from "@/clients/Api";

export function ProductsList() {
  const router = useRouter();

  const [page, setPage] = useState({
    key: "products-y4i8",
    last: "",
    products: [] as Product[],
  });

  const { data } = useQuery({
    queryKey: [page.key, page.last],
    queryFn: async () =>
      await Api.products
        .pageable({ last: page.last, limit: "10" })
        .then((data) => data),
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

  function hasMoreItems() {
    if (isNullOrEmpty(data?.last)) return true;

    return (data?.items.length as number) < 10;
  }

  return (
    <Col flex={1} padding={2} gap={2} testId={"products-list-page"}>
      {/*Filter*/}
      <Box gap={2} justify={"center"} height={37}>
        <Input placeholder="Pesquisar produtos..." sx={{ flexGrow: 0.25 }} />
        <Button variant="outlined" startIcon={<FilterList />}>
          Filtro
        </Button>
      </Box>
      <TableContainer
        sx={{
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: 0,
          backgroundColor: "transparent",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: ColorTheme.container,
                }}
              />
              <TableCell
                sx={{
                  backgroundColor: ColorTheme.container,
                  fontWeight: TextTheme.bold,
                }}
              >
                Nome
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: ColorTheme.container,
                  fontWeight: TextTheme.bold,
                }}
              >
                Descrição
              </TableCell>
              <TableCell
                colSpan={2}
                align={"center"}
                sx={{
                  backgroundColor: ColorTheme.container,
                  fontWeight: TextTheme.bold,
                }}
              >
                Unidade
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: ColorTheme.container,
                  fontWeight: TextTheme.bold,
                }}
              >
                Preço
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: ColorTheme.container,
                  fontWeight: TextTheme.bold,
                }}
              >
                Quantidade
              </TableCell>
              <TableCell sx={{ backgroundColor: ColorTheme.container }} />
            </TableRow>
          </TableHead>

          <TableBody>
            {getProducts().map((product: Product) => (
              <TableRow key={product.id} hover sx={{ cursor: "pointer" }}>
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
                      onClick={() =>
                        router.push(
                          "/products/edit?id=".concat(product.id as string),
                        )
                      }
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
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/*Pagination*/}
      <Box justify={"center"}>
        <Button
          disabled={hasMoreItems()}
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
