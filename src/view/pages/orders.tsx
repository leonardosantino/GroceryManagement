"use client";

import {
  Cancel as CancelIcon,
  Edit as EditIcon,
  FilterList as FilterIcon,
  LocalShipping as ShippingIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
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

const orders = [
  {
    id: "#12345",
    customer: "John Doe",
    email: "john@example.com",
    total: "$299.99",
    status: "completed",
    paymentStatus: "paid",
    date: "2024-01-15",
    items: 3,
  },
  {
    id: "#12346",
    customer: "Jane Smith",
    email: "jane@example.com",
    total: "$149.50",
    status: "processing",
    paymentStatus: "paid",
    date: "2024-01-15",
    items: 2,
  },
  {
    id: "#12347",
    customer: "Bob Johnson",
    email: "bob@example.com",
    total: "$89.99",
    status: "shipped",
    paymentStatus: "paid",
    date: "2024-01-14",
    items: 1,
  },
  {
    id: "#12348",
    customer: "Alice Brown",
    email: "alice@example.com",
    total: "$199.99",
    status: "pending",
    paymentStatus: "pending",
    date: "2024-01-14",
    items: 4,
  },
  {
    id: "#12349",
    customer: "Charlie Wilson",
    email: "charlie@example.com",
    total: "$349.99",
    status: "cancelled",
    paymentStatus: "refunded",
    date: "2024-01-13",
    items: 2,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "success";
    case "processing":
      return "info";
    case "shipped":
      return "primary";
    case "pending":
      return "warning";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "success";
    case "pending":
      return "warning";
    case "refunded":
      return "info";
    case "failed":
      return "error";
    default:
      return "default";
  }
};

export default function Orders() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    orderId: string,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(orderId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleViewOrder = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedOrderData = orders.find((order) => order.id === selectedOrder);

  return (
    <Box>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              placeholder="Search orders..."
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
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Payment</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {order.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {order.customer}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {order.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {order.total}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.paymentStatus}
                        color={getPaymentStatusColor(order.paymentStatus)}
                        size="small"
                        variant="outlined"
                        sx={{ textTransform: "capitalize" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {order.date}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{order.items}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={(e) => handleMenuClick(e, order.id)}
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
        <MenuItem onClick={handleViewOrder}>
          <ViewIcon sx={{ mr: 1, fontSize: 20 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <EditIcon sx={{ mr: 1, fontSize: 20 }} />
          Edit Order
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ShippingIcon sx={{ mr: 1, fontSize: 20 }} />
          Update Shipping
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: "error.main" }}>
          <CancelIcon sx={{ mr: 1, fontSize: 20 }} />
          Cancel Order
        </MenuItem>
      </Menu>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Order Details - {selectedOrder}</DialogTitle>
        <DialogContent>
          {selectedOrderData && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Customer Information
                </Typography>
                <Typography variant="body2">
                  <strong>Name:</strong> {selectedOrderData.customer}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {selectedOrderData.email}
                </Typography>
                <Typography variant="body2">
                  <strong>Order Date:</strong> {selectedOrderData.date}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Typography variant="body2">
                  <strong>Total:</strong> {selectedOrderData.total}
                </Typography>
                <Typography variant="body2">
                  <strong>Items:</strong> {selectedOrderData.items}
                </Typography>
                <Typography variant="body2">
                  <strong>Status:</strong>
                  <Chip
                    label={selectedOrderData.status}
                    color={getStatusColor(selectedOrderData.status)}
                    size="small"
                    sx={{ ml: 1, textTransform: "capitalize" }}
                  />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Order Items
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Order items would be displayed here with product details,
                  quantities, and prices.
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button variant="contained">Update Order</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
