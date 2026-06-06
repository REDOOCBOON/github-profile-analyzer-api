const axios = require("axios");

async function getGithubData(username) {
  const profileRes = await axios.get(
    `https://api.github.com/users/${username}`
  );

  const repoRes = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=100`
  );

  return {
    profile: profileRes.data,
    repos: repoRes.data
  };
}

module.exports = {
  getGithubData
};