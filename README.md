# Northcoders News API

Welcome to the backend of my Northcoders solo project.
In this project, I was given the task of making my first full stack web application in 5 days; this was a mock news app using data that was given to us by the Northcoders team.

The data given to us was psql, and I created the API using node-postgres and javascript, jest and husky was used to create an automated test suite. 

Here is the hosted version fof my API: https://nc-news-tm65.onrender.com

##In order to run this project on your own machine:

###Cloning the repository, installing dependencies, and creating .env files.

Fork and/or clone the project repository from GitHub using

git clone https://github.com/SaskiaWells/NC_news

Ensure you are in the project directory and make sure you have Node.js installed on your machine.

Install the project dependencies using

npm install.

Create two .env files in the project root directory: .env.test and .env.development. Open each .env file and add the following lines to the test and development files respectivey.

PGDATABASE=nc_games_test PGDATABASE=nc_games

Make sure to add the .env files to your .gitignore file to prevent them from being committed to the repository.

###Seeding the database locally.

Make sure you have PostgreSQL installed and running on your local machine.

Run the following command to set up the necessary database tables:

npm run setup-dbs

Seed the local database with sample data by running the following command:

npm run seed

###Running tests.

Make sure the local database is running.

Run the npm test script to execute the project tests in Jest.

Please note that you may need to adjust the file paths or command names based on your project's specific configuration. Additionally, ensure that your local database is properly configured and accessible before running the setup and seed commands.

Feel free to modify and customize these instructions as needed to fit your project's specific requirements
