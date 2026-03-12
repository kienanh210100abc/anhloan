import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Dialog, IconButton } from "@mui/material";

export default function Lightbox({ photos, index, setIndex }) {
  if (index < 0) return null;

  const photo = photos[index];

  const next = () => {
    setIndex((index + 1) % photos.length);
  };

  const prev = () => {
    setIndex((index - 1 + photos.length) % photos.length);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={index >= 0}
      onClose={() => setIndex(-1)}
      PaperProps={{
        sx: {
          m: { xs: 0.7, sm: 1.2, md: 2.5 },
          bgcolor: "rgba(12,8,8,0.96)",
          borderRadius: { xs: 2.4, md: 4 },
          overflow: "hidden",
          position: "relative",
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={() => setIndex(-1)}
        sx={{
          position: "absolute",
          top: { xs: 8, md: 12 },
          right: { xs: 8, md: 12 },
          zIndex: 4,
          bgcolor: "rgba(255,255,255,0.14)",
          color: "#fff",
        }}
      >
        <CloseRoundedIcon />
      </IconButton>

      {photos.length > 1 && (
        <>
          <IconButton
            onClick={prev}
            sx={{
              position: "absolute",
              top: "50%",
              left: { xs: 6, md: 12 },
              transform: "translateY(-50%)",
              zIndex: 3,
              bgcolor: "rgba(255,255,255,0.14)",
              color: "#fff",
            }}
          >
            <ChevronLeftRoundedIcon />
          </IconButton>

          <IconButton
            onClick={next}
            sx={{
              position: "absolute",
              top: "50%",
              right: { xs: 6, md: 12 },
              transform: "translateY(-50%)",
              zIndex: 3,
              bgcolor: "rgba(255,255,255,0.14)",
              color: "#fff",
            }}
          >
            <ChevronRightRoundedIcon />
          </IconButton>
        </>
      )}

      <Box
        component="img"
        src={photo.src}
        alt="Large preview"
        sx={{
          width: "100%",
          maxHeight: { xs: "74vh", md: "82vh" },
          objectFit: "contain",
          display: "block",
          bgcolor: "#120d0b",
        }}
      />
    </Dialog>
  );
}