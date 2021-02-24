
`npx create-react-app netflix-build--youtube --template redux`

=> Firebase setup 

firebase.com 

1. login 
2. right side click go to console 
3. add project 
4. give netflix-build-clone => Continue
5. make anylitisc false 
6. create project
7. copy paste your credentials in firebase.js file 

```
npm install axios --save

npm install --save firebase

npm install --save react-router-dom

```


deployment : 

1. firebase login => 
If not logged in then 

=> https://firebase.google.com/docs/cli

=> npm install -g firebase-tools

firebase init

configure 

npm run build 

firebase deploy
```


fb => go to console=> left sidebar => cloud Firebase => create database 
=> create test or production database => next => Click enable 
=> Extensions => Run Subscription Payments with Stripe => 
next => Create a new billing account =>  configure extensions => select syn new user => select sync => 


/** Integrate the stripe payment gateway with your react app */

`npm add @stripe/stripe-js`

stripe dashboard => developers => API keys => Stands keys => Copy published key => and paste in loadStripe()

to install Tailwind css 
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9

### Install and configure CRACO

Create React App doesn't let you override the PostCSS configuration natively, we also need to install CRACO to be able to configure Tailwind: 

`npm install @craco/craco`

Next, create a craco.config.js at the root of our project and add the tailwindcss and autoprefixer as PostCSS plugins:

```
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}
```

### Create your configuration file

` npx tailwindcss init `


Configure Tailwind to remove unused styles in production

configure the `purge`  => purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],

### Include Tailwind in your CSS

./src/index.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;

```

You're finished! Now when you run `npm run start`, Tailwind CSS React App project is ready.


