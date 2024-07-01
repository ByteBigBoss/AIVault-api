
# AscaoriginMs

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

# API

## POST

### GET ALL POST

http://ascaorigin.ap-south-1.elasticbeanstalk.com/api/post/all

### GET ALL POST CATEGORY 

http://ascaorigin.ap-south-1.elasticbeanstalk.com/api/post/all-c

### GET ONE POST SEARCH BY POST ID

http://ascaorigin.ap-south-1.elasticbeanstalk.com/api/post/getone/id

## CATEGORY

### GET ALL CATEGORY
http://ascaorigin.ap-south-1.elasticbeanstalk.com/api/category/get-all

## Ascaorigin User
### CREATE ACCOUNT
http://ascaorigin.ap-south-1.elasticbeanstalk.com/api/asca_user/create-account

{
    fname
    lname
    email
    password
}

### LOGIN

http://ascaorigin.ap-south-1.elasticbeanstalk.com/api/asca_user/login
{
    email
    password
}
response:{
    token:token,
    expiresIn: 172800
}

## FIRE
### ADD FIRE(POST)
http://ascaorigin.ap-south-1.elasticbeanstalk.com/api/fire/add

{
    toolId:toolId
}

### GET ALL FIRE(GET)
http://ascaorigin.ap-south-1.elasticbeanstalk.com/api/fire/get-all

### REMOVE FIRE(DELETE)
http://ascaorigin.ap-south-1.elasticbeanstalk.com/api/fire/remove/id


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
