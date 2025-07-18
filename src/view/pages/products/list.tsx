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
  Sx,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Text,
} from "@/com/ui";
import { currencyFromDouble } from "@/com/ui/comps/input/currency";
import { Product } from "@/model/product";

const api = new MarketApi();

export function ProductsList() {
  const { data: products } = useQuery<Product[]>({
    queryKey: ["products-y4i8"],
    queryFn: async () => await api.productFindAll().then((data) => data.items),
  });

  console.log(products);

  return (
    <Col
      sx={{
        padding: 2,
        gap: 2,
        flexGrow: 1,
      }}
    >
      {/*Filter*/}
      <Box sx={{ gap: 2 }}>
        <Input placeholder="Pesquisar produtos..." sx={{ flexGrow: 1 }} />
        <Button variant="outlined" startIcon={<FilterList />}>
          Filtro
        </Button>
      </Box>

      {/*Table*/}
      <TableContainer sx={{ flexGrow: 1 }}>
        <Table>
          <TableHead
            sx={{ backgroundColor: Sx.color.surface, borderRadius: 50 }}
          >
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell colSpan={2} align={"center"}>
                Unidade
              </TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product: Product) => (
              <TableRow key={product.id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      src={[...product.images][0]}
                      variant="rounded"
                      sx={{ width: 40, height: 40 }}
                    />
                    <Text variant="body2" sx={{ fontWeight: 500 }}>
                      {product.name}
                    </Text>
                  </Box>
                </TableCell>
                <TableCell>
                  <Text variant="body2" color="textSecondary">
                    {product.description}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text variant="body2" sx={{ fontWeight: 500 }}>
                    {product.unit.name}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text variant="body2">{product.unit.description}</Text>
                </TableCell>
                <TableCell>{currencyFromDouble(product.unit.price)}</TableCell>
                <TableCell>
                  <Text variant="body2" color="textSecondary">
                    {product.unit.quantity}
                  </Text>
                </TableCell>
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
