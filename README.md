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

