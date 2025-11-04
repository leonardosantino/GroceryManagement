"use client";

import React, { useState } from "react";

import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Text,
  Input,
  FilterListIcon,
  Col,
  Row,
  BoxSize,
  Button,
} from "@/com/ui/comps";

import { ColorTheme, TextTheme } from "@/com/ui/schema/scheme";
import { FilterInput } from "@/view/comps/FilterInput";
import { isNullOrEmpty } from "@/com/validation";
import { useQuery } from "@tanstack/react-query";
import { Api } from "@/clients/Api";
import { Order } from "@/model/entity/Order";

const orders = [
  {
    id: "6",
    customer: "John Doe",
    email: "john@example.com",
    total: "R$ 109,90",
    status: "Pendente",
    paymentStatus: "paid",
    date: "2024-01-15",
    items: 3,
  },

  {
    id: "1",
    customer: "John Doe",
    email: "john@example.com",
    total: "R$ 109,90",
    status: "Confirmado",
    paymentStatus: "paid",
    date: "2024-01-15",
    items: 3,
  },
  {
    id: "2",
    customer: "Jane Smith",
    email: "jane@example.com",
    total: "R$ 109,90",
    status: "Em andamento",
    paymentStatus: "paid",
    date: "2024-01-15",
    items: 2,
  },
  {
    id: "3",
    customer: "Bob Johnson",
    email: "bob@example.com",
    total: "R$ 109,90",
    status: "Em entrega",
    paymentStatus: "paid",
    date: "2024-01-14",
    items: 1,
  },
  {
    id: "4",
    customer: "Alice Brown",
    email: "alice@example.com",
    total: "R$ 109,90",
    status: "Completo",
    paymentStatus: "pending",
    date: "2024-01-14",
    items: 4,
  },
  {
    id: "5",
    customer: "Charlie Wilson",
    email: "charlie@example.com",
    total: "R$ 109,90",
    status: "Cancelado",
    paymentStatus: "refunded",
    date: "2024-01-13",
    items: 2,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completo":
      return "success";
    case "Em andamento":
      return "info";
    case "Em entrega":
      return "primary";
    case "Pendente":
      return "warning";
    case "Cancelado":
      return "error";
    default:
      return "default";
  }
};

export function Orders() {
  const [status, setStatus] = useState<string>("");

  const [page, setPage] = useState({
    key: "productsList",
    last: "",
    orders: [] as Order[],
  });

  const { data } = useQuery({
    queryKey: [page.key, page.last, status],
    queryFn: () =>
      Api.orders.pageable({
        status: status,
        last: page.last,
        limit: "10",
      }),
  });

  function hasMoreItems() {
    if (isNullOrEmpty(data?.last)) return true;

    return (data?.items.length as number) < 10;
  }

  return (
    <Col flex={1} padding={2} gap={2} testId={"orders-page"}>
      {/*Filter*/}
      <Row justify={"space-between"}>
        <Input placeholder="Pesquisar..." sx={{ flexGrow: 0.25 }} />

        <Row align={"center"}>
          <FilterInput label={"Status"} values={status} setValues={setStatus} />
          <BoxSize width={4} />
          <FilterListIcon fontSize={"large"} color={"info"} />
        </Row>
      </Row>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: ColorTheme.container,
                  fontWeight: TextTheme.bold,
                }}
              >
                Pedido
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: ColorTheme.container,
                  fontWeight: TextTheme.bold,
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: ColorTheme.container,
                  fontWeight: TextTheme.bold,
                }}
              >
                Items
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: ColorTheme.container,
                  fontWeight: TextTheme.bold,
                }}
              >
                Total
              </TableCell>

              <TableCell
                sx={{
                  backgroundColor: ColorTheme.container,
                  fontWeight: TextTheme.bold,
                }}
              >
                Endereço
              </TableCell>

              <TableCell
                sx={{
                  backgroundColor: ColorTheme.container,
                  fontWeight: TextTheme.bold,
                }}
              >
                Data
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>
                  <Text>{order.id}</Text>
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Col>
                    <Text>Pizza Calabresa</Text>
                    <Text>Refrigerante</Text>
                  </Col>
                </TableCell>
                <TableCell>
                  <Text>{order.total}</Text>
                </TableCell>

                <TableCell>
                  <Col>
                    <Text>Rua Lucerna, 156</Text>
                    <Text>Dep. Jose Antonio Liberato</Text>
                  </Col>
                </TableCell>

                <TableCell>
                  <Text>{new Date().toISOString()}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/*Pagination*/}

      <Row justify={"center"}>
        <Button
          disabled={hasMoreItems()}
          variant="outlined"
          color="primary"
          sx={{ width: 120 }}
          onClick={() => {
            setPage((prev) => ({
              key: page.key,
              last: data?.last ?? "",
              orders: prev.orders.concat(data?.items ?? []),
            }));
          }}
        >
          Mais
        </Button>
      </Row>
    </Col>
  );
}
