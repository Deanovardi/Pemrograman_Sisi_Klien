import React, { useState } from "react";
import AuthLayout from "../components/Layouts/AuthLayout";
import FormSignUp from "../components/Fragments/FormSignUp";
import AppSnackbar from "../components/Elements/AppSnackbar";

function signUp() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSignUp = async (name, email, password) => {
    try {
      const response = await fetch(
        "https://jwt-auth-eight-neon.vercel.app/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Tampilkan error message dari API
        setSnackbar({
          open: true,
          message: data.message || "Email sudah pernah digunakan sebelumnya",
          severity: "error",
        });
        return;
      }

      // Success
      setSnackbar({
        open: true,
        message: "Registrasi berhasil! Silakan login.",
        severity: "success",
      });

      // Redirect ke login setelah berhasil (opsional)
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Terjadi kesalahan jaringan",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <AuthLayout>
      <FormSignUp onSubmit={handleSignUp} />
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </AuthLayout>
  );
}

export default signUp;
