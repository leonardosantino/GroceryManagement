"use client";

import {
  Add as AddIcon,
  Edit as EditIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Remove as RemoveIcon,
  Search as SearchIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

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

export default function Inventory() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    itemId: number,
  ) => {
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
    <Box>
      {lowStockItems.length > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WarningIcon />
            <Typography>
              {lowStockItems.length} item(s) need attention: low stock or out of
              stock
            </Typography>
          </Box>
        </Alert>
      )}

      <Card>
        <CardContent>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              placeholder="Search inventory..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1 }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              sx={{ borderRadius: 2 }}
            >
              Filter
            </Button>
          </Box>

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
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Avatar
                          src={item.image}
                          variant="rounded"
                          sx={{ width: 40, height: 40 }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {item.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {item.sku}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {item.currentStock}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {item.reservedStock}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {item.availableStock}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(item.status)}
                        color={getStatusColor(item.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {item.location}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {item.lastUpdated}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={(e) => handleMenuClick(e, item.id)}
                        size="small"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleAdjustStock}>
          <EditIcon sx={{ mr: 1, fontSize: 20 }} />
          Adjust Stock
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <AddIcon sx={{ mr: 1, fontSize: 20 }} />
          Add Stock
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <RemoveIcon sx={{ mr: 1, fontSize: 20 }} />
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
            <Grid item xs={12}>
              <TextField
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
            <Grid item xs={12}>
              <TextField
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
    </Box>
  );
}
