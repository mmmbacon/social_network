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
      result = item;
    }
  }

  return result;

};

const mostPopular = function(data) {
  //returns the name of the most popular (most followed) individual.
  
  let userWithMostFollowers = "";
  const followsList = [];
  const followersRecord = {};

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      for (const user of data[key].follows) {
        followsList.push(user);
      }
    }
  }

  for (const user of followsList) {
    if (!followersRecord[user]) {
      followersRecord[user] = 1;
    } else {
      followersRecord[user] += 1;
    }
  }

  let highestFollowerCount = 0;
  for (const key in followersRecord) {
    if (followersRecord.hasOwnProperty(key)) {
      if (followersRecord[key] > highestFollowerCount) {
        highestFollowerCount = followersRecord[key];
        userWithMostFollowers = key.toString();
      }
    }
  }

  return userWithMostFollowers;
};

const getName = function(data, id) {
  for (const key of Object.keys(data)) {
    if (key === id) {
      return data[key].name;
    }
  }
};

const printAll = function(data) {
  //outputs a list of everyone and for each of them, the names of who they follow and who follows them.
  let users = {};

  //Iterate through all users
  for (const key1 of Object.keys(data)) {
    users[key1] = {
      name: data[key1].name,
      follows: data[key1].follows,
      followers: []
    };

    //Iterate through all users
    for (const key2 of Object.keys(data)) {
      //For each user, get follows
      for (const follower of data[key2].follows) {
        if (follower === key1) {
          users[key1].followers.push(getName(key2));
        }
      }
    }
  }
  
  //Compare against user list for names based on the key
  //Store each follower in the new list
  //Get Names of followers

  return users;
};

const unrequitedFollowers = function() {
  //returns a list of names for those who follow someone that doesn't follow them back.
};

console.log("Biggest Follower: ", biggestFollower(data));
console.log("Most Popular: ", mostPopular(data));
console.log("Print All: ", printAll(data));