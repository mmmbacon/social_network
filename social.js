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

const mostPopular = function(data) {
  //returns the name of the most popular (most followed) individual.
  
  let userWithMostFollowers = "";
  let followsList = [];
  const followersRecord = {};

  for (const key of Object.keys(data)) {
    followsList = data[key].follows;
  }

  for (const user of followsList) {
    if (!followersRecord[user]) {
      followersRecord[user] = 1;
    } else {
      followersRecord[user] += 1;
    }
  }

  let highestFollowerCount = 0;
  for (const key in Object.keys(followersRecord)) {
    if (followersRecord[key] > highestFollowerCount) {
      highestFollowerCount = followersRecord[key];
      userWithMostFollowers = getName(data, key);
    }
  }

  return userWithMostFollowers;
};

const getName = function(data, id) {
  return data[id].name;
};

const getFollows = function(data, id) {
  return data[id].follows;
};

const doesFollow = function(data, id1, id2) {

  for (const user of data[id1].follows) {
    if (user === id2) {
      return true;
    }
  }

  return false;
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