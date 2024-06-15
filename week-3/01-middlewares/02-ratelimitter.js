const request = require('supertest');
const assert = require('assert');
const express = require('express');
const app = express();
// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

let numberOfRequestsForUser = {};
setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000)

function ratelimiterMiddleware(req, res, next) {

  const userId = req.headers['user-id']; // get the user id from the headers

  if(numberOfRequestsForUser[userId]) {  // check if the user has made a request before
    numberOfRequestsForUser[userId]++; // increment the number of requests for the user

    if(numberOfRequestsForUser[userId] > 5) {
      res.status(404).json({ msg: 'Rate limit exceeded' }); // if the user has made more than 5 requests, block them
    } else { // if the user has made less than 5 requests, let them through
      next(); // call the next middleware
    }
  }else{ // if the user has not made a request before
      numberOfRequestsForUser[userId] = 1; // set the number of requests for the user to 1
      next(); // let them through 
}

}

app.use(ratelimiterMiddleware);



app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

module.exports = app;