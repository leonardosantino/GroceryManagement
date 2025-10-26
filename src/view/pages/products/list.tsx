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
  Row,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Text,
} from "@/com/ui/comps";

import { Product } from "@/model/entity/Product";
import { ColorTheme, TextTheme } from "@/com/ui/schema/scheme";

import { currencyFromDouble } from "@/com/format/currency";
import { isNullOrEmpty } from "@/com/validation";

import { Api } from "@/clients/Api";
import { CategoryFilter } from "@/view/comps/CategoryFilter";

export function ProductsList() {
  const router = useRouter();

  const [page, setPage] = useState({
    key: "productsList",
    last: "",
    products: [] as Product[],
  });

  const [name, setName] = useState("");
  const [categories, setCategories] = useState<string>("");

  const { data } = useQuery({
    queryKey: [page.key, page.last, name, categories],
    queryFn: () =>
      Api.products.pageable({
        name: name,
        categories: categories,
        last: page.last,
        limit: "10",
      }),
  });

  function getProducts() {
    return page.products.concat(data?.items ?? []);
  }

  function hasMoreItems() {
    if (isNullOrEmpty(data?.last)) return true;

    return (data?.items.length as number) < 10;
  }

  function getName(it: string) {
    if (it.length < 1) setName("");
    if (it.length % 3 !== 0) return;

    setName(it);
  }

  return (
    <Col flex={1} padding={2} gap={2} testId={"products-list-page"}>
      {/*Filter*/}
      <Row gap={2} justify={"space-between"} height={37}>
        <Input
          placeholder="Pesquisar..."
          sx={{ flexGrow: 0.25 }}
          onChange={(it) => getName(it.target.value)}
        />
        <Row gap={1} align={"center"}>
          <FilterList color={"info"} />
          <Text color={"info"}>Filtros</Text>
          <CategoryFilter categories={categories} onChange={setCategories} />
        </Row>
      </Row>
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
