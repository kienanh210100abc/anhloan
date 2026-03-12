import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Box, Card, CardMedia, Checkbox, IconButton } from "@mui/material";

export default function PhotoItem({
  photo,
  index,
  selectMode,
  toggleSelect,
  deleteSingle,
  setLightboxIndex,
}) {
  return (
    <Box className="gallery-item">
      <Card
        className="photo-card"
        onClick={() => {
          if (selectMode) {
            toggleSelect(photo.id);
            return;
          }

          setLightboxIndex(index);
        }}
        sx={{
          position: "relative",
          borderRadius: { xs: 1, md: 1 },
          overflow: "hidden",
          cursor: "pointer",
          border: photo.selected
            ? "2px solid rgba(183,93,74,0.9)"
            : "1px solid rgba(0,0,0,0.06)",
          boxShadow: photo.selected
            ? "0 16px 34px rgba(183,93,74,0.28)"
            : "0 10px 24px rgba(0,0,0,0.12)",
          transform: photo.selected ? "translateY(-2px)" : "none",
          transition: "all .25s ease",
          "&:hover": {
            transform: "translateY(-5px)",
          },
          "&:hover .photo-overlay": {
            opacity: 1,
          },
          "@media (hover: none)": {
            "& .photo-overlay": {
              opacity: 1,
            },
          },
        }}
      >
        {selectMode && (
          <Checkbox
            checked={photo.selected}
            checkedIcon={<CheckCircleRoundedIcon />}
            icon={<RadioButtonUncheckedRoundedIcon />}
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              toggleSelect(photo.id);
            }}
            sx={{
              position: "absolute",
              top: { xs: 6, md: 8 },
              left: { xs: 6, md: 8 },
              zIndex: 3,
              color: "white",
              bgcolor: "rgba(0,0,0,0.35)",
              borderRadius: 8,
              "&.Mui-checked": {
                color: "#fff",
                bgcolor: "primary.main",
              },
            }}
          />
        )}

        <CardMedia component="img" image={photo.src} alt="Photo" sx={{ width: "100%" }} />

        <Box
          className="photo-overlay"
          sx={{
            position: "absolute",
            inset: 0,
            opacity: photo.selected ? 1 : 0,
            transition: "opacity .22s ease",
            background:
              "linear-gradient(to top, rgba(21,16,14,0.75) 0%, rgba(21,16,14,0.15) 60%, rgba(21,16,14,0) 100%)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            p: { xs: 0.8, md: 1.1 },
          }}
        >
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(index);
            }}
            sx={{
              bgcolor: "rgba(255,255,255,0.94)",
              "&:hover": { bgcolor: "#fff" },
            }}
          >
            <VisibilityRoundedIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              deleteSingle(photo.id);
            }}
            sx={{
              bgcolor: "rgba(255,255,255,0.94)",
              color: "error.main",
              "&:hover": { bgcolor: "#fff" },
            }}
          >
            <DeleteOutlineRoundedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
}