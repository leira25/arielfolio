const BASE_ENDPOINT =
  "https://api.counterapi.dev/v2/ariel-yandans-team-3356/first-counter-3356";

const https = require("https");

function getMode(req) {
  const mode = String(req.query?.mode || "up").toLowerCase();
  if (mode === "get") return "get";
  if (mode === "up") return "up";
  if (mode === "stats") return "stats";
  return "up";
}

function httpGetJson(url, apiKey) {
  return new Promise((resolve, reject) => {
    const request = https.request(
      url,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
      (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          resolve({
            statusCode: response.statusCode || 500,
            headers: response.headers,
            body,
          });
        });
      }
    );

    request.on("error", reject);
    request.end();
  });
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  const apiKey = process.env.COUNTERAPI_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: "Missing COUNTERAPI_KEY environment variable.",
    });
    return;
  }

  const mode = getMode(req);
  const url =
    mode === "up"
      ? `${BASE_ENDPOINT}/up`
      : mode === "stats"
        ? `${BASE_ENDPOINT}/stats`
        : BASE_ENDPOINT;

  try {
    const response = await httpGetJson(url, apiKey);
    res.status(response.statusCode);

    try {
      res.json(JSON.parse(response.body));
    } catch {
      res.send(response.body);
    }
  } catch (error) {
    res.status(502).json({
      error: "Failed to reach CounterAPI.",
    });
  }
};
