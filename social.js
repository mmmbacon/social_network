const data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03", "f04"]
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06"]
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"]
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"]
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04"]
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05"]
  }
};

const getName = function(data, id) {
  return data[id].name;
};

const getFollows = function(data, id) {
  return data[id].follows;
};

const doesFollow = function(data, id1, id2) {

  //Iterate through player follows list
  for (const user of data[id1].follows) {
    //If follows list contains player with id2, return true
    if (user === id2) {
      return true;
    }
  }

  return false;
};

const biggestFollower = function(data) {
  //returns the name of the individual who follows the most people.

  let biggest = 0;
  let result = "";

  for (const item of Object.keys(data)) {
    if (data[item].follows.length > biggest) {
      biggest = data[item].follows.length;
      result = data[item].name;
    }
  }

  return result;

};

//returns the name of the most popular (most followed) individual, or an array of users if there are multiple matching records
const mostPopular = function(data) {
  
  let usersWithMostFollowers = [];
  let followsList = [];
  const followersRecord = {};

  //Create a summarized list of all users being followed
  for (const key1 of Object.keys(data)) {
    for (const id of data[key1].follows) {
      followsList.push(id);
    }
  }

  //Iterate through this list and create a new user object that summarizes the amount of follows for each person
  for (const id of followsList) {
    if (!followersRecord[id]) {
      followersRecord[id] = 1;
    } else {
      followersRecord[id] += 1;
    }
  }

  //Compare against each other for the highest follower count
  //First: Compare each user against each other for greatest amount of followers and then record the largest
  let highestFollowerCount = 0;
  for (const key of Object.keys(followersRecord)) {
    if (followersRecord[key] > highestFollowerCount) {
      highestFollowerCount = followersRecord[key];
    }
  }
  //Second: Compare against the largest follower count and build an array of users
  for (const key of Object.keys(followersRecord)) {
    if (followersRecord[key] >= highestFollowerCount) {
      usersWithMostFollowers.push(
        { name: getName(data, key),
          followers: followersRecord[key]
        }
      );
    }
  }

  //Return the first user in the record if there is only one user with the most followers
  if (usersWithMostFollowers.length === 1) {
    return usersWithMostFollowers[0];
  }

  return usersWithMostFollowers;
  
};

const printAll = function(data) {
  //outputs a list of everyone and for each of them, the names of who they follow and who follows them.
  let users = {};

  //Iterate through all users
  for (const key1 of Object.keys(data)) {

    //Create new returnable user data
    //Create a new user element per user id
    users[key1] = {
      name: data[key1].name,
      follows: [],
      followers: []
    };

    //Get names of all who user follows and push to new follows array
    for (const follows of data[key1].follows) {
      users[key1].follows.push(getName(data, follows));
    }

    //Get followers
    //Iterate through all followers for user
    for (const key2 of Object.keys(data)) {
      //for each follower, if it matches the first user, add to followers list
      for (const follower of data[key2].follows) {
        if (follower === key1) {
          users[key1].followers.push(getName(data, key2));
        }
      }
    }
  }

  return users;
};

const unrequitedFollowers = function(data) {
  //returns a list of names for those who follow someone that doesn't follow them back.
  let names = [];

  for (const key1 of Object.keys(data)) {
    for (const key2 of data[key1].follows) {
      //For each follows now see if they are following us back
      if (doesFollow(data, key1, key2)) {
        names.push(key1);
      }
    }
  }

  return names;

};

console.log("Biggest Follower: ", biggestFollower(data));
console.log("Most Popular: ", mostPopular(data));
console.log("Print All: ", printAll(data));
console.log("unrequited Followers: ", unrequitedFollowers(data));