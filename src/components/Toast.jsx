import { Alert, Snackbar } from "@mui/material";

export default function Toast({ message }) {
  return (
    <Snackbar
      open={Boolean(message)}
      autoHideDuration={2400}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{
        px: 1,
        pb: { xs: 0.5, md: 0 },
        width: { xs: "100%", sm: "auto" },
      }}
    >
      <Alert
        severity="success"
        variant="filled"
        sx={{ width: { xs: "100%", sm: "auto" } }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}