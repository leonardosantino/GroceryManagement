"use client";

import {
  Inventory as ProductsIcon,
  People as CustomersIcon,
  ShoppingCart as OrdersIcon,
  TrendingUp as AnalyticsIcon,
} from "@mui/icons-material";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import { Paper } from "@/common/ui/comps/paper";
import { ViewPath } from "@/routes";
import { useViewState } from "@/state/view";

export function Sidebar() {
  const { view, setView } = useViewState();

  return (
    <Paper variant={"elevation"} sx={{ width: 200 }}>
      <List
        subheader={
          <ListSubheader
            sx={{
              textAlign: "center",
              lineHeight: 1.5,
              padding: 1,
              userSelect: "none",
              fontSize: 18,
              color: "text.primary",
            }}
          >
            Opção Supermercado
          </ListSubheader>
        }
        sx={{
          padding: 1,
        }}
      >
        <Divider sx={{ margin: 1 }} />

        <ListItemButton
          selected={view == ViewPath.Analytics}
          onClick={() => setView(ViewPath.Analytics)}
        >
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary={"Análises"} />
        </ListItemButton>

        <ListItemButton
          selected={view == ViewPath.Products}
          onClick={() => setView(ViewPath.Products)}
        >
          <ListItemIcon>
            <ProductsIcon />
          </ListItemIcon>
          <ListItemText primary={"Produtos"} />
          {/*{open ? <ExpandLess /> : <ExpandMore />}*/}
        </ListItemButton>

        {/*<Collapse in={open}>*/}
        {/*  <List>*/}
        {/*    <ListItem>*/}
        {/*      <ListItemButton*/}
        {/*        selected={view == ViewPath.Products}*/}
        {/*        onClick={() => setView(ViewPath.Products)}*/}
        {/*      >*/}
        {/*        <ListItemText primary={"Lista de Produtos"} />*/}
        {/*      </ListItemButton>*/}
        {/*    </ListItem>*/}
        {/*  </List>*/}
        {/*</Collapse>*/}

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
