import PhotoItem from "./PhotoItem";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import { Box, Paper, Typography } from "@mui/material";

export default function Gallery({
  photos,
  selectMode,
  toggleSelect,
  deleteSingle,
  setLightboxIndex,
}) {
  if (!photos.length) {
    return (
      <Paper
        elevation={0}
        sx={{
          mt: 2,
          p: { xs: 4, md: 6 },
          borderRadius: 5,
          textAlign: "center",
          border: "1px dashed rgba(183,93,74,0.35)",
          background: "rgba(255,255,255,0.75)",
        }}
      >
        <CollectionsRoundedIcon color="primary" sx={{ fontSize: 44 }} />
        <Typography variant="h5" sx={{ mt: 1.5, mb: 1 }}>
          Chưa có ảnh nào nèee
        </Typography>
        <Typography color="text.secondary">
          Thả vào đây cho anh ngắm với
        </Typography>
      </Paper>
    );
  }

  return (
    <Box
      className={`gallery-masonry ${selectMode ? "select-mode" : ""}`}
      sx={{ mt: { xs: 1.6, md: 2.4 } }}
    >
      {photos.map((photo, index) => (
        <PhotoItem
          key={photo.id}
          photo={photo}
          index={index}
          selectMode={selectMode}
          toggleSelect={toggleSelect}
          deleteSingle={deleteSingle}
          setLightboxIndex={setLightboxIndex}
        />
      ))}
    </Box>
  );
}