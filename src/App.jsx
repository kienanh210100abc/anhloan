import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import Gallery from "./components/Gallery";
import Lightbox from "./components/Lightbox";
import Toast from "./components/Toast";
import SelectBanner from "./components/SelectBanner";
import "./styles.css";

const PHOTO_STORAGE_KEY = "photo-album:photos:v1";

const loadStoredPhotos = () => {
  try {
    const raw = localStorage.getItem(PHOTO_STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item) => item && typeof item.src === "string")
      .map((item) => ({
        id: item.id ?? Date.now() + Math.random(),
        src: item.src,
        selected: Boolean(item.selected),
      }));
  } catch {
    return [];
  }
};

function App() {
  const [photos, setPhotos] = useState(loadStoredPhotos);
  const [selectMode, setSelectMode] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(PHOTO_STORAGE_KEY, JSON.stringify(photos));
    } catch {
      // Ignore storage errors (e.g., quota exceeded) so app remains usable.
    }
  }, [photos]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          primary: {
            main: "#b75d4a",
          },
          secondary: {
            main: "#4f6f63",
          },
          background: {
            default: "#fff8f3",
            paper: "#ffffff",
          },
          text: {
            primary: "#392823",
            secondary: "#7b5f58",
          },
        },
        shape: {
          borderRadius: 18,
        },
        typography: {
          fontFamily: '"Plus Jakarta Sans", "Segoe UI", sans-serif',
          h1: {
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 600,
          },
          h2: {
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 600,
          },
        },
      }),
    [],
  );

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const importImages = (files) => {
    const fileArr = Array.from(files);

    fileArr.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPhotos((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            src: e.target.result,
            selected: false,
          },
        ]);
      };

      reader.readAsDataURL(file);
    });

    showToast(`Đã thêm ${fileArr.length} ảnh ✨`);
  };

  const toggleSelect = (id) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p)),
    );
  };

  const deleteSingle = (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    showToast("Đã xoá ảnh");
  };

  const deleteSelected = () => {
    const selected = photos.filter((p) => p.selected);

    if (!selected.length) {
      showToast("Chưa chọn ảnh nào!");
      return;
    }

    setPhotos((prev) => prev.filter((p) => !p.selected));
    showToast(`Đã xoá ${selected.length} ảnh`);
    setSelectMode(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box className="app-shell">
        <Container
          maxWidth="lg"
          sx={{
            pb: { xs: 4.5, md: 7 },
            px: { xs: 1.5, sm: 2.5, md: 3 },
          }}
        >
          <Header />

          <Toolbar
            photos={photos}
            selectMode={selectMode}
            setSelectMode={setSelectMode}
            deleteSelected={deleteSelected}
            importImages={importImages}
          />

          <SelectBanner
            photos={photos}
            visible={selectMode}
            setSelectMode={setSelectMode}
          />

          <Gallery
            photos={photos}
            selectMode={selectMode}
            toggleSelect={toggleSelect}
            deleteSingle={deleteSingle}
            setLightboxIndex={setLightboxIndex}
          />

          <Lightbox
            photos={photos}
            index={lightboxIndex}
            setIndex={setLightboxIndex}
          />

          <Toast message={toast} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
