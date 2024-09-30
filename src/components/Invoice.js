import React from "react";
import {
  Modal,
  Box,
  Typography,
  Divider,
  Grid,
  Button,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "auto", // Remove the vertical centering
  left: "50%",
  transform: "translateX(-50%)", // Only horizontally center
  width: 600,
  maxHeight: "80vh", // Limit height to avoid overflowing (reduce percentage to your needs)
  marginTop: "20px", // Add margin from the top of the viewport
  marginBottom: "20px", // Add margin from the bottom of the viewport
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  overflowY: "auto", // Enable scrolling inside the modal
};

const Invoice = ({ open, onClose, invoiceData }) => {
  const {
    date,
    buyer,
    seller,
    items,
    subtotal,
    discount,
    tax,
    total,
    notes,
  } = invoiceData;

  const formattedSubtotal = Number(subtotal) || 0;
  const formattedDiscount = Number(discount) || 0;
  const formattedTax = Number(tax) || 0;
  const formattedTotal = Number(total) || 0;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="invoice-modal-title"
      aria-describedby="invoice-modal-description"
    >
      <Box sx={style}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box>
            <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
              {seller.name}
            </Typography>
            <Typography>{seller.address}</Typography>
            <Typography>{seller.phone}</Typography>
            <Typography>{seller.email}</Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Amount Due:
            </Typography>
            <Typography variant="h4" sx={{ color: "#2E7D32", fontWeight: "bold" }}>
              ₹{formattedTotal.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Invoice Details */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              Billed to:
            </Typography>
            <Typography>{buyer.name}</Typography>
            <Typography>{buyer.address}</Typography>
            <Typography>{buyer.phone}</Typography>
            <Typography>{buyer.email}</Typography>
          </Box>
          <Box>
            <Typography>Invoice Number: 2021-10-30</Typography>
            <Typography>Date Of Issue: {new Date(date).toLocaleDateString()}</Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Items */}
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>QTY</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>DESCRIPTION</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>PRICE</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>AMOUNT</Typography>
          </Grid>
        </Grid>

        {items.map((item, index) => (
          <Grid container spacing={1} key={index} sx={{ my: 1 }}>
            <Grid item xs={2}>
              <Typography>{item.quantity}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{item.description}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>₹{Number(item.price).toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>₹{(Number(item.price) * Number(item.quantity)).toFixed(2)}</Typography>
            </Grid>
          </Grid>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* Totals */}
        <Grid container spacing={1} justifyContent="flex-end">
          <Grid item xs={6}>
            <Typography>SUBTOTAL:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>₹{formattedSubtotal.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>DISCOUNT:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>₹{formattedDiscount.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>TAX:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>₹{formattedTax.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              TOTAL:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              ₹{formattedTotal.toFixed(2)}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Notes */}
        <Typography variant="subtitle2" sx={{ fontWeight: "bold", mt: 2 }}>
          Notes
        </Typography>
        <Typography>{notes}</Typography>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button variant="contained" color="primary">
            Send Invoice
          </Button>
          <Button variant="outlined" color="secondary">
            Download Copy
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Invoice;
