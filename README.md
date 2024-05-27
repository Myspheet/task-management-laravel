## How to run the BE
- duplicate the .env.example to .env
- Create a database and update the .env file
- composer install
- Run php artisan migrate to migrate the database
- php artisan serve to run the backend application


## How to run the FE

- Yarn install or npm install
- update the baseUrl in helper/config.js to your backend url
- npm run dev to run the dev server or npm run start to run production mode


## How to run the BE Test

- php artisan test



## How to use application
- After Registering, you're redirected to the login page
- Enter your details and click the login button
- Add a task
- To mark a task as completed click the check mark icon
- To edit a task click the edit icon
- To delete a task click the delete icon
- To download your task list click the download button

