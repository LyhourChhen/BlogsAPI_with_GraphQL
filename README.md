## BlogAPI built with GraphQL

Build the basic BlogAPI with graphQL.

-   How to make authorization in graphQL ?

    -   go to graphQL playground & find HTTP HEADER at the bottom
    -   Make the value pair like this :

    ```json
    {
        "Authorization": "Bearer {$token you generate from}"
    }
    ```

    -   How to generate token by `prisma token`

-   Create Heroku App and make cofiguration by `heroku login && heroku create` =>
    `heroku config: set ${PRODUCTION URL IN ENV}`

Then push to `git push heroku master` https://fathomless-caverns-66441.herokuapp.com/
