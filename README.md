
# Getting started
- Make sure you have NodeJS installed (v10 or higher)
```
https://nodejs.org/en/download/
```
- Clone the repository
```
git clone https://github.com/longp/trashtest.git <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Configure your mongoDB server or Install (https://docs.mongodb.com/manual/installation/)
```bash
# create the db directory
sudo mkdir -p /data/db
# give the db correct read/write permissions
sudo chmod 777 /data/db

# starting from macOS 10.15 even the admin cannot create directory at root
# so lets create the db directory under the home directory.
mkdir -p ~/data/db
# user account has automatically read and write permissions for ~/data/db.
```
- Start your mongoDB server (you'll probably want another command prompt)
```bash
mongod

# on macOS 10.15 or above the db directory is under home directory
mongod --dbpath ~/data/db
```
- Make sure to look at .env-example and create your .env files with ur env variables

- Build and run the project
```
npm start
```



- using the Api 

First create a user with email and password. you will get an auth token as response
POST /api/auth/register
POST /api/auth/login will also give token
![first test](https://github.com/longp/trashtest/blob/master/readme_img/1.png?raw=true)


To use any routes that need authentication you will need to pass an authorization header with a bearer token with the auth token as the value (Authorization: Bearer {token})
![first test](https://github.com/longp/trashtest/blob/master/readme_img/3.png?raw=true)

Creating an entity like food or drink will be like this
POST /api/{entities}/
![first test](https://github.com/longp/trashtest/blob/master/readme_img/2.png?raw=true)

```
getting entites

GET /api/{entities}/{entityID} -> returns an object
GET /api/{entities}/search?{params} -> returns a list of objects. acceptable params so far are limit and page example( /api/drinks/search?limit=10&page=0 )

DELETE /api/{entities}/{entityID} -> deletes that specific entity

```
