"use client";

import {
  BusinessRounded,
  ExpandLess,
  ExpandMore,
  Inventory,
  People,
  ShoppingCart,
  TrendingUp,
} from "@mui/icons-material";
import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { useState } from "react";

import { Paper, Row, Text } from "@/com/ui";
import { ViewPath } from "@/routes";
import { useViewState } from "@/state/view";

export function Sidebar() {
  const { view, setView } = useViewState();
  const [open, setOpen] = useState(false);

  return (
    <Paper elevation={1}>
      <List>
        <Row sx={{ alignItems: "center", justifyContent: "center" }}>
          <IconButton>
            <BusinessRounded />
          </IconButton>
          <Text>Acme Co.</Text>
        </Row>

        <Divider sx={{ margin: 1 }} />

        <ListItemButton
          selected={view == ViewPath.Analytics}
          onClick={() => setView(ViewPath.Analytics)}
        >
          <ListItemIcon>
            <TrendingUp />
          </ListItemIcon>
          <Text>Análises</Text>
        </ListItemButton>

        <ListItemButton
          selected={[ViewPath.Products, ViewPath.ProductsAdd].includes(view)}
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
                selected={view == ViewPath.Products}
                onClick={() => setView(ViewPath.Products)}
              >
                <Text sx={{ fontSize: "small" }}>Lista de produtos</Text>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                selected={view == ViewPath.ProductsAdd}
                onClick={() => setView(ViewPath.ProductsAdd)}
              >
                <Text sx={{ fontSize: "small" }}>Adicionar produtos</Text>
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
          <Text>Pedidos</Text>
        </ListItemButton>

        <ListItemButton
          selected={view == ViewPath.Customers}
          onClick={() => setView(ViewPath.Customers)}
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
