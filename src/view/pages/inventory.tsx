"use client";

import { MouseEvent, useState } from "react";

import {
  Alert,
  Avatar,
  Button,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Text,
  Input,
  Add,
  Edit,
  FilterList,
  MoreVert,
  Remove,
  Warning,
  Col,
  Paper,
} from "@/com/ui/comps";

const inventory = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    sku: "WBH-001",
    currentStock: 45,
    reservedStock: 5,
    availableStock: 40,
    lowStockThreshold: 10,
    status: "in_stock",
    location: "Warehouse A",
    lastUpdated: "2024-01-15",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    sku: "SFW-002",
    currentStock: 8,
    reservedStock: 3,
    availableStock: 5,
    lowStockThreshold: 15,
    status: "low_stock",
    location: "Warehouse B",
    lastUpdated: "2024-01-14",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Portable Phone Charger",
    sku: "PPC-003",
    currentStock: 0,
    reservedStock: 0,
    availableStock: 0,
    lowStockThreshold: 20,
    status: "out_of_stock",
    location: "Warehouse A",
    lastUpdated: "2024-01-13",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Wireless Mouse",
    sku: "WM-004",
    currentStock: 67,
    reservedStock: 12,
    availableStock: 55,
    lowStockThreshold: 25,
    status: "in_stock",
    location: "Warehouse C",
    lastUpdated: "2024-01-15",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "USB-C Hub",
    sku: "UCH-005",
    currentStock: 12,
    reservedStock: 8,
    availableStock: 4,
    lowStockThreshold: 10,
    status: "low_stock",
    location: "Warehouse B",
    lastUpdated: "2024-01-14",
    image: "/placeholder.svg?height=40&width=40",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "in_stock":
      return "success";
    case "low_stock":
      return "warning";
    case "out_of_stock":
      return "error";
    default:
      return "default";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "in_stock":
      return "In Stock";
    case "low_stock":
      return "Low Stock";
    case "out_of_stock":
      return "Out of Stock";
    default:
      return status;
  }
};

export function Inventory() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleMenuClick = (event: MouseEvent<HTMLElement>, itemId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(itemId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleAdjustStock = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const lowStockItems = inventory.filter(
    (item) => item.status === "low_stock" || item.status === "out_of_stock",
  );

  return (
    <Col testId={"inventory-page"}>
      {lowStockItems.length > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Col>
            <Warning />
            <Text>
              {lowStockItems.length} item(s) need attention: low stock or out of
              stock
            </Text>
          </Col>
        </Alert>
      )}

      <Paper>
        <CardContent>
          <Col>
            <Input
              placeholder="Search inventory..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{ borderRadius: 2 }}
            >
              Filter
            </Button>
          </Col>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Current Stock</TableCell>
                  <TableCell>Reserved</TableCell>
                  <TableCell>Available</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Col>
                        <Avatar
                          src={item.image}
                          variant="rounded"
                          sx={{ width: 40, height: 40 }}
                        />
                        <Text>{item.name}</Text>
                      </Col>
                    </TableCell>
                    <TableCell>
                      <Text>{item.sku}</Text>
                    </TableCell>
                    <TableCell>
                      <Text>{item.currentStock}</Text>
                    </TableCell>
                    <TableCell>
                      <Text>{item.reservedStock}</Text>
                    </TableCell>
                    <TableCell>
                      <Text>{item.availableStock}</Text>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(item.status)}
                        color={getStatusColor(item.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Text>{item.location}</Text>
                    </TableCell>
                    <TableCell>
                      <Text>{item.lastUpdated}</Text>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={(e) => handleMenuClick(e, item.id)}
                        size="small"
                      >
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleAdjustStock}>
          <Edit sx={{ mr: 1, fontSize: 20 }} />
          Adjust Stock
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Add sx={{ mr: 1, fontSize: 20 }} />
          Add Stock
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Remove sx={{ mr: 1, fontSize: 20 }} />
          Remove Stock
        </MenuItem>
      </Menu>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Adjust Stock</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={12}>
              <Input
                fullWidth
                label="Current Stock"
                variant="outlined"
                type="number"
                defaultValue={
                  inventory.find((item) => item.id === selectedItem)
                    ?.currentStock || 0
                }
              />
            </Grid>
            <Grid size={12}>
              <Input
                fullWidth
                label="Adjustment Reason"
                variant="outlined"
                multiline
                rows={3}
                placeholder="Enter reason for stock adjustment..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            Update Stock
          </Button>
        </DialogActions>
      </Dialog>
    </Col>
  );
}
