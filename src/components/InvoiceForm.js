import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  IconButton,
  MenuItem,
  InputAdornment,
  Divider,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Add, Delete } from '@mui/icons-material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const InvoiceForm = () => {
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState('Pending'); // Default status set to "Pending"
  const [buyer, setBuyer] = useState({ name: '', email: '', address: '' });
  const [seller, setSeller] = useState({ name: '', email: '', address: '' });
  const [items, setItems] = useState([{ description: '', quantity: 1, price: 0 }]);
  const [taxRate, setTaxRate] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);
  const [notes, setNotes] = useState('Thanks for your business!');

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index][name] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const calculateDiscount = (subtotal) => (subtotal * discountRate) / 100;
  const calculateTax = (subtotal) => (subtotal * taxRate) / 100;
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount(subtotal);
    const tax = calculateTax(subtotal - discount);
    return subtotal - discount + tax;
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4 }}>
        {/* Header */}
        <Typography variant="h4" sx={{ color: '#295F98', marginBottom: 1, textAlign: 'center' }}>
          Sinha Brothers Water Supply
        </Typography>
        <Divider sx={{ marginBottom: 3 }} /> {/* Underline the header */}

        <Grid container spacing={3}>
          {/* Date */}
          <Grid size={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date"
                inputFormat="MM/dd/yyyy"
                value={date}
                onChange={(newDate) => setDate(newDate)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          {/* Invoice Status */}
          <Grid size={6}>
            <TextField
              select
              label="Payment Status"
              fullWidth
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              variant="outlined" // Match TextField style
              sx={{
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                },
              }}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </TextField>
          </Grid>

          {/* Buyer and Seller Info */}
          <Grid size={6}>
            <Typography variant="h6" sx={{ color: '#295F98' }}>Bill To:</Typography>
            <TextField
              label="Who is this invoice to?"
              fullWidth
              margin="normal"
              value={buyer.name}
              onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
            />
            <TextField
              label="Email address"
              fullWidth
              margin="normal"
              value={buyer.email}
              onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
            />
            <TextField
              label="Billing address"
              fullWidth
              margin="normal"
              value={buyer.address}
              onChange={(e) => setBuyer({ ...buyer, address: e.target.value })}
            />
          </Grid>

          <Grid size={6}>
            <Typography variant="h6" sx={{ color: '#295F98' }}>Bill From:</Typography>
            <TextField
              label="Who is this invoice from?"
              fullWidth
              margin="normal"
              value={seller.name}
              onChange={(e) => setSeller({ ...seller, name: e.target.value })}
            />
            <TextField
              label="Email address"
              fullWidth
              margin="normal"
              value={seller.email}
              onChange={(e) => setSeller({ ...seller, email: e.target.value })}
            />
            <TextField
              label="Billing address"
              fullWidth
              margin="normal"
              value={seller.address}
              onChange={(e) => setSeller({ ...seller, address: e.target.value })}
            />
          </Grid>

          {/* Items Section */}
          <Grid size={12}>
            <Typography variant="h6" sx={{ color: '#295F98' }}>Items</Typography>
            {items.map((item, index) => (
              <Grid container spacing={2} key={index} sx={{ marginBottom: 2 }}>
                <Grid size={4}>
                  <TextField
                    label="Item name"
                    name="description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, e)}
                    fullWidth
                  />
                </Grid>
                <Grid size={2}>
                  <TextField
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    fullWidth
                  />
                </Grid>
                <Grid size={2}>
                  <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, e)}
                    fullWidth
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid size={1}>
                  <IconButton color="error" onClick={() => removeItem(index)}>
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button variant="contained" startIcon={<Add />} onClick={addItem}>
              Add Item
            </Button>
          </Grid>

          {/* Summary Section */}
          <Grid size={12}>
            <Typography variant="h6" sx={{ color: '#295F98' }}>Summary</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography>Subtotal:</Typography>
              <Typography>₹{calculateSubtotal().toFixed(2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography>Discount:</Typography>
              <Typography>₹{calculateDiscount(calculateSubtotal()).toFixed(2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography>Tax:</Typography>
              <Typography>₹{calculateTax(calculateSubtotal() - calculateDiscount(calculateSubtotal())).toFixed(2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography>Total:</Typography>
              <Typography>₹{calculateTotal().toFixed(2)}</Typography>
            </Box>
          </Grid>

          {/* Currency, Tax, Discount */}
          <Grid size={4}>
            <TextField
              label="Tax rate"
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              label="Discount rate"
              type="number"
              value={discountRate}
              onChange={(e) => setDiscountRate(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>

          {/* Notes Section */}
          <Grid size={12}>
            <TextField
              label="Notes"
              fullWidth
              multiline
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Grid>

          {/* Review Invoice Button */}
          <Grid size={12}>
            <Button variant="contained" color="primary" fullWidth>
              Review Invoice
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default InvoiceForm;
