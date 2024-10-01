import React, { useRef } from "react";
import { Modal, Box, Typography, Divider, Grid, Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "600px",
  maxHeight: "80vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  overflowY: "auto",
  overflowX: "visible",
};

const Invoice = ({ open, onClose, invoiceData }) => {
  const invoiceRef = useRef();

  const { date, buyer, seller, items, subtotal, discount, tax, total, notes } =
    invoiceData;

  const formattedSubtotal = Number(subtotal) || 0;
  const formattedDiscount = Number(discount) || 0;
  const formattedTax = Number(tax) || 0;
  const formattedTotal = Number(total) || 0;

  const handleDownload = () => {
    const element = invoiceRef.current;

    // Add padding to the content of the invoice before creating the canvas
    const paddingValue = 10; // 10px padding
    element.style.padding = `${paddingValue}px`;

    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const imgWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add the image to the first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages as needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`invoice_${new Date().toISOString()}.pdf`);

      // Restore the original padding after generating the PDF
      element.style.padding = "";
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="invoice-modal-title"
      aria-describedby="invoice-modal-description"
    >
      <Box sx={style}>
        {/* Invoice Content */}
        <Box ref={invoiceRef} sx={{ padding: "10px" }}> {/* Padding of 10px */}
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
              <Typography>
                Date Of Issue: {new Date(date).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Items */}
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>SNO</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>DESCRIPTION</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>QTY</Typography>
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
              <Grid item xs={1}>
                <Typography>{index + 1}</Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography>{item.description}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{item.quantity}</Typography>
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
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>TOTAL:</Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>₹{formattedTotal.toFixed(2)}</Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold", ml: 4 }}>Signature: ________________</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* Notes */}
          <Typography variant="subtitle2" sx={{ fontWeight: "bold", mt: 2 }}>Notes</Typography>
          <Typography>{notes}</Typography>
        </Box>

        {/* Print Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownload}
            startIcon={<PrintIcon />}
          >
            Print
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Invoice;
