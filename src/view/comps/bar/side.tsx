"use client";

import { useState } from "react";

import {
  Box,
  BusinessRounded,
  Collapse,
  ExpandLess,
  ExpandMore,
  Inventory,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Paper,
  People,
  Row,
  ShoppingCart,
  Text,
  TrendingUp,
} from "@/com/ui";
import { ViewPath } from "@/routes";
import { useViewState } from "@/state/view/view";
import { fontSize, fontWeight } from "@/com/ui/style/scheme";

export function Sidebar() {
  const { view, setView } = useViewState();
  const [open, setOpen] = useState(false);

  return (
    <Paper sx={{ minWidth: 185 }}>
      <List>
        <Row
          sx={{
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            padding: 1,
          }}
        >
          <BusinessRounded />
          <Text sx={{ fontSize: fontSize.large, fontWeight: fontWeight.bold }}>
            Acme Co.
          </Text>
        </Row>

        <Box sx={{ margin: 1.5 }} />

        <ListItemButton
          selected={view.path == ViewPath.Analytics}
          onClick={() => setView({ path: ViewPath.Analytics, data: {} })}
        >
          <ListItemIcon>
            <TrendingUp />
          </ListItemIcon>
          <Text>Análises</Text>
        </ListItemButton>

        <ListItemButton
          selected={[ViewPath.Products, ViewPath.ProductsAdd].includes(
            view.path,
          )}
          onClick={() => setOpen(!open)}
        >
          <ListItemIcon>
            <Inventory />
          </ListItemIcon>
          <Text>Produtos</Text>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open}>
          <List>
            <ListItem>
              <ListItemButton
                selected={view.path == ViewPath.Products}
                onClick={() => setView({ path: ViewPath.Products, data: {} })}
              >
                <Text sx={{ fontSize: fontSize.small }}>Lista de produtos</Text>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                selected={view.path == ViewPath.ProductsAdd}
                onClick={() =>
                  setView({ path: ViewPath.ProductsAdd, data: {} })
                }
              >
                <Text sx={{ fontSize: fontSize.small }}>
                  Adicionar produtos
                </Text>
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        <ListItemButton
          selected={view.path == ViewPath.Orders}
          onClick={() => setView({ path: ViewPath.Orders, data: {} })}
        >
          <ListItemIcon>
            <ShoppingCart />
          </ListItemIcon>
          <Text>Pedidos</Text>
        </ListItemButton>

        <ListItemButton
          selected={view.path == ViewPath.Customers}
          onClick={() => setView({ path: ViewPath.Customers, data: {} })}
        >
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <Text>Clientes</Text>
        </ListItemButton>
      </List>
    </Paper>
  );
}
