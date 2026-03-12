import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { Box, Divider, Paper, Typography } from "@mui/material";

export default function Header() {
  return (
    <Paper
      elevation={0}
      sx={{
        mt: { xs: 1.5, md: 4 },
        mb: { xs: 2.2, md: 3 },
        px: { xs: 2.2, sm: 3.4, md: 6 },
        py: { xs: 3.2, sm: 4, md: 5 },
        textAlign: "center",
        borderRadius: { xs: 4, md: 6 },
        border: "1px solid rgba(183,93,74,0.16)",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,240,233,0.85) 55%, rgba(232,245,238,0.65) 100%)",
        backdropFilter: "blur(3px)",
      }}
    >
      <Typography
        variant="overline"
        sx={{
          letterSpacing: { xs: "0.18em", sm: "0.24em", md: "0.28em" },
          color: "primary.main",
          fontWeight: 700,
          fontSize: { xs: "0.63rem", sm: "0.7rem" },
        }}
      >
        Album của xinh gái
      </Typography>

      <Typography
        variant="h1"
        sx={{
          mt: { xs: 1, md: 1.4 },
          px: { xs: 0.2, sm: 0 },
          fontSize: { xs: "1.7rem", sm: "2.3rem", md: "3.35rem" },
          lineHeight: { xs: 1.15, md: 1.1 },
          wordBreak: "break-word",
        }}
      >
        Nguyễn Thị Anh Loan
      </Typography>
 

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, md: 1.6 },
          mt: { xs: 2.1, md: 2.8 },
        }}
      >
        <Divider sx={{ flex: 1 }} />
        <AutoAwesomeRoundedIcon color="primary" fontSize="small" />
        <Divider sx={{ flex: 1 }} />
      </Box>
    </Paper>
  );
}