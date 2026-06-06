function analyzeProfile(profile, repos) {
  let totalStars = 0;
  let totalForks = 0;

  const languages = {};

  let topRepo = "";
  let maxStars = -1;

  repos.forEach(repo => {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;

    if (repo.language) {
      languages[repo.language] =
        (languages[repo.language] || 0) + 1;
    }

    if (repo.stargazers_count > maxStars) {
      maxStars = repo.stargazers_count;
      topRepo = repo.name;
    }
  });

  let mostUsedLanguage = "";

  Object.keys(languages).forEach(lang => {
    if (
      !mostUsedLanguage ||
      languages[lang] > languages[mostUsedLanguage]
    ) {
      mostUsedLanguage = lang;
    }
  });

  const accountAge =
    new Date().getFullYear() -
    new Date(profile.created_at).getFullYear();

  const profileScore =
    profile.followers * 2 +
    profile.public_repos * 3 +
    totalStars * 4 +
    accountAge;

  return {
    username: profile.login,
    name: profile.name,
    followers: profile.followers,
    following: profile.following,
    public_repos: profile.public_repos,
    total_stars: totalStars,
    total_forks: totalForks,
    account_age: accountAge,
    most_used_language: mostUsedLanguage,
    top_repo: topRepo,
    profile_score: Math.min(profileScore, 1000)
  };
}

module.exports = analyzeProfile;