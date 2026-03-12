import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import { Button, Chip, Paper, Stack } from "@mui/material";

export default function Toolbar({ 
  selectMode,
  setSelectMode,
  deleteSelected,
  importImages,
  syncEnabled,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        mt: { xs: 0.6, md: 0.8 },
        p: { xs: 1.4, sm: 1.8, md: 2.4 },
        borderRadius: { xs: 4, md: 5 },
        border: "1px solid rgba(57,40,35,0.08)",
        background: "rgba(255,255,255,0.9)",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "stretch", md: "center" }}
        justifyContent="space-between"
        gap={1.6}
      >
        <Chip
          label={syncEnabled ? "Dong bo online" : "Che do cuc bo"}
          color={syncEnabled ? "success" : "default"}
          variant={syncEnabled ? "filled" : "outlined"}
          sx={{
            alignSelf: { xs: "flex-start", md: "center" },
            fontWeight: 600,
          }}
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={1}
          justifyContent="flex-end"
          sx={{
            width: "100%",
            ".MuiButton-root": {
              minHeight: { xs: 42, md: 38 },
            },
          }}
        >
          <Button
            variant={selectMode ? "contained" : "outlined"}
            color="secondary"
            startIcon={<TaskAltRoundedIcon />}
            onClick={() => setSelectMode(!selectMode)}
            fullWidth
          >
            {selectMode ? "Huỷ chọn" : "Chọn ảnh"}
          </Button>

          {selectMode && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteSweepRoundedIcon />}
              onClick={deleteSelected}
              fullWidth
            >
              Xoá đã chọn
            </Button>
          )}

          <Button
            component="label"
            variant="contained"
            color="primary"
            startIcon={<AddPhotoAlternateRoundedIcon />}
            fullWidth
          >
            Thêm ảnh
            <input
              hidden
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => importImages(e.target.files)}
            />
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}