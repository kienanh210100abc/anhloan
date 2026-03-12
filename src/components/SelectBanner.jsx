import { Alert, Button } from "@mui/material";

export default function SelectBanner({ photos, visible, setSelectMode }) {
  if (!visible) return null;

  const count = photos.filter((p) => p.selected).length;

  return (
    <Alert
      severity="info"
      sx={{
        mt: { xs: 1.3, md: 2 },
        borderRadius: { xs: 3, md: 4 },
        alignItems: "center",
        fontSize: { xs: "0.92rem", md: "0.97rem" },
      }}
      action={
        <Button color="inherit" size="small" onClick={() => setSelectMode(false)}>
          Huỷ
        </Button>
      }
    >
      Đang ở chế độ chọn - <strong>{count} ảnh được chọn</strong>
    </Alert>
  );
}