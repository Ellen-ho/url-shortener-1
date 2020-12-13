# Url Shortener with Express + Typescript + Vue.js(Neumorphism style UI)

## Introduction

A simple service for converting URL to short one. 
The server is built with Node.js and Express in Typescript and a simple frontend app by Vue.js with Neumorphism style UI in index.html. 

## Demo

Demo app on heroku
https://url-shorten-serv.herokuapp.com/

## Development Setup

### Prerequisites

Install the following packages

- Node.js: v15.3.0
- npm: v7.0.14
- MongoDB Community Server: v4.4.2

### Setting Up a Project

Install packages:

```
npm install
```

Run dev mode:

```
npm run dev:serve
```

Access the URL in browser

```
http://localhost:3000
```

Production build and run 

```
npm start
```

## Deployment

### Deploy node typescript app to Heroku

Usually we will add typescript related packages to devDependency, but that will fail when heroku compile since heroku needs those pacakges to run the process such as tsc and type check. So we need to move typescript and types to dependency in package.json. 