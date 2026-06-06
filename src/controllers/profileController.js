const db = require("../config/db");
const { getGithubData } = require("../services/githubService");
const analyzeProfile = require("../utils/analyzer");

async function analyze(req, res) {
  try {
    const username = req.params.username;

    const data = await getGithubData(username);

    const result = analyzeProfile(
      data.profile,
      data.repos
    );

    await db.query(
      `
      INSERT INTO profiles (
        username,
        name,
        followers,
        following,
        public_repos,
        total_stars,
        total_forks,
        account_age,
        most_used_language,
        top_repo,
        profile_score
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      followers = VALUES(followers),
      following = VALUES(following),
      public_repos = VALUES(public_repos),
      total_stars = VALUES(total_stars),
      total_forks = VALUES(total_forks),
      account_age = VALUES(account_age),
      most_used_language = VALUES(most_used_language),
      top_repo = VALUES(top_repo),
      profile_score = VALUES(profile_score)
      `,
      [
        result.username,
        result.name,
        result.followers,
        result.following,
        result.public_repos,
        result.total_stars,
        result.total_forks,
        result.account_age,
        result.most_used_language,
        result.top_repo,
        result.profile_score
      ]
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function getAll(req, res) {
  try {
    const [rows] = await db.query(
      "SELECT * FROM profiles ORDER BY analyzed_at DESC"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function getOne(req, res) {
  try {
    const username = req.params.username;

    const [rows] = await db.query(
      "SELECT * FROM profiles WHERE username = ?",
      [username]
    );

    if (!rows.length) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function getStats(req, res) {
  try {
    const [rows] = await db.query(`
      SELECT
      COUNT(*) as total_profiles,
      AVG(followers) as avg_followers,
      AVG(public_repos) as avg_repos,
      MAX(profile_score) as highest_score
      FROM profiles
    `);

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  analyze,
  getAll,
  getOne,
  getStats
};