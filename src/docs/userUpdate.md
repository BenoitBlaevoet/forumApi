# Update a user

Updates an existing user in the database.

**URL** : /user

**Method** : PUT

**Auth required** : NO

**Data constraints**

```JSON
{
  "id": "[number]",
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
  "message": "User testuser has been updated successfully.",
  "data": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "slug": "testuser",
		"banned": false,
		"desactivated": false,
		"userRoleId": 2,
		"createdAt": "2022-12-27T21:50:19.155Z",
		"updateAt": "2022-12-29T21:38:54.957Z"
  }
}
```