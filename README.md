# HPX Referral System

## Scripts

the following script are available to run.

### npm install

run `npm install` to install the dependencies. if it failed type `npm install --legacy-peer-deps`.

### npm run start

run `npm run start` to start the server.

### npm run dev

run `npm run dev` to run server in development mode.

### npm run build

run `npm run build` to to create compiled files for react.js view.

## configuration

### Databae configuration

to connect with your own mongod server update the `uri` in [databaseConfig.js](./configs/databaseConfig.js) to your own databae `uri`.

```JavaScript

const uri = `mongodb+srv://${username}:${password}@cluster0.cnmbib5.mongodb.net/${dbname}?retryWrites=true&w=majority`;

```

### Frontend configurations

to make correct api calls the base url has to be updated to the deplyed server.

in [configs.js](./src/services/configs.js) update the `base_url` to the new url where application is deplyed.

```JavaScript

export const base_url = `https://still-beach-19546.herokuapp.com`;

```
