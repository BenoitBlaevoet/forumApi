# Register a user

Creates a new user in the database.

**URL** : /user/register

**Method** : POST

**Auth required** : NO

**Data constraints**

```JSON
{
  "username": "[string]",
  "email": "[string, email format]",
  "password": "[string]",
  "userRoleId": "[number]"
}

```
## Success Response

**Code** : 200 OK

**Content example**

```JSON
{
  "id": 1,
  "username": "testuser",
  "email": "test@example.com",
  "password": "$2b$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa",
  "userRoleId": 2,
  "slug": "testuser",
  "message": "L'utilisateur testuser a bien été ajouter dans la base de donnée",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInVzZXJSb2xlSWQiOjIsImp0aSI6IjEyMzQ1Njc4OTAifQ.RGb3zGr47JU5D5x5ZQIoZlJVCYr-oEI48GJDJL6F1cE",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInVzZXJSb2xlSWQiOjIsImp0aSI6IjEyMzQ1Njc4OTAifQ.RGb3zGr47JU5D5x5ZQIoZlJVCYr-oEI48GJDJL6F1cE"
}
```