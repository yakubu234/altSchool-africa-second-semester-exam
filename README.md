=====================================================

# altSchool-africa-second-semester-exam Blog API

=====================================================

### blogging api. The general idea here is that the api has a general endpoint that shows a list of articles that have been created by different people, and anybody that calls this endpoint, should be able to read a blog created by them or other users.

# **Setup the database connection at the .env, copy the env.example to .env **

a restful API written with Express framework and API authorization and authentication using JWT , along with implementation Documentation

## Installation

use the [Git](https://github.com/yakubu234/altSchool-africa-second-semester-exam.git) repository link to install altSchool-africa-second-semester-exam.git

```bash
git clone https://github.com/yakubu234/altSchool-africa-second-semester-exam.git
```

run

```bash
npm install
```

[and]

### **Postman documentation at the link below **

```bash
https://documenter.getpostman.com/view/12538701/2s8YeivvRR
```

<!--
```bash
php artisan migrate
```

## feature test

user registration test at tests/Feature/feature/UserTest

## usage

kindly click on this [link](https://documenter.getpostman.com/view/12538701/2s7ZEBmgAC) to view the documentation published on postman

[OR]

## API Endpoints

### Create User Account

```bash
 POST      api/register
```

registers the user and returns json data with the status.

### Login User

```bash
POST       api/signin
```

authenticates user and returns json data with status.

### Fetch User

```bash
GET        api/fetch-user/{user_id}
```

required bearer token to access, pass user id along with the request. returns json data with status.

### Update User

```bash
PUT        api/update-user
```

required bearer token to update, pass raw data through body. returns json data with status.

### Delete User

```bash
DELETE     api/delete-user/{user_id}
```

required bearer token to access, pass user id along with the request. returns json data with status.
-->

### the API is hosted on a dedicated test server @

```bash
[link](http://blog-api.mockup.com.ng/)
```
