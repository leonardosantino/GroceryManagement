import {
  Edit as EditIcon,
  LocalShipping as ShippingIcon,
  Notifications as NotificationsIcon,
  Payment as PaymentIcon,
  Security as SecurityIcon,
  Store as StoreIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

export function Settings() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Store Information */}
        <Grid size={6}>
          <Card>
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <StoreIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Store Information
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Store Name"
                    variant="outlined"
                    defaultValue="Medusa Store"
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Store Description"
                    variant="outlined"
                    multiline
                    rows={3}
                    defaultValue="Your premium e-commerce store powered by Medusa"
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Store Email"
                    variant="outlined"
                    defaultValue="store@medusa.com"
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Store Phone"
                    variant="outlined"
                    defaultValue="+1 (555) 123-4567"
                  />
                </Grid>
                <Grid size={12}>
                  <Button variant="contained" sx={{ mt: 2 }}>
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* User Profile */}
        <Grid size={6}>
          <Card>
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <Avatar sx={{ width: 40, height: 40 }}>A</Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Admin Profile
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Manage your account settings
                  </Typography>
                </Box>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Box>

              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    defaultValue="Admin"
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    defaultValue="User"
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    defaultValue="admin@medusa.com"
                  />
                </Grid>
                <Grid size={12}>
                  <Button variant="contained" sx={{ mt: 2 }}>
                    Update Profile
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications */}
        <Grid size={6}>
          <Card>
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <NotificationsIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Notifications
                </Typography>
              </Box>

              <List>
                <ListItem>
                  <ListItemText
                    primary="Order Notifications"
                    secondary="Get notified when new orders are placed"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Low Stock Alerts"
                    secondary="Receive alerts when products are running low"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Customer Messages"
                    secondary="Get notified of customer inquiries"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Marketing Updates"
                    secondary="Receive updates about new features"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Security */}
        <Grid size={6}>
          <Card>
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <SecurityIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Security
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    variant="outlined"
                    type="password"
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="New Password"
                    variant="outlined"
                    type="password"
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    variant="outlined"
                    type="password"
                  />
                </Grid>
                <Grid size={12}>
                  <FormControlLabel
                    control={<Switch />}
                    label="Enable Two-Factor Authentication"
                  />
                </Grid>
                <Grid size={12}>
                  <Button variant="contained" sx={{ mt: 2 }}>
                    Update Password
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Settings */}
        <Grid size={6}>
          <Card>
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <PaymentIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Payment Methods
                </Typography>
              </Box>

              <List>
                <ListItem>
                  <ListItemText
                    primary="Stripe"
                    secondary="Credit card payments"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="PayPal" secondary="PayPal payments" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Bank Transfer"
                    secondary="Direct bank transfers"
                  />
                </ListItem>
              </List>

              <Button variant="outlined" sx={{ mt: 2 }}>
                Configure Payment Methods
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Shipping Settings */}
        <Grid size={6}>
          <Card>
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <ShippingIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Shipping Options
                </Typography>
              </Box>

              <List>
                <ListItem>
                  <ListItemText
                    primary="Standard Shipping"
                    secondary="5-7 business days - $5.99"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Express Shipping"
                    secondary="2-3 business days - $12.99"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Overnight Shipping"
                    secondary="Next business day - $24.99"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Free Shipping"
                    secondary="Orders over $100"
                  />
                </ListItem>
              </List>

              <Button variant="outlined" sx={{ mt: 2 }}>
                Manage Shipping Zones
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
