# Getting Started 


## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn preview`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Pocket Base

**Install: [Download windown](https://github.com/pocketbase/pocketbase/releases/download/v0.11.2/pocketbase_0.11.2_windows_amd64.zip)**

Once you've downloaded and extracted the archive, you could start the application by running the following console command in the extracted directory: **`./pocketbase serve`**

**And that's it!** A web server will be started with the following routes:


 `http://127.0.0.1:8090`       - if pb_public directory exists, serves the static content from it (html, css, images, etc.)
 
 `http://127.0.0.1:8090/_/`    - Admin dashboard UI
 
 `http://127.0.0.1:8090/api/`  - REST API

The first time, when you access the Admin dashboard UI, it will prompt you to create your first admin account (email and pass).

## Learn More

You can learn more in the [Pocket Base](https://pocketbase.io/docs/).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn Redux, check out the [React documentation](https://redux-toolkit.js.org/tutorials/overview).
