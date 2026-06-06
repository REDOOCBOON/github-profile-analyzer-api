const axios = require("axios");

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "github-profile-analyzer"
};

async function getGithubData(username) {
  try {
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
  } catch (error) {
    console.log("GitHub Error:");
    console.log(error.response?.status);
    console.log(error.response?.data);

    throw error;
  }
}

module.exports = {
  getGithubData
};