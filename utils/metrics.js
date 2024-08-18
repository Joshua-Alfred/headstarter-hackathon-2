const express = require("express");
const client = require("prom-client");

const app = express();

const responseTimeHistogram = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "REST API response time in seconds",
  labelNames: ["method", "route", "status_code"],
});

const databaseResponseTimeHistogram = new client.Histogram({
  name: "db_response_time_duration_seconds",
  help: "Database response time in seconds",
  labelNames: ["operation", "success"],
});

function startMetricsServer() {
  const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics();

  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    return res.send(await client.register.metrics());
  });

  app.listen(9100, () => {
    console.log("Metrics server started at http://localhost:9100");
  });
}

module.exports = {
  startMetricsServer,
  responseTimeHistogram,
  databaseResponseTimeHistogram,
};
