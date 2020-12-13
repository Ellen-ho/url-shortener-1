# url-shortener

## Deploy node typescript app to Heroku

Usually we will add typescript related packages to devDependency, but that will fail when heroku compile since heroku needs those pacakges to run the process such as tsc and type check. So we need to move typescript and types to dependency in package.json. 