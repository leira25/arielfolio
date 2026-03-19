const BASE_ENDPOINT =
  "https://api.counterapi.dev/v2/ariel-yandans-team-3356/first-counter-3356";

function getMode(req) {
  const mode = String(req.query?.mode || "up").toLowerCase();
  if (mode === "get") return "get";
  if (mode === "up") return "up";
  if (mode === "stats") return "stats";
  return "up";
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
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const text = await response.text();
    res.status(response.status);

    try {
      res.json(JSON.parse(text));
    } catch {
      res.send(text);
    }
  } catch (error) {
    res.status(502).json({
      error: "Failed to reach CounterAPI.",
    });
  }
};

