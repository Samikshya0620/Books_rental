import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import config from "../config.json";
import { useNavigate } from "react-router-dom";
import http from "../services/httpService";

const apiEndpoint = config.apiUrl + "bookowner";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.primary" align="center" {...props}>
      {"Copyright Â© BookRental"}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Rent() {
  const { authTokens } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let firstname = data.get("firstName");
    let lastname = data.get("lastName");
    let email = data.get("email");
    let address = data.get("address");
    let contactnumber = data.get("phone");
    let bookname = data.get("book");
    try {
      let response = await http.post(
        apiEndpoint,
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          address: address,
          contactnumber: contactnumber,
          bookname: bookname,
        },
        {
          headers: {
            Authorization: "Bearer " + authTokens.access_token,
          },
        }
      );
      toast.success("Thank you,We will contact you soon");
      await sleep(2000);
      navigate("/home");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <MenuBookIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Rent it
          </Typography>
          <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="book"
                  label="Book Name"
                  name="book"
                  autoComplete="Name of book"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="your address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Contact num"
                  name="phone"
                  type="tel"
                  inputProps={{ pattern: "[0-9]{10}" }}
                  autoComplete="contact number"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
