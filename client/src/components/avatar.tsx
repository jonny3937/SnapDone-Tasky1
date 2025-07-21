import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
interface AvatarUploadProps {
  onUpload: (url: string) => void;
  currentAvatar?: string;
}

const AvatarUpload = ({ onUpload, currentAvatar }: AvatarUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatar || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append("file", image);

    const uploadPreset = "ml_maish";
    const cloudName = "dm7gq3tnh";
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      if (!data.secure_url)
        throw new Error(data.error?.message || "Upload failed");
      return data.secure_url;
    } catch (err: any) {
      console.error("Upload error:", err);
      throw err;
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      setLoading(true);
      setError(null);
      try {
        const imageUrl = await uploadImage(file);
        onUpload(imageUrl);
      } catch (err: any) {
        setError(err.message || "Upload failed");
        setPreviewUrl(currentAvatar || null);
      } finally {
        setLoading(false);
      }
    }
  };



  const handleRemoveAvatar = () => {
    setPreviewUrl(null);
    onUpload("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="subtitle2" sx={{ mb: 2, color: "#eee" }}>
        Profile Picture
      </Typography>
      
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={previewUrl || ""}
            sx={{
              width: 100,
              height: 100,
              border: "3px solid #fff",
              boxShadow: 2,
              cursor: "pointer",
              "&:hover": {
                opacity: 0.8,
              },
            }}
            onClick={() => !previewUrl && fileInputRef.current?.click()}
          >
            {!previewUrl && (
              <Typography
                variant="h3"
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                +
              </Typography>
            )}
          </Avatar>
          {previewUrl && (
            <IconButton
              onClick={handleRemoveAvatar}
              sx={{
                position: "absolute",
                top: -8,
                right: -8,
                bgcolor: "error.main",
                color: "white",
                "&:hover": { bgcolor: "error.dark" },
                width: 32,
                height: 32,
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </Box>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        
        {loading && (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, mt: 2 }}>
            <CircularProgress size={24} sx={{ color: "#5CB338" }} />
            <Typography variant="body2" sx={{ color: "#eee" }}>
              Uploading...
            </Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ width: "100%", maxWidth: 300 }}>
            {error}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default AvatarUpload; 