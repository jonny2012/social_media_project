import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  Avatar,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useCreatePostMutation } from "../redux/RTKqueries/postQueries";

const CreatePost = ({ open, setOpen }: any) => {
  const userId = localStorage.getItem("userId");
  const [file, setFile] = useState<any>(null);
  const [caption, setCaption] = useState("");
  const [createPost, { data, error, isLoading }] = useCreatePostMutation();

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const handleSubmit = async () => {
    if (!file || !caption) {
      alert("Please upload a file and add a caption.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId || "");
    formData.append("image", file);
    formData.append("description", caption);

    try {
      await createPost(formData);
      setOpen(!open);
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="modal-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ddd",
              pb: 2,
              mb: 2,
            }}
          >
            <Typography variant="h6" id="modal-title">
              Create new post
            </Typography>
            <Button
              variant="contained"
              size="small"
              type="submit"
              onClick={handleSubmit}
            >
              Upload
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "1px dashed #ccc",
                borderRadius: 2,
                minWidth: 400,
                minHeight: 400,
                mr: 2,
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                "&:hover": { backgroundColor: "#f9f9f9" },
              }}
            >
              {file ? (
                <Typography variant="body2" color="textSecondary">
                  uploaded successfully!
                </Typography>
              ) : (
                <>
                  <CloudUploadIcon sx={{ fontSize: 48, color: "#ccc" }} />
                  <Typography variant="body2" color="textSecondary">
                    Click to upload
                  </Typography>
                </>
              )}

              <input
                type="file"
                style={{
                  opacity: 0,
                  position: "absolute",
                  cursor: "pointer",
                  width: "400px",
                  height: "400px",
                }}
                onChange={handleFileChange}
              />
            </Box>

            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <TextField
                placeholder="Write  description..."
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CreatePost;
