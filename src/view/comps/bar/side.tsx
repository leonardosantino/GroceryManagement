"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/provider/data/SessionProvider";

import {
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
  BoxSize,
} from "@/com/ui/comps";

import { Page } from "@/com/consts/page";
import { Api } from "@/clients/Api";

const data = { isOpen: false };

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const { session, deleteSession } = useSession();

  const { data: seller } = useQuery({
    queryKey: ["seller"],
    queryFn: () => Api.sellers.findById(session.id as string),
    staleTime: Infinity,
  });

  const [open, setOpen] = useState(data.isOpen);

  function isSelected(path: string) {
    return pathname === path;
  }

  function isSection(name: string) {
    data.isOpen = open;

    return pathname?.startsWith(name);
  }

  return (
    <Paper direction={"column"}>
      {/* Title */}
      <Col flex={1}>
        <Row align={"center"} justify={"center"} gap={1} height={36}>
          <BusinessIcon />
          <Text>Ecom Soft Co.</Text>
        </Row>

        <BoxSize height={4} />

        <List>
          <ListItemButton
            selected={isSelected(Page.analyses)}
            onClick={() => router.push(Page.analyses)}
          >
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <Text>Análises</Text>
          </ListItemButton>

          <ListItemButton
            selected={isSection(Page.products.base)}
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
                  selected={isSelected(Page.products.add)}
                  onClick={() => router.push(Page.products.add)}
                >
                  <Text>Adicionar produtos</Text>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  selected={isSelected(Page.products.list)}
                  onClick={() => router.push(Page.products.list)}
                >
                  <Text>Lista de produtos</Text>
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>

          <ListItemButton
            selected={isSelected(Page.orders.list)}
            onClick={() => router.push(Page.orders.list)}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <Text>Pedidos</Text>
          </ListItemButton>

          <ListItemButton
            selected={isSelected(Page.customers.list)}
            onClick={() => router.push(Page.customers.list)}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <Text>Clientes</Text>
          </ListItemButton>
        </List>
      </Col>

      {/*User*/}
      <Col padding={1} gap={1}>
        <Divider />

        <Row align={"center"} justify={"space-between"} gap={1}>
          <Text>{seller?.name}</Text>

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
