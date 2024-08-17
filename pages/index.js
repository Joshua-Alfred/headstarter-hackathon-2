import { useState } from "react";
import {
  Button,
  Container,
  Typography,
  TextField,
  CircularProgress,
  Card,
  Paper,
  Stack,
  Box,
  CardContent,
} from "@mui/material";
import DOMPurify from "dompurify";

export default function ScraperApp() {
  const [userUrl, setUserUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [htmlData, setHtmlData] = useState(null);
  const [showRawData, setShowRawData] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    if (!userUrl) {
      alert("Please enter a URL");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/scraper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userUrl }),
      });

      const result = await response.json();

      if (response.ok) {
        setHtmlData(result.html);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred while scraping the website.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Stack spacing={2} sx={{ width: "80%", mx: "auto" }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
          The Best{" "}
          <Box sx={{ color: "#9563FF" }} component="span">
            Web Scraping
          </Box>{" "}
          Tool
        </Typography>
        <Typography gutterBottom sx={{ textAlign: "center" }}>
          Scrape a whole website of your choice
        </Typography>
        <Paper
          elevation={2}
          sx={{
            p: 5,
            border: "2px solid",
            borderImage:
              "linear-gradient(135deg, orange 0%, red 25%, purple 50%, blue 75%) 1",
          }}
        >
          <Stack>
            <TextField
              label="Enter URL"
              variant="outlined"
              fullWidth
              value={userUrl}
              onChange={(e) => setUserUrl(e.target.value)}
              style={{ marginBottom: "20px" }}
            />
            <Button
              variant="contained"
              onClick={handleClick}
              disabled={loading}
              sx={{
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "#8962dc",
                },
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Scrape"}
            </Button>
          </Stack>
        </Paper>
      </Stack>
      {error && (
        <Typography color="error" style={{ marginTop: "20px" }}>
          {error}
        </Typography>
      )}

      {htmlData && (
        <>
          <Stack
            direction="row"
            alignItems={"flex-end"}
            justifyContent={"space-between"}
          >
            <Typography variant="h6">Scraped Data</Typography>
            <Button
              onClick={() => setShowRawData(!showRawData)}
              variant="outlined"
            >
              View raw html
            </Button>
          </Stack>
          <Card style={{ marginTop: "20px" }}>
            <CardContent>
              {showRawData ? (
                <Typography>{htmlData}</Typography>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(htmlData),
                  }}
                />
              )}
            </CardContent>
          </Card>
        </>
      )}
    </Container>
  );
}
