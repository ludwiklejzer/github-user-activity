#!/bin/env node

import { createInterface } from "readline/promises";

async function fetchActivities(user) {
  const url = `https://api.github.com/users/${user}/events`;
  const auth = process.env.TOKEN
    ? { Authorization: `Bearer ${process.env.TOKEN}` }
    : {};
  const response = await fetch(url, { headers: auth });

  if (!response.ok) {
    if (response.status === 404) throw new Error(`User not found!`);
    else if (response.status === 401)
      throw new Error(`Invalid authentication!`);
    else throw new Error(`Failed fetching data: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data))
    throw new Error("Unexpected data format: expecting an array.");

  return data;
}

function displayActivity(events) {
  events.forEach((event) => {
    switch (event.type) {
      case "PushEvent":
        console.log(`Pushed to ${event.repo.name}`);
        break;
      case "IssuesEvent":
        console.log(`Worked on an issue in ${event.repo.name}`);
        break;
      case "WatchEvent":
        console.log(`Started watching ${event.repo.name}`);
        break;
      case "ForkEvent":
        console.log(`Forked ${event.repo.name}`);
        break;
      case "CreateEvent":
        console.log(`Created ${event.repo.name}`);
        break;
      case "DeleteEvent":
        console.log(`Deleted ${event.repo.name}`);
        break;
      case "GollumEvent":
        console.log(`Created ${event.repo.name}`);
        break;
      case "IssueCommentEvent":
        console.log(`Commented on an Issue in ${event.repo.name}`);
        break;
      case "MemberEvent":
        console.log(`Joined ${event.repo.name}`);
        break;
      case "PublicEvent":
        console.log(`Transformed ${event.repo.name} to a Public repository`);
        break;
      case "PullRequestEvent":
        console.log(`Worked on Event in ${event.repo.name}`);
        break;
      case "PullRequestReviewEvent":
        console.log(`Reviewed an Event in ${event.repo.name}`);
        break;
      case "PullRequestReviewCommentEvent":
        console.log(`Commented on a pull request in ${event.repo.name}`);
        break;
      case "ReleaseEvent":
        console.log(`Released ${event.repo.name}`);
        break;
      default:
        break;
    }
  });
}

async function getUsername() {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  let username;

  try {
    username = await rl.question("Type the username: ");
    if (!username.trim()) throw new Error("Username cannot be empty.");
    return username.trim();
  } catch (error) {
    throw error;
  } finally {
    rl.close();
  }
}

getUsername()
  .then((username) => fetchActivities(username))
  .then((activities) => displayActivity(activities))
  .catch((error) => console.error(error.message));
