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
  Pagination,
  Row,
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

const api = new MarketApi();

export function ProductsList() {
  const { data: products } = useQuery<Product[]>({
    queryKey: ["products-y4i8"],
    queryFn: async () => await api.productFindAll().then((data) => data.items),
  });

  return (
    <Col
      sx={{
        padding: 2,
        gap: 2,
        flexGrow: 1,
      }}
    >
      {/*Filter*/}
      <Box sx={{ gap: 2, justifyContent: "center" }}>
        <Input placeholder="Pesquisar produtos..." sx={{ flexGrow: 0.25 }} />
        <Button variant="outlined" startIcon={<FilterList />}>
          Filtro
        </Button>
      </Box>

      {/*Table*/}
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
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
            {products?.map((product: Product) => (
              <TableRow key={product.id} hover>
                <TableCell
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Avatar
                    src={[...product.images][0]}
                    variant="rounded"
                    sx={{ width: 40, height: 40 }}
                  />
                  {product.name}
                </TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.unit.name}</TableCell>
                <TableCell>{product.unit.description}</TableCell>
                <TableCell>{currencyFromDouble(product.unit.price)}</TableCell>
                <TableCell align={"center"}>{product.unit.quantity}</TableCell>
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
      <Row sx={{ padding: 2, justifyContent: "center" }}>
        <Pagination count={10} />
      </Row>
    </Col>
  );
}
