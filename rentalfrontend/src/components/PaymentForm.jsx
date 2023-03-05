import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CheckoutContext } from "../context/CheckoutContext";

export default function PaymentForm() {
const {paymentMethod, handlePaymentMethodChange} = React.useContext(CheckoutContext);
/* console.log(handlePaymentMethodChange); */

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="payment-method-label">Payment Method</InputLabel>
            <Select
              labelId="payment-method-label"
              id="payment-method"
              value={paymentMethod}
              label="Payment Method"
              onChange={handlePaymentMethodChange}
            >
              <MenuItem value="cash_on_delivery">Cash On Delivery</MenuItem>
              <MenuItem value="esewa">Esewa</MenuItem>
              <MenuItem value="khalti">Khalti</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}