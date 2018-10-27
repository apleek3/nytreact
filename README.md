# NY Times Search React App


## Overview
A search and save app that uses NY Times API to search for articles and uses React components to render and save them in MongoDB.

### Tech Used
* React - for storing and creating our app using reusable components
* JavaScript - for Application manipulation
* CSS - for minor custom styling
* MongoDB / Mongoose - for saving Articles for later
* Node & Express - for Application routing and running
* Moment.js - for time formatting and display
* Axios- javascript library for http requests
* Heroku - for deployment


## Setup

### To use this application locally:
1. Install [Mongo](https://www.mongodb.com/)
1. Clone the repo to the directory of your choice.
1. CD into the nytreact directory using your bash / command line terminal
1. Install the dependences using -- npm install --- or -- npm i --
1. Start the local server by using command -- node server --
1. Open a new bash: cd into the nytreact/client directory (basically go one level down from the root your were just at - into the client directory)
1. In this new bash/cmd window you've just opened use command npm start to start the React App
1. In another bash/command window start Mongo, use command -- mongo --
1. In yet ANOTHER bash/command, use command --mongod --
1. Navigate to localhost:3000 in your favorite browser and try it out!


#### Detailed example command line codes for getting started: 

    1st BASH
    $ git clone https://github.com/apleek3/nytreact
    $ cd --your file path--../nytreact/
    $ npm i
    $ node server
    
    2nd BASH
    $ cd --your file path--../nytreact/client
    $ npm start
    
    3rd BASH
    $ mongo
    
    4th BASH
    $ mongod 
      

### Want to do it LIVE?
### Click here to try it out: [nytreact](https://apleek3-nytreact.herokuapp.com/)
