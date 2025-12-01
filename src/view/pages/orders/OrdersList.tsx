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
  Conditional,
} from "@/com/ui/comps";

import { ColorTheme, TextTheme } from "@/com/ui/theme/scheme";
import { InputFilter } from "@/view/comps/InputFilter";
import {
  isEmptyList,
  isNullOrEmpty,
  isNullOrEmptyList,
} from "@/com/validation";
import { useQuery } from "@tanstack/react-query";
import { Api } from "@/clients/Api";
import { Order } from "@/model/entity/Order";
import { useRouter } from "next/navigation";
import { toMonthDayHourMinute } from "@/com/format/date";
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
  const [status, setStatus] = useState<string[]>([]);
  const [last, setLast] = useState<string>("");

  const [orders, setOrders] = useState<Order[]>([]);

  const { data } = useQuery({
    queryKey: ["orders", last],
    queryFn: () =>
      Api.orders
        .pageable({
          last: last,
          limit: "10",
        })
        .then((it) => setMore(it)),
  });

  function setMore(data: { items: Order[]; last?: string }) {
    const more = orders.concat(data.items);

    setOrders(more);

    return data;
  }
  function getOrders() {
    const ordersByStatus = filterOrdersByStatus(orders);

    return ordersByStatus;
  }

  function filterOrdersByStatus(it: Order[]) {
    if (isEmptyList(status)) return it;
    return orders.filter((it) => status.includes(it.status.description));
  }

  function orderByCreatedAtDesc(it: Order[]) {
    return it.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
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

      <BoxSize height={8} />

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
          onClick={() => setLast(data?.last ?? "")}
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
      key={"order".concat(order.id)}
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
          {order.items
            .map((item) => (
              <Text
                key={"order-item".concat(order.id, item.id)}
                color={"secondary"}
                size={"xSmall"}
              >
                {item.unity.quantity} {item.name}
              </Text>
            ))
            .slice(0, 3)}
          <Conditional bool={order.items.length > 3}>
            <Row>
              <BoxSize width={2} />
              <Text color={"secondary"} size={"xSmall"}>
                Mais
              </Text>
            </Row>
          </Conditional>
        </Col>
      </TableCell>
      <TableCell>{currencyFromDouble(order.payment.amount)}</TableCell>

      <TableCell>
        <Col>
          <Text>
            {order.address.street}, {order.address.number}
          </Text>
          <Text>{order.address.district}</Text>
        </Col>
      </TableCell>

      <TableCell>{toMonthDayHourMinute(order.createdAt)}</TableCell>
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
