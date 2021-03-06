# SQL Client

Simple Postgresql SQL client. Will show a login dialog asking for credential
information for the database. When the login form is successfully submitted
it will be replaced with the main application interface. On the right is a panel
showing a list of tables in the current schema, and a dropdown to switch to a
different schema. There is also a "Log Out" button to return to the login
dialog.

On the right, there is an upper text area allowing the user to enter a SQL
query.  Basic syntax coloring is provided by the CodeMirror library. When the
"Run Query" button is clicked, the results of the query is displayed below in
a table. The user can click in the headers of the table to sort it by the data
in the column. If the column contains integers, it will be sorted numerically,
otherwise it will be sorted by string value.

In the left panel, if the user clicks a table name in the table list, it will
insert a `SELECT * from tablename` query for that table.

It won't win any graphic design awards, but it looks a lot better than it did
before I applied any styles.

The app is written using Express and React, with styling by the emotion library.
Global state like the login status, table listing, query, and query result are
managed using Redux (see the `client/state` directory). redux-thunk is used for
asynchronous data fetching.

## Basic layout

* `index.js` is the production server script
* `build.js` is responsible for building the production bundle
* `dev.js` is the script for development mode
* `client/`: contains all the client-side code for the various React components,
   including the Emotion styled components
    * `client/state/` contain two Redux reducer functions as well as the
      associated action creation functions  (in `query.js` and `login.js`) which
      are composed into a single reducer and Redux store in `global.js`.
* `server/`: contains server side code
* `validators/` contains a single (so far) validator that can be shared between
  client and server code.

## Install dependencies

```
npm install
```

## Build and run production build

Runs a server on port 3000

```
npm run build
npm start
```

## Run in development mode

Runs a server on port 3000, with hot reloading of client code. Will restart
the server when server code is modified.

```
npm run dev
```

