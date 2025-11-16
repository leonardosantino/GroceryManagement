"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import {
  Button,
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
} from "@/com/ui/comps";

import { InputFilter } from "@/view/comps/InputFilter";

import { Customer } from "@/model/entity/Customer";

import { isNullOrEmpty, isNullOrEmptyList } from "@/com/validation";
import {
  toLocalDayMonth,
  toLocalDayMonthHour,
  toLocalDayMonthYear,
} from "@/com/format/date";

import { DataOrderStatus } from "@/com/consts/status";
import { ColorTheme, TextTheme } from "@/com/ui/theme/scheme";

import { Api } from "@/clients/Api";

function getStatusColor(status: string) {
  console.log(status);
  switch (status) {
    case "ACTIVE":
      return "success";
    case "INACTIVE":
      return "warning";
    case "SUSPENDED":
      return "error";
    case "BLOCKED":
      return "error";

    default:
      return "default";
  }
}

export function CustomersList() {
  const [status, setStatus] = useState<string>("");

  const [page, setPage] = useState({
    key: "customersList",
    last: "",
    customers: [] as Customer[],
  });

  const { data } = useQuery({
    queryKey: [page.key, page.last, status],
    queryFn: () =>
      Api.customers.pageable({
        limit: "10",
      }),
  });

  function getOrders() {
    return page.customers.concat(data?.items ?? []);
  }

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
                Nome
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
                Contato
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
                Data de Cadastro
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <ListOrders customers={getOrders()} />
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
              customers: prev.customers.concat(data?.items ?? []),
            }));
          }}
        >
          Mais
        </Button>
      </Row>
    </Col>
  );
}

function ListOrders({ customers }: Readonly<{ customers: Customer[] }>) {
  const router = useRouter();

  if (isNullOrEmptyList(customers)) return EmptyList();

  return customers.map((customer) => (
    <TableRow
      key={customer.id}
      hover
      sx={{ cursor: "pointer" }}
      onClick={() => router.push("/customers/edit?id=".concat(customer.id))}
    >
      <TableCell>{customer.name}</TableCell>

      <TableCell>
        <Chip
          label={customer.status.description}
          color={getStatusColor(customer.status.name)}
          size="small"
        />
      </TableCell>

      <TableCell>
        <Col>
          <Text>{`${customer.phone.stateCode} ${customer.phone.number}`}</Text>
        </Col>
      </TableCell>

      <TableCell>
        <Col>
          <Text>Rua Lucerna, 156</Text>
          <Text>Dep. Jose Antonio Liberato</Text>
        </Col>
      </TableCell>

      <TableCell>{toLocalDayMonthYear(customer.createdAt)}</TableCell>
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
