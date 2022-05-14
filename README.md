# Technical challenge

## Prerequisites 

- Node (>= v16)
- Docker

## Run the project

- git clone https://github.com/peculiarvale/challenge.git
- npm i
- npm run build
- docker-compose up -d
- npm run start

## API
### Users
- Create a user : ```[POST]``` ```/api/users/create```
  * Body example : ```{
    "email": "test@gmail.com"
    }```
- Get a user : ```[GET]``` ```/api/users/:id```
- Delete a user : ```[DELETE]``` ```/api/users/:id```
- Get all users : ```[GET]``` ```/api/users/all```

### Events
- Create an event for a user : ```[POST]``` ```/api/events/:user_id```
    * Body example : ```{
      "consents": [
      {
      "id": "sms_notifications",
      "enabled": false
      }
      ]
      }```
- Consult events :  `[GET]` `/api/events/list?user_id=:id`<br>
`user_id` is not mandatory, if not present it will retrieve the list of all events for all users.