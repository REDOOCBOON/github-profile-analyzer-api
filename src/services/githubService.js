const axios = require("axios");

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "github-profile-analyzer",
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
};

async function getGithubData(username) {
  const profileRes = await axios.get(
    `https://api.github.com/users/${username}`,
    { headers }
  );

  const repoRes = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    { headers }
  );

  return {
    profile: profileRes.data,
    repos: repoRes.data
  };
}

module.exports = {
  getGithubData
};