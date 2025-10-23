"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import {
  Avatar,
  Box,
  Button,
  Col,
  FilterList,
  Input,
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
import { isNullOrEmpty } from "@/com/validation";

import { Api } from "@/clients/Api";

export function ProductsList() {
  const router = useRouter();

  const [page, setPage] = useState({
    key: "productsList",
    last: "",
    products: [] as Product[],
  });

  const { data } = useQuery({
    queryKey: [page.key, page.last],
    queryFn: () => Api.products.pageable({ last: page.last, limit: "10" }),
  });

  function getProducts() {
    return page.products.concat(data?.items ?? []);
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
            </TableRow>
          </TableHead>

          <TableBody>
            {getProducts().map((product: Product) => (
              <TableRow
                key={product.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  router.push("/products/edit?id=".concat(product.id as string))
                }
              >
                <TableCell sx={{ padding: 1 }}>
                  <Avatar src={product.images[0]} variant="rounded" />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.unity.name}</TableCell>
                <TableCell>{product.unity.description}</TableCell>
                <TableCell>{currencyFromDouble(product.unity.price)}</TableCell>
                <TableCell align={"center"}>{product.unity.quantity}</TableCell>
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
