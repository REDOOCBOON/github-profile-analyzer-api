# GitHub Profile Analyzer API

## Overview

GitHub Profile Analyzer API is a backend service built using Node.js, Express.js, MySQL, and the GitHub Public API.

The application fetches public GitHub profile information, analyzes repository data, generates useful insights, stores the analysis in a MySQL database, and provides REST APIs to access the stored information.

---

## Features

### Core Features

* Fetch GitHub profile data using username
* Fetch repository information using GitHub Public API
* Store analyzed profile data in MySQL
* Retrieve all analyzed profiles
* Retrieve a specific analyzed profile

### Additional Features

* Profile score calculation
* Most used programming language detection
* Top repository identification
* Reanalyze existing profiles
* Profile statistics endpoint
* Automatic profile update using MySQL upsert queries

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* GitHub Public API

---

## Project Structure

```text
github-profile-analyzer/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── profileController.js
│   │
│   ├── routes/
│   │   └── profileRoutes.js
│   │
│   ├── services/
│   │   └── githubService.js
│   │
│   ├── utils/
│   │   └── analyzer.js
│   │
│   └── app.js
│
├── createTable.js
├── checkTable.js
├── server.js
├── .env
├── package.json
└── README.md
```

---

## Database Schema

```sql
CREATE TABLE profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    followers INT DEFAULT 0,
    following INT DEFAULT 0,
    public_repos INT DEFAULT 0,
    total_stars INT DEFAULT 0,
    total_forks INT DEFAULT 0,
    account_age INT DEFAULT 0,
    most_used_language VARCHAR(255),
    top_repo VARCHAR(255),
    profile_score INT DEFAULT 0,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd github-profile-analyzer
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

### Create Database Table

```bash
node createTable.js
```

### Start Server

```bash
npm run dev
```

Server runs on:

```text
http://localhost:5000
```

---

## API Endpoints

### Analyze GitHub Profile

```http
POST /api/profiles/analyze/:username
```

Example:

```http
POST /api/profiles/analyze/octocat
```

---

### Get All Profiles

```http
GET /api/profiles
```

---

### Get Single Profile

```http
GET /api/profiles/:username
```

Example:

```http
GET /api/profiles/octocat
```

---

### Reanalyze Existing Profile

```http
PUT /api/profiles/reanalyze/:username
```

Example:

```http
PUT /api/profiles/reanalyze/octocat
```

---

### Get Statistics

```http
GET /api/profiles/stats
```

---

## Sample Response

```json
{
  "username": "octocat",
  "name": "The Octocat",
  "followers": 22862,
  "following": 9,
  "public_repos": 8,
  "total_stars": 21492,
  "total_forks": 165063,
  "account_age": 15,
  "most_used_language": "Ruby",
  "top_repo": "Spoon-Knife",
  "profile_score": 1000
}
```

---

## Insights Stored

* Username
* Name
* Followers
* Following
* Public Repository Count
* Total Stars
* Total Forks
* Account Age
* Most Used Language
* Top Repository
* Profile Score
* Analysis Timestamp

---

## Future Improvements

* Pagination support
* GitHub contribution analytics
* Repository language distribution endpoint
* Caching layer for repeated requests
* API documentation using Swagger

---

## Author

Ujjwal Thakur
