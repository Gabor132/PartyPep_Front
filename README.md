# PartyPep_Front
Second part of the PartyPep Project

A simple <insert front-end framework or whatnot> application meant to exercise basic programming concepts. From different refactoring methods to testing
frameworks and continuous integration setups.

# Trello Board
Board link: https://trello.com/b/ANK14c63/partypeps
Methodology: Agile as f*ck with a flavour of Kanban Freestyle

# Documentation
 - Google Drive: https://drive.google.com/drive/folders/1jC2TNsvXGO7mnBnm5ZCRgGYg29s5uUdr

# Clone & Go

1. Clone the repo
2. Fetch the branches
3. Create project with existing sources
4. npm run-script serve

# Development
Following commands will help start up the project.
1. run serve (will start the application server in development mode)
2. run serve-prod (will start the application server in production mode)
3. run lint (will check for any eslint mistakes)
4. run lint --fix (will automatically fix the mistakes)
5. run test:unit (will run the unit tests)

For others, check the package.json file.

# Continous Integration
CircleCI is what we use, here is the link https://circleci.com/signup/ sign up and let me know to add you to the team.

# Deployment
At the moment, the so called "PROD" does not really exist, but the IT environment does.
The deployment procedure is like this:
1. A push to any branch will trigger a CircleCI job that will compile and run only the Lint check. <b>There are no tests at the moment.</b>
2. If the branch that got pushed is Heroku and the CircleCI lint checks pass, then the code is redeployed on the Heroku app that listens to and only to the Heroku branch.

<b>There are not at the moment, any proper tests for the front end applications</b>

Heroku link: https://dashboard.heroku.com/apps/partypepsfront </br>
Application link on Heroku: https://partypepsfront.herokuapp.com </br>
CircleCI link: https://circleci.com/gh/Gabor132/PartyPep_Front </br>

Back-end repository: https://github.com/Gabor132/PartyPep </br>
