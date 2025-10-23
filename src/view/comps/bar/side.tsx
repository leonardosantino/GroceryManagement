"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

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

const data: { isOpen: boolean } = { isOpen: false };

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(data.isOpen);

  function isSelected(path: string) {
    return pathname === path;
  }

  function isSection(name: string) {
    data.isOpen = open;

    return pathname?.startsWith(name);
  }

  return (
    <Paper>
      <List>
        <Row align={"center"} justify={"center"} gap={1} padding={1}>
          <BusinessRounded />
          <Text>Acme Co.</Text>
        </Row>

        <Box margin={1} />

        <ListItemButton
          selected={isSelected("/")}
          onClick={() => router.push("/")}
        >
          <ListItemIcon>
            <TrendingUp />
          </ListItemIcon>
          <Text>Análises</Text>
        </ListItemButton>

        <ListItemButton
          selected={isSection("/products")}
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
                selected={isSelected("/products/list")}
                onClick={() => router.push("/products/list")}
              >
                <Text>Lista de produtos</Text>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                selected={isSelected("/products/add")}
                onClick={() => router.push("/products/add")}
              >
                <Text>Adicionar produtos</Text>
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        <ListItemButton
          selected={isSelected("/orders")}
          onClick={() => router.push("/orders")}
        >
          <ListItemIcon>
            <ShoppingCart />
          </ListItemIcon>
          <Text>Pedidos</Text>
        </ListItemButton>

        <ListItemButton
          selected={isSelected("/customers")}
          onClick={() => router.push("/customers")}
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
