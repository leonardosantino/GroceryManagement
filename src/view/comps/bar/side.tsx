"use client";

import {
  Inventory,
  People,
  ShoppingCart,
  TrendingUp,
} from "@mui/icons-material";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import { Paper } from "@/common/ui/comps";
import { ViewPath } from "@/routes";
import { useViewState } from "@/state/view";

export function Sidebar() {
  const { view, setView } = useViewState();

  return (
    <Paper elevation={1}>
      <List
        subheader={
          <ListSubheader
            sx={{
              textAlign: "center",
              lineHeight: "normal",
              userSelect: "none",
            }}
          >
            Opção Supermercado
          </ListSubheader>
        }
        sx={{ width: 175 }}
      >
        <Divider sx={{ margin: 1 }} />

        <ListItemButton
          selected={view == ViewPath.Analytics}
          onClick={() => setView(ViewPath.Analytics)}
        >
          <ListItemIcon>
            <TrendingUp />
          </ListItemIcon>
          <ListItemText primary={"Análises"} />
        </ListItemButton>

        <ListItemButton
          selected={view == ViewPath.Products}
          onClick={() => setView(ViewPath.Products)}
        >
          <ListItemIcon>
            <Inventory />
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
            <ShoppingCart />
          </ListItemIcon>
          <ListItemText primary={"Pedidos"} />
        </ListItemButton>

        <ListItemButton
          selected={view == ViewPath.Customers}
          onClick={() => setView(ViewPath.Customers)}
        >
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary={"Clientes"} />
        </ListItemButton>
      </List>
    </Paper>
  );
}
