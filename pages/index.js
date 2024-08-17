import { useState } from "react";
import {
  Button,
  Container,
  Typography,
  TextField,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import DOMPurify from "dompurify";

export default function ScraperApp() {
  const [userUrl, setUserUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [htmlData, setHtmlData] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    if (!userUrl) {
      alert("Please enter a URL");
      return;
    }

    setLoading(true);
    setHtmlData(null);
    setError(null);

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
        const sanitizedHtml = DOMPurify.sanitize(result.html);
        setHtmlData(sanitizedHtml);
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
      <Typography variant="h4" gutterBottom>
        Web Scraper Tool
      </Typography>
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
        color="primary"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Scrape"}
      </Button>
      {error && (
        <Typography color="error" style={{ marginTop: "20px" }}>
          {error}
        </Typography>
      )}
      {htmlData && (
        <Card style={{ marginTop: "20px" }}>
          <CardContent>
            <Typography variant="h6">Scraped Data</Typography>
            <div dangerouslySetInnerHTML={{ __html: htmlData }} />
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
