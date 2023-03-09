# Popular movies dashboard

This is a test project to display most popular movies using [The Movie Database (TMDB) API](https://developers.themoviedb.org/3/getting-started/introduction).

- It implements a responsive movie dashboard for currently popular movies.
- Uses a SPA framework (React + Typescript) and SCSS.
- The page is responsive.
- Click on a movie displays description and details.
- If a movie has trailer video available, selected movie will show a play icon and clicking on the movie it will open a movie modal.
- It is possible to filter movies by category. In the design one of the popular categories listed was `Classic`. As the API did not provide such a category it was replaced by category `Action`.
- It is possible to search for movies.
- Components are covered by basic unit tests.

## Prerequisite to run this project locally

**Once you have downloaded project code please add locally a file `.env.local`.**
In that file add your API key like so `REACT_APP_API_KEY = <your_api_key_goes_here>`.
Now you are ready to run the project locally.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm coverage`

Will generate a code coverage report.

### `npm run build`

Builds the app for production to the `build` folder.
