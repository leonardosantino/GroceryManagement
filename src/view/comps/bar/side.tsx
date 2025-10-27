"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  Box,
  BusinessIcon,
  LogoutIcon,
  Collapse,
  ExpandLessIcon,
  ExpandMoreIcon,
  InventoryIcon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Paper,
  PeopleIcon,
  Row,
  ShoppingCartIcon,
  Text,
  TrendingUpIcon,
  Divider,
  Col,
  IconButton,
  Tooltip,
} from "@/com/ui/comps";
import { useSession } from "@/provider/data/SessionProvider";

const data = { isOpen: false };

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const { deleteSession } = useSession();

  const [open, setOpen] = useState(data.isOpen);

  function isSelected(path: string) {
    return pathname === path;
  }

  function isSection(name: string) {
    data.isOpen = open;

    return pathname?.startsWith(name);
  }

  return (
    <Paper direction={"column"} justify={"space-between"}>
      <List>
        {/* Title */}
        <Row align={"center"} justify={"center"} gap={1} padding={1}>
          <BusinessIcon />
          <Text>Ecom Soft Co.</Text>
        </Row>

        <Box height={16} />

        <ListItemButton
          selected={isSelected("/")}
          onClick={() => router.push("/")}
        >
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <Text>Análises</Text>
        </ListItemButton>

        <ListItemButton
          selected={isSection("/products")}
          onClick={() => setOpen(!open)}
        >
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <Text>Produtos</Text>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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
            <ShoppingCartIcon />
          </ListItemIcon>
          <Text>Pedidos</Text>
        </ListItemButton>

        <ListItemButton
          selected={isSelected("/customers")}
          onClick={() => router.push("/customers")}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <Text>Clientes</Text>
        </ListItemButton>
      </List>
      <Col padding={1}>
        <Divider />
        <Box height={8} />
        <Row align={"center"} justify={"space-between"} gap={1}>
          <Text>Leonardo Santino</Text>

          <Tooltip title="Sair">
            <IconButton color={"error"} onClick={() => deleteSession()}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Row>
      </Col>
    </Paper>
  );
}
