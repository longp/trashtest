
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
```
![first test](https://github.com/longp/trashtest/blob/master/readme_img/1.png)
```