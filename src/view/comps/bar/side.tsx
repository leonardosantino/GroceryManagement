"use client";

import {
  Dashboard as DashboardIcon,
  Discount as DiscountsIcon,
  Inventory as ProductsIcon,
  LocalShipping as ShippingIcon,
  People as CustomersIcon,
  Settings as SettingsIcon,
  ShoppingCart as OrdersIcon,
  TrendingUp as AnalyticsIcon,
  Warehouse as InventoryIcon,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

const menuItems = [
  { id: "products", label: "Products", icon: ProductsIcon },
  { id: "orders", label: "Orders", icon: OrdersIcon },
  { id: "customers", label: "Customers", icon: CustomersIcon },
  { id: "inventory", label: "Inventory", icon: InventoryIcon },
];

const secondaryItems = [
  { id: "analytics", label: "Analytics", icon: AnalyticsIcon },
  { id: "shipping", label: "Shipping", icon: ShippingIcon },
  { id: "discounts", label: "Discounts", icon: DiscountsIcon },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

type SidebarProps = {
  activeView: string;
  setActiveView: (view: string) => void;
};

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const drawer = (
    <>
      <Typography>SELLER</Typography>
      <Divider />

      <List>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                selected={activeView === item.id}
                onClick={() => setActiveView(item.id)}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ my: 2 }} />

      <List>
        {secondaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                selected={activeView === item.id}
                onClick={() => setActiveView(item.id)}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );

  return <Box component="nav">{drawer}</Box>;
}
