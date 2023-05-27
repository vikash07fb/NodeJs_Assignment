# Welcome to Authentication module for a Backend Web Application

## About the Project 
  - Authentication module 
  - Implemented in model view controller (task based)
  - Used NojeJS + ExpressJS + MongoDB

## How to Setup the project 
  run commands
  ```
  - npm i
  - Create a .env file and add
    - PORT="Your Port Numner"
    - JWT_KEY=your key
  ```
## Dependencies Uses
  - jwt (to generate the tokens)
  - bcrypt (to hash password)

## About Api point http://locahost:PORT/api/
  - signup (This will be for signing up in the data base.)
    - This will provide access token and refresh token 
  - signin  (For login)  
    - This will also provide access token and refresh token
  - refresh
    - to refresh the access token as it expires in 15 min only
  - validate
    - to validate the user with the help of access token

##  Other featues 
  - Added middlewares which 
    - Validates the input for signup and signin
    - Validates if the token is corrct or not 
  - Only unique users are allowed 
  - Added constraints for password and email id