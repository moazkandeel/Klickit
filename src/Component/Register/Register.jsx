import React, { useState, forwardRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bg from "../../Assets/signin.4558f412297d57b72af16a3ef4091726.svg";
import bgimg from "../../Assets/backimg.jpg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useFormik } from 'formik';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "94%", sm: "85%", lg: "75%" },
  height: { xs: "auto", lg: "70%" },
  bgcolor: "background.paper",
  boxShadow: 24,
};

const center = {
  position: "relative",
  top: { xs: 0, lg: "50%" },
  left: { xs: 0, lg: "30%" },
  textAlign: { xs: "center", lg: "left" },
};

// التحقق من صحة البيانات باستخدام Yup
const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address. Example: user@example.com').required('Required'),
  password: Yup.string().min(6, 'Password should be at least 6 characters').required('Required'),
  confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
});

export default function Register() {
  const [open, setOpen] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmpassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // الاتصال بالـ backend لتسجيل الحساب
      // يمكنك تعديل الرابط هنا ليتناسب مع API التسجيل الخاص بك
      // axios.post("/api/register", { ...values })
      //   .then(response => {
      //     if (response.data.success) {
      //       localStorage.setItem('user', JSON.stringify(values));
      //       setOpen(true);
      //       navigate("/login");
      //     } else {
      //       console.error('Registration failed');
      //     }
      //   })
      //   .catch(error => {
      //     console.error("Error registering:", error);
      //   });

      // حفظ البيانات في localStorage بعد التسجيل بنجاح
      localStorage.setItem('user', JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }));

      setOpen(true);
      navigate("/login");
    },
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          TransitionComponent={TransitionLeft}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            Registration successful!
          </Alert>
        </Snackbar>
        <div
          style={{
            backgroundImage: `url(${bgimg})`,
            backgroundSize: "cover",
            minHeight: "100vh",
            color: "#f5f5f5",
          }}
        >
          <Box sx={boxstyle}>
            <Grid container>
              <Grid item xs={12} sm={12} lg={6} sx={{ display: { xs: "none", lg: "block" } }}>
                <Box
                  style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "cover",
                    marginTop: "40px",
                    marginLeft: "15px",
                    marginRight: "15px",
                    height: "63vh",
                    color: "#f5f5f5",
                  }}
                ></Box>
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <Box
                  sx={{
                    backgroundSize: "cover",
                    height: { xs: "auto", lg: "70vh" },
                    minHeight: { xs: 0, lg: "500px" },
                    backgroundColor: "#3b33d5",
                    pb: { xs: 4, lg: 0 },
                  }}
                >
                  <Container>
                    <Box height={35} />
                    <Box sx={center}>
                      <Avatar
                        sx={{ ml: { xs: 0, lg: "85px" }, mb: "4px", bgcolor: "#ffffff" }}
                      >
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h4">
                        Create Account
                      </Typography>
                    </Box>
                    <Box
                      component="form"
                      noValidate
                      onSubmit={formik.handleSubmit}
                      sx={{ mt: 2 }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12} sx={{ ml: { xs: "1em", sm: "3em" }, mr: { xs: "1em", sm: "3em" } }}>
                          <TextField
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ ml: { xs: "1em", sm: "3em" }, mr: { xs: "1em", sm: "3em" } }}>
                          <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email ? (formik.errors.email || "Example: user@example.com") : ""}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ ml: { xs: "1em", sm: "3em" }, mr: { xs: "1em", sm: "3em" } }}>
                          <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ ml: { xs: "1em", sm: "3em" }, mr: { xs: "1em", sm: "3em" } }}>
                          <TextField
                            required
                            fullWidth
                            name="confirmpassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmpassword"
                            autoComplete="new-password"
                            value={formik.values.confirmpassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
                            helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ ml: { xs: "1em", sm: "5em" }, mr: { xs: "1em", sm: "5em" } }}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                              mt: "15px",
                              mr: "20px",
                              borderRadius: 28,
                              color: "#ffffff",
                              minWidth: "170px",
                              backgroundColor: "#FF9A01",
                            }}
                          >
                            Register
                          </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: { xs: "1em", sm: "3em" }, mr: { xs: "1em", sm: "3em" } }}>
                          <Stack direction="row" spacing={2}>
                            <Typography
                              variant="body1"
                              component="span"
                              style={{ marginTop: "10px" }}
                            >
                              Already have an Account?{" "}
                              <span
                                style={{ color: "#beb4fb", cursor: "pointer" }}
                                onClick={() => {
                                  navigate("/login");
                                }}
                              >
                                Sign In
                              </span>
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                  </Container>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
      </ThemeProvider>
    </>
  );
}
