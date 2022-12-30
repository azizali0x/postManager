# Welcome to postManager 
Here you can manage posts either publicly or privately. 

We've adhered to RESTFUL API STANDARDS. 

NB: You can create posts either publicly or privately and  private posts are unique to each user.

_PUBLIC POSTS_: Authentication is not required. make a request and get access to all data.

_PRIVATE POSTS_: Authentication is required. provide an `authorization` token when accessing posts privately.

### POSTS endpoint `/api/posts`

***
 
CREATE A POST ` POST => /api/posts`

**body params**
```json 
{ 
"title": "title of post", 
"content": "content of post" 
}
```

NB: Login and use `Authorization: token` if you want post to be private

***

GET ALL POSTS `GET => /api/posts`

NB: Login and use `Authorization: token` if you want to get private post for user


***

GET A POST `GET => /api/posts/:id`

NB: Login and use `Authorization: token` if post is private

***

UPDATE A POST `PATCH => /api/posts/:id`

**body params**
```json
{ 
"title": "title to be changed",
"content": "content to be changed",
}
```

NB: Login and use `Authorization: token` if you post is private

***

DELETE A POST `DELETE => /api/posts/:id `

NB: Login and use `Authorization: token` if you post is private

***

### SIGN UP endpoint `/api/user/signup`

***
CREATE USER `POST => /api/user/signup`

**body params**
```json
{ 
"email": "example@mail.com",
"password: "password", 
"name": "John Doe"
}
```

**response** 
```json
{ 
"user": { 
"name": "John Doe", 
"email": "example@mail.com",
"id": "eiojejl3oinm,vmldmkddkl", 
}
"token": "kjldlflnio3lkvnriojej38932poiw0e9ujfokljsdlkjal"
}
```

NB: USE `Authorization: token` if you want to use private posts

***

### SIGN IN endpoint `/api/user/login`

***

SIGN IN `POST => /api/user/login `

**body params**
```json
{
"email": "example@mail.com",
"password": "password",
}
```
**response**
```json 
{ "user": {
"name": "John Doe",
"email": "example@mail.com",
"id": "eiojejl3oinm,vmldmkddkl", 
},
"token": "kjldlflnio3lkvnriojej38932poiw0e9ujfokljsdlkjal"
}
```
***
