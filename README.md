# GitHub User Activity CLI

[roadmap.sh](https://roadmap.sh/projects/github-user-activity) project

## Overview

CLI tool that fetches and displays recent activity for a given GitHub user.

## Requirements

- Node.js
- A GitHub Personal Access Token (PAT) is highly recommended to avoid GitHub API rate limits.

## Setup

1.  Install

```bash
npm install -g git+https://github.com/ludwiklejzer/github-user-activity.git
```

2.  Configure Token (Recommended): Set the `TOKEN` environment variable in your terminal or a `.env` file:

```bash
export TOKEN="YOUR_GITHUB_PAT_HERE"
```

## Execution

Run the script using `gh-activity [username]`:

```bash
gh-activity ludwiklejzer
```

## Uninstall

```bash
npm uninstall -g gh-activity
```

## License

This project is licensed under the MIT License.
