## Binar Chapter 6 - Challenge

- ExpressJS - Unit Test & Integration Test - CI/CD

## Postman Collection API Documentation
Generate Postman Collection API:
- Import file `collection.json` to Postman.

Optional:
```bash
> npm run generate:collection
```
then import file `collection.json` to Postman.

Online Documentation:
- [Postman Collection API Documentation](https://documenter.getpostman.com/view/13401148/2s847MsBWh)

## Simple Docs

| Method | Endpoint                                     | Description                                                                                                              |
|:------:|:---------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------|
|  POST  | `/api/auth/register`                         | User register [↩️](#post-apiauthregister---register-user)                                                                |
|  POST  | `/api/auth/login`                            | User login [↩️](#post-apiauthlogin---login-user)                                                                         |
|  GET   | `/api/auth/me`                               | Get authenticated user [↩️](#get-apiauthme---get-auth-user)                                                              |
| PATCH  | `/api/auth/change-password`                  | Change user password [↩️](#patch-apiauthchange-password---change-password)                                               |
|  GET   | `/api/characters`                            | Get user character/biodata [↩️](#get-apicharacters---get-characters--biodata)                                            |
|  POST  | `/api/characters`                            | Create new character [↩️](#post-apicharacters---create-new-character)                                                    |
| PATCH  | `/api/characters/{nickname}/change-nickname` | Change character nickname by `nickname` [↩️](#patch-apicharactersnicknamechange-nickname---change-character-nickname)    |
| PATCH  | `/api/characters/{nickname}/join-guild`      | Character join a guild by `nickname` [↩️](#patch-apicharactersnicknamejoin-guild---character-join-guild)                 |
| PATCH  | `/api/characters/{nickname}/change-guild`    | Character move to another guild by `nickname` [↩️](#patch-apicharactersnicknamechange-guild---character-change-guild)    |
| DELETE | `/api/characters/{nickname}/leave-guild`     | Character leave guild by `nickname` [↩️](#delete-apicharactersnicknameleave-guild---character-leave-guild)               |
| PATCH  | `/api/character/{nickname}/join-family`      | Character join a family by `nickname` [↩️](#patch-apicharactersnicknamejoin-family---character-join-family)              |
| PATCH  | `/api/characters/{nickname}/change-family`   | Character move to another family by `nickname` [↩️](#patch-apicharactersnicknamechange-family---character-change-family) |
| DELETE | `/api/characters/{nickname}/leave-family`    | Character leave family by `nickname` [↩️](#delete-apicharactersnicknameleave-family---character-leave-family)            |
| PATCH  | `/api/characters/{nickname}/gained-exp`      | Character gained some exp by `nickname` [↩️](#patch-apicharactersnicknamegained-exp---character-gained-experience)       |
| PATCH  | `/api/character/{nickname}/level-up`         | Character level up by `nickname` [↩️](#patch-apicharactersnicknamelevel-up---character-level-up)                         |
| DELETE | `/api/character/{nickname}/delete-character` | User delete a character by `nickname` [↩️](#delete-apicharactersnicknamedelete-character---delete-character)             |
|  GET   | `/api/histories`                             | Get user histories [↩️](#get-apihistories---get-characters-histories)                                                    |

## UserGame Endpoint
###  POST ```/api/auth/register``` - Register User
##### Request Body:
- name: ```string```  ```*required```
- username: ```string``` ```unique```  ```*required```
- email: ```string``` ```unique``` ```*required```
- password: ```string``` ```*required```
- password_confirmation: ```string``` ```*required```
##### Example Request Body
```json
{
  "name": "Rafi Putra Ramadhan",
  "username": "raprmdn",
  "email": "raprmdn@gmail.com",
  "password": "Abc123456!",
  "password_confirmation": "Abc123456!"
}
```
##### `201` Response
```json
{
  "status": 201,
  "success": true,
  "message": "User registered successfully"
}
```

###  POST ```/api/auth/login``` - Login User
##### Request Body:
- email: ```string``` ```*required```
- password: ```string``` ```*required```
##### Example Request Body
```json
{
  "email": "raprmdn@gmail.com",
  "password": "Abc123456!"
}
```
##### `200` Response
```json
{
  "status": 200,
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "Rafi Putra Ramadhan",
      "username": "raprmdn",
      "email": "raprmdn@gmail.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJyYXBybWRuIiwiZW1haWwiOiJyYXBybWRuQGdtYWlsLmNvbSIsImlhdCI6MTY2MzgzNjM0MywiZXhwIjoxNjYzOTIyNzQzfQ.ZHMxupmdyapYo_SpIZDsHFZfYvTvzSXU_mimygvssAw"
    }
  }
}
```

###  GET ```/api/auth/me``` - Get Auth User
#### Request Header:
- Authorization: ```Bearer <token>``` ```*required```
##### `200` Response
```json
{
  "status": 200,
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "Rafi Putra Ramadhan",
      "username": "raprmdn",
      "email": "raprmdn@gmail.com"
    }
  }
}
```

###  PATCH ```/api/auth/change-password``` - Change Password
#### Request Header:
- Authorization: ```Bearer <token>``` ```*required```
##### Request Body:
- current_password: ```string``` ```*required```
- new_password: ```string``` ```*required```
- password_confirmation: ```string``` ```*required```
##### Example Request Body
```json
{
  "current_password": "Abc12345!",
  "new_password": "Abc123456!",
  "password_confirmation": "Abc123456!"
}
```
##### `200` Response
```json
{
  "status": 200,
  "success": true,
  "message": "Password changed successfully"
}
```

## UserGameBiodata Endpoint

###  GET ```/api/characters``` - Get Characters / Biodata
#### Request Header:
- Authorization: ```Bearer <token>``` ```*required```
##### `200` Response
```json
{
  "status": 200,
  "success": true,
  "message": "Characters retrieved successfully",
  "data": {
    "total_characters": "1",
    "characters": [
      {
        "id": 1,
        "nickname": "raprmdn",
        "guild": null,
        "family": null,
        "experience": "0",
        "health": "4900",
        "mana": "2700",
        "race": "Human",
        "type": "Fighter",
        "gender": "Male",
        "level": 0,
        "avatar": null
      }
    ]
  }
}
```

###  POST ```/api/characters``` - Create New Character
#### Request Header:
- Authorization: ```Bearer <token>``` ```*required```
##### Request Body:
- nickname: ```string``` ```unique```  ```*required```
- race: ```string, option[Human, Elf, Majin]```  ```*required```
- type: ```string, option[Fighter, Rogue, Mage]```  ```*required```
- gender: ```string, option[Male, Female]```  ```*required```
- avatar: ```string```
##### Example Request Body
```json
{
  "nickname": "raprmdn",
  "race": "Human",
  "type": "Fighter",
  "gender": "Male"
}
```
##### `201` Response
```json
{
  "status": 201,
  "success": true,
  "message": "Character created successfully",
  "data": {
    "character": {
      "experience": "0",
      "level": 0,
      "id": 1,
      "nickname": "raprmdn",
      "race": "Human",
      "type": "Fighter",
      "gender": "Male",
      "userId": 1,
      "health": "4900",
      "mana": "2700",
      "updatedAt": "2022-09-22T14:51:00.399Z",
      "createdAt": "2022-09-22T14:51:00.399Z",
      "guild": null,
      "family": null,
      "avatar": null
    }
  }
}
```

###  PATCH ```/api/characters/{nickname}/change-nickname``` - Change Character Nickname
#### Request Header:
- Authorization: ```Bearer <token>``` ```*required```
##### Request Body:
- id: ```integer``` ```*required```
- nickname: ```string``` ```unique```  ```*required```
##### Example Request Body
```json
{
  "id": 1,
  "nickname": "raprmdn"
}
```
##### `200` Response
```json
{
  "status": 200,
  "success": true,
  "message": "Nickname changed successfully",
  "data": {
    "id": 1,
    "nickname": "raprmdn"
  }
}
```

###  PATCH ```/api/characters/{nickname}/join-guild``` - Character Join Guild
#### Request Header:
- Authorization: ```Bearer <token>``` ```*required```
##### Request Body:
- id: ```integer``` ```*required```
- guild: ```string```  ```*required```
##### Example Request Body
```json
{
  "id": 1,
  "guild": "Coalition"
}
```
##### `200` Response
```json
{
  "status": 200,
  "success": true,
  "message": "Joined guild successfully",
  "data": {
    "id": 1,
    "nickname": "raprmdn",
    "guild": "Coalition"
  }
}
```

###  PATCH ```/api/characters/{nickname}/change-guild``` - Character Change Guild
#### Request Header:
- Authorization: ```Bearer <token>``` ```*required```
##### Request Body:
- id: ```integer``` ```*required```
- guild: ```string```  ```*required```
##### Example Request Body
```json
{
  "id": 1,
  "guild": "MIXMAX"
}
```
##### `200` Response
```json
{
  "status": 200,
  "success": true,
  "message": "Changed guild successfully",
  "data": {
    "id": 1,
    "nickname": "raprmdn",
    "guild": "MIXMAX"
  }
}
```

###  DELETE ```/api/characters/{nickname}/leave-guild``` - Character Leave Guild
#### Request Header:
- Authorization: ```Bearer <token>``` ```*required```
##### `200` Response
```json
{
  "status": 200,
  "success": true,
  "message": "Left guild successfully"
}
```
#### `400` Response
```json
{
  "status": 400,
  "success": false,
  "message": "Character is not in any guild"
}
```

###  PATCH ```/api/characters/{nickname}/join-family``` - Character Join Family
#### Request Header:
- Authorization: ```Bearer <token>``` ```*required```
##### Request Body:
- id: ```integer``` ```*required```
- family: ```string```  ```*required```
##### Example Request Body
```json
{
  "id": 1,
  "family": "MYS"
}
```
##### `200` Response
```json
{
  "status": 200,
  "success": true,
  "message": "Joined family successfully",
  "data": {
    "id": 1,
    "nickname": "raprmdn",
    "family": "MYS"
  }
}
```

###  PATCH ```/api/characters/{nickname}/change-family``` - Character Change Family
#### Request Header:
- Authorization: ```Bearer <token>``` ```*required```
##### Request Body:
- id: ```integer``` ```*required```
- family: ```string```  ```*required```
##### Example Request Body
```json
{
  "id": 1,
  "family": "FAMS"
}
```
##### `200` Response
```json
{
  "status": 200,
  "success": true,
  "message": "Changed family successfully",
  "data": {
    "id": 1,
    "nickname": "raprmdn",
    "family": "FAMS"
  }
}
```

###  DELETE ```/api/characters/{nickname}/leave-family``` - Character Leave Family
#### Request Header:
- Authorization: ```Bearer <token>``` ```*required```
##### `200` Response
```json
{
  "status": 200,
  "success": true,
  "message": "Left family successfully"
}
```
#### `400` Response
```json
{
  "status": 400,
  "success": false,
  "message": "Character is not in any family"
}
```

###  PATCH ```/api/characters/{nickname}/gained-exp``` - Character Gained Experience
#### Request Header:
- Authorization: ```Bearer <token>``` ```*required```
##### Request Body:
- id: ```integer``` ```*required```
- gained_exp: ```number```  ```*required```
##### Example Request Body
```json
{
  "id": 1,
  "gained_exp": 15000
}
```
##### `200` Response
```json
{
  "status": 200,
  "success": true,
  "message": "Character gained exp",
  "data": {
    "id": 1,
    "nickname": "raprmdn",
    "gained_exp": 15000,
    "exp": 61500
  }
}
```

###  PATCH ```/api/characters/{nickname}/level-up``` - Character Level Up
#### Request Header:
- Authorization: ```Bearer <token>``` ```*required```
##### `200` Response
```json
{
  "status": 200,
  "success": true,
  "message": "Character leveled up",
  "data": {
    "id": 1,
    "nickname": "raprmdn",
    "level": 3
  }
}
```

###  DELETE ```/api/characters/{nickname}/delete-character``` - Delete Character
#### Request Header:
- Authorization: ```Bearer <token>``` ```*required```
##### `200` Response
```json
{
  "status": 200,
  "success": true,
  "message": "Character deleted successfully"
}
```

## UserGameBiodata Endpoint

###  GET ```/api/histories``` - Get Characters Histories
#### Request Header:
- Authorization: ```Bearer <token>``` ```*required```
##### `200` Response
```json
{
  "status": 200,
  "success": true,
  "message": "Success get all histories",
  "data": [
    {
      "id": 36,
      "userId": 1,
      "eventType": "LEVEL_UP",
      "subject": {
        "event_type": "LEVEL_UP",
        "triggered_character_id": 1,
        "triggered_character_by_user_id": 1,
        "previous_level": 2,
        "updated_level": 3,
        "meta": {
          "id": 1,
          "user_id": 1,
          "previous_data": {
            "id": 1,
            "userId": 1,
            "nickname": "raprmdn",
            "guild": null,
            "family": null,
            "experience": "61500",
            "health": "4900",
            "mana": "2700",
            "race": "Human",
            "type": "Fighter",
            "gender": "Male",
            "level": 2,
            "avatar": null,
            "createdAt": "2022-09-23T00:34:52.401Z",
            "updatedAt": "2022-09-23T03:13:53.275Z"
          },
          "updated_data": {
            "id": 1,
            "userId": 1,
            "nickname": "raprmdn",
            "guild": null,
            "family": null,
            "experience": "61500",
            "health": "4900",
            "mana": "2700",
            "race": "Human",
            "type": "Fighter",
            "gender": "Male",
            "level": 3,
            "avatar": null,
            "createdAt": "2022-09-23T00:34:52.401Z",
            "updatedAt": "2022-09-23T03:14:43.202Z"
          }
        }
      },
      "createdAt": "2022-09-23T03:14:43.210Z",
      "updatedAt": "2022-09-23T03:14:43.210Z"
    }
  ]
}
```
