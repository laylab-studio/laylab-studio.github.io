export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.github.com/repos/laylab-studio/PredOverlay/contents/assets/data/changelogs.json",
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3.raw",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const changelog = await response.json();
    res.status(200).json(changelog);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Impossible de charger le changelog" });
  }
}
