import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { CheckoutContext, CheckoutProvider } from "../context/CheckoutContext";
import { CartProvider } from "../context/cartContext";
import { CartContext } from "../context/cartContext";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import http from "../services/httpService";
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;

    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

export default function Checkout() {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        await getItems();
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, [loading]);
  const { user, authTokens } = React.useContext(AuthContext);
  const { items, getItems } = React.useContext(CartContext);
  const { handlePlaceOrder, reviewData } = React.useContext(CheckoutContext);
  /*  const { firstName, lastName, address, city, state } = React.useContext(CheckoutContext); */
  const [activeStep, setActiveStep] = React.useState(0);
  const [isPlacingOrder, setIsPlacingOrder] = React.useState(false);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePlaceOrderinCheckout = () => {
    handleNext();
    if (activeStep === steps.length - 1) {
      console.log("Order Placed");
      handlePlaceOrder();
      /*     console.log(firstName, lastName, address, city, state); */
      /*     try {
      const response = await http.post("",  {
        headers: {
          Authorization: "Bearer " + authTokens.access_token,
        },
        data: {},
      })
      if (response.ok) {
        // Order placed successfully
        console.log("Order placed successfully!");
      } else {
        // Handle error response from server
        console.error("Failed to place order: ", response.statusText);
      }
    } catch (error) {
      toast.error("Failed to place order: ", error.message);
      
    }
    finally {
      setIsPlacingOrder(false);
    } */
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <CheckoutProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: "relative",
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        ></AppBar>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is ... books will be available soon
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handlePlaceOrderinCheckout}
                    sx={{ mt: 3, ml: 1 }}
                    disabled={isPlacingOrder}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
          <Copyright />
        </Container>
      </ThemeProvider>
    </CheckoutProvider>
  );
}
