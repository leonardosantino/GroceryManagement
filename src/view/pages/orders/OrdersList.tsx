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

import { ColorTheme, TextTheme } from "@/com/ui/theme/scheme";
import { InputFilter } from "@/view/comps/InputFilter";
import { isNullOrEmpty, isNullOrEmptyList } from "@/com/validation";
import { useQuery } from "@tanstack/react-query";
import { Api } from "@/clients/Api";
import { Order } from "@/model/entity/Order";
import { useRouter } from "next/navigation";
import { toLocalDayMonthHour } from "@/com/format/date";
import { DataOrderStatus } from "@/com/consts/status";
import { currencyFromDouble } from "@/com/format/currency";

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "warning";
    case "ACCEPTED":
      return "info";
    case "PROCESSING":
      return "primary";
    case "DELIVERY":
      return "secondary";
    case "COMPLETED":
      return "success";
    case "CANCELED":
      return "error";

    default:
      return "default";
  }
};

export function OrdersList() {
  const [status, setStatus] = useState<string>("");

  const [page, setPage] = useState({
    key: "ordersList",
    last: "",
    orders: [] as Order[],
  });

  const { data } = useQuery({
    queryKey: ["ordersList"],
    queryFn: () =>
      Api.orders.pageable({
        limit: "10",
      }),
  });

  function getOrders() {
    return page.orders.concat(data?.items ?? []);
  }

  function hasMoreItems() {
    if (isNullOrEmpty(data?.last)) return true;

    return (data?.items.length as number) < 10;
  }

  return (
    <Col flex={1} padding={1} marginX={12} gap={1} testId={"orders-list-page"}>
      {/*Filter*/}
      <Row justify={"space-between"}>
        <Input placeholder="Pesquisar..." sx={{ flexGrow: 0.25 }} />

        <Row align={"center"}>
          <InputFilter
            label={"Status"}
            options={DataOrderStatus}
            values={status}
            setValues={setStatus}
          />
          <BoxSize width={4} />
          <FilterListIcon fontSize={"large"} color={"info"} />
        </Row>
      </Row>

      <TableContainer
        sx={{
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: 0,
        }}
      >
        <Table stickyHeader>
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
                Data de Criação
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <ListOrders orders={getOrders()} />
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

function ListOrders({ orders }: Readonly<{ orders: Order[] }>) {
  const router = useRouter();

  if (isNullOrEmptyList(orders)) return EmptyList();

  return orders.map((order: Order) => (
    <TableRow
      key={order.id}
      hover
      sx={{ cursor: "pointer" }}
      onClick={() => router.push("/orders/edit?id=".concat(order.id))}
    >
      <TableCell>{order.code}</TableCell>
      <TableCell>
        <Chip
          label={order.status.description}
          color={getStatusColor(order.status.name)}
          size="small"
        />
      </TableCell>
      <TableCell>
        <Col>
          <Text>Pizza Calabresa</Text>
          <Text>Refrigerante</Text>
        </Col>
      </TableCell>
      <TableCell>{currencyFromDouble(order.payment.amount)}</TableCell>

      <TableCell>
        <Col>
          <Text>Rua Lucerna, 156</Text>
          <Text>Dep. Jose Antonio Liberato</Text>
        </Col>
      </TableCell>

      <TableCell>{toLocalDayMonthHour(order.createdAt)}</TableCell>
    </TableRow>
  ));
}

function EmptyList() {
  return (
    <TableRow>
      <TableCell colSpan={6} align={"center"}>
        Nenhum item encontrado
      </TableCell>
    </TableRow>
  );
}
