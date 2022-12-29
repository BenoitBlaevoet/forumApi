# Log in a user

Attempts to log in an existing user with the provided email and password.

**URL** : /user/login

**Method** : POST

**Auth required** : NO

**Data constraints**

```JSON
{
  "email": "[string, email format]",
  "password": "[string]"
}
```

## Success Response

**Code** : 200 OK

**Content example**

```JSON
{
  "ok": 1,
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "userRoleId": 2,
    "slug": "testuser"
  },
  "message": "L'utilisateur testuser a bien été trouver dans la base de donnée",
  "token": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInVzZXJSb2xlSWQiOjIsImp0aSI6IjEyMzQ1Njc4OTAifQ.RGb3zGr47JU5D5x5ZQIoZlJVCYr-oEI48GJDJL6F1cE",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInVzZXJSb2xlSWQiOjIsImp0aSI6IjEyMzQ1Njc4OTAifQ.RGb3zGr47JU5D5x5ZQIoZlJVCYr-oEI48GJDJL6F1cE"
  }
}
```

## Error Response

**Condition** : If the provided email or password is incorrect.

**Code** : 404 NOT FOUND

**Content example**

```JSON
{
  "ok": 0,
  "message": "L'email ou le mot de passe est incorrect"
}
```