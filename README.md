
# Survey and Complaints Management System

A webappp that is aimed towards creating govt. surveys and manage complaints from user's side

## Features

- manage user
- add family members
- create, delete, view surveys and responses
- respond to surveys
- generate response reports
- create and view status of complaints
- provide resolution to complaints


## Dependencies
- node and npm
- mongodb atlas account
- tmux (optional)
## Installing npm dependencies
```bash
cd client  &&  npm install

cd ../server  &&  npm install

```
## Environment Variables

Rename the `.env_sample` file in both client and server to `.env` and fill in the following

`TOKEN_SECRET` :  A string of random characters to create the tokens

`DB_URI` : Database connection string from mongodb atlas

`PORT` : Server Port ( eg: 5000)

`REACT_APP_URL` : Endpoint to the server (http://localhost:5000)

## Deployment

```bash
cd server

npm run dev
```
if you have tmux in the system you can also run
```bash
chmod u+x run.sh

./run.sh
```
