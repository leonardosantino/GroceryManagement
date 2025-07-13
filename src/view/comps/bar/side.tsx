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
  Sx,
  Text,
  TrendingUp,
} from "@/com/ui";
import { ViewPath } from "@/routes";
import { useViewState } from "@/state/view/view";

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
          <Text>Acme Co.</Text>
        </Row>

        <Box sx={{ margin: 1.5 }} />

        <ListItemButton
          selected={view == ViewPath.Analytics}
          onClick={() => setView(ViewPath.Analytics)}
        >
          <ListItemIcon>
            <TrendingUp />
          </ListItemIcon>
          <Text sx={{ fontSize: Sx.fontSize.medium }}>Análises</Text>
        </ListItemButton>

        <ListItemButton
          selected={[ViewPath.Products, ViewPath.ProductsAdd].includes(view)}
          onClick={() => setOpen(!open)}
        >
          <ListItemIcon>
            <Inventory />
          </ListItemIcon>
          <Text sx={{ fontSize: Sx.fontSize.medium }}>Produtos</Text>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open}>
          <List>
            <ListItem>
              <ListItemButton
                selected={view == ViewPath.Products}
                onClick={() => setView(ViewPath.Products)}
              >
                <Text sx={{ fontSize: Sx.fontSize.small }}>
                  Lista de produtos
                </Text>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                selected={view == ViewPath.ProductsAdd}
                onClick={() => setView(ViewPath.ProductsAdd)}
              >
                <Text sx={{ fontSize: Sx.fontSize.small }}>
                  Adicionar produtos
                </Text>
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        <ListItemButton
          selected={view == ViewPath.Orders}
          onClick={() => setView(ViewPath.Orders)}
        >
          <ListItemIcon>
            <ShoppingCart />
          </ListItemIcon>
          <Text sx={{ fontSize: Sx.fontSize.medium }}>Pedidos</Text>
        </ListItemButton>

        <ListItemButton
          selected={view == ViewPath.Customers}
          onClick={() => setView(ViewPath.Customers)}
        >
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <Text sx={{ fontSize: Sx.fontSize.medium }}>Clientes</Text>
        </ListItemButton>
      </List>
    </Paper>
  );
}
