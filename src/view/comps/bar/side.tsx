"use client";

import {
  ExpandLess,
  ExpandMore,
  Inventory as ProductsIcon,
  People as CustomersIcon,
  ShoppingCart as OrdersIcon,
  TrendingUp as AnalyticsIcon,
} from "@mui/icons-material";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useState } from "react";

import { Paper } from "@/common/ui/comps/paper";
import { ViewPath } from "@/routes";
import { useViewState } from "@/state/view";

export function Sidebar() {
  const { view, setView } = useViewState();
  const [open, setOpen] = useState(true);

  return (
    <Paper variant={"elevation"} sx={{ width: 200 }}>
      <List
        subheader={
          <ListSubheader
            sx={{
              textAlign: "center",
              lineHeight: 2,
              padding: 1,
              userSelect: "none",
            }}
          >
            Opção Supermercado
          </ListSubheader>
        }
      >
        <Divider />

        <ListItemButton
          selected={view == ViewPath.Analytics}
          onClick={() => setView(ViewPath.Analytics)}
        >
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary={"Análises"} />
        </ListItemButton>

        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemIcon>
            <ProductsIcon />
          </ListItemIcon>
          <ListItemText primary={"Produtos"} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open}>
          <List>
            <ListItem>
              <ListItemButton
                selected={view == ViewPath.Products}
                onClick={() => setView(ViewPath.Products)}
              >
                <ListItemText primary={"Lista de Produtos"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        <ListItemButton
          selected={view == ViewPath.Orders}
          onClick={() => setView(ViewPath.Orders)}
        >
          <ListItemIcon>
            <OrdersIcon />
          </ListItemIcon>
          <ListItemText primary={"Pedidos"} />
        </ListItemButton>

        <ListItemButton
          selected={view == ViewPath.Customers}
          onClick={() => setView(ViewPath.Customers)}
        >
          <ListItemIcon>
            <CustomersIcon />
          </ListItemIcon>
          <ListItemText primary={"Clientes"} />
        </ListItemButton>
      </List>
    </Paper>
  );
}
