"use client";

import {
  Block as BlockIcon,
  Edit as EditIcon,
  Email as EmailIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import {
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
import { MouseEvent, useState } from "react";

const customers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    orders: 12,
    totalSpent: "$1,299.99",
    status: "active",
    joinDate: "2023-06-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 987-6543",
    orders: 8,
    totalSpent: "$899.50",
    status: "active",
    joinDate: "2023-08-22",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1 (555) 456-7890",
    orders: 3,
    totalSpent: "$299.99",
    status: "inactive",
    joinDate: "2023-12-01",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    phone: "+1 (555) 321-0987",
    orders: 15,
    totalSpent: "$2,199.99",
    status: "vip",
    joinDate: "2023-03-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    phone: "+1 (555) 654-3210",
    orders: 0,
    totalSpent: "$0.00",
    status: "blocked",
    joinDate: "2024-01-05",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "success";
    case "inactive":
      return "default";
    case "vip":
      return "primary";
    case "blocked":
      return "error";
    default:
      return "default";
  }
};

export function Customers() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleMenuClick = (
    event: MouseEvent<HTMLElement>,
    customerId: number,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedCustomer(customerId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCustomer(null);
  };

  const handleViewCustomer = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedCustomerData = customers.find(
    (customer) => customer.id === selectedCustomer,
  );

  return (
    <Box>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              placeholder="Search customers..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                  <TableCell>Customer</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Orders</TableCell>
                  <TableCell>Total Spent</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Join Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} hover>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Avatar
                          src={customer.avatar}
                          sx={{ width: 40, height: 40 }}
                        >
                          {customer.name.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {customer.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          {customer.email}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {customer.phone}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{customer.orders}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {customer.totalSpent}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={customer.status}
                        color={getStatusColor(customer.status)}
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {customer.joinDate}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={(e) => handleMenuClick(e, customer.id)}
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
        <MenuItem onClick={handleViewCustomer}>
          <ViewIcon sx={{ mr: 1, fontSize: 20 }} />
          View Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <EditIcon sx={{ mr: 1, fontSize: 20 }} />
          Edit Customer
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <EmailIcon sx={{ mr: 1, fontSize: 20 }} />
          Send Email
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: "error.main" }}>
          <BlockIcon sx={{ mr: 1, fontSize: 20 }} />
          Block Customer
        </MenuItem>
      </Menu>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Customer Profile</DialogTitle>
        <DialogContent>
          {selectedCustomerData && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid size={6}>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Typography variant="body2">
                  <strong>Name:</strong> {selectedCustomerData.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {selectedCustomerData.email}
                </Typography>
                <Typography variant="body2">
                  <strong>Phone:</strong> {selectedCustomerData.phone}
                </Typography>
                <Typography variant="body2">
                  <strong>Join Date:</strong> {selectedCustomerData.joinDate}
                </Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="h6" gutterBottom>
                  Order History
                </Typography>
                <Typography variant="body2">
                  <strong>Total Orders:</strong> {selectedCustomerData.orders}
                </Typography>
                <Typography variant="body2">
                  <strong>Total Spent:</strong>{" "}
                  {selectedCustomerData.totalSpent}
                </Typography>
                <Typography variant="body2">
                  <strong>Status:</strong>
                  <Chip
                    label={selectedCustomerData.status}
                    color={getStatusColor(selectedCustomerData.status)}
                    size="small"
                    sx={{ ml: 1, textTransform: "capitalize" }}
                  />
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button variant="contained">Edit Customer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
