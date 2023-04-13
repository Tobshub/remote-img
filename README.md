# React Fullstack Template

I start a lot of projects, most of which I never finish.
And they all share a common folder structure & dependency list

This is template is set up to have all those files/folders and dependencies, and the bare bones code to get started fast

## Overview

The dependecies automatically included are listed below.

Client dependencies:

- [react & react-dom](https://reactjs.org/)
- [react-router-dom](https://reactrouter.com/)
- [trpc](https://trpc.io/docs/) (client, server, react-query)
- [typescript](https://www.typescriptlang.org/)
- [vite](https://vitejs.dev/) (including vite-tsconfig-paths)
- [socket.io-client](https://socket.io/)

Server dependencies:

- [express](https://expressjs.com/) & [cors](https://www.npmjs.com/package/cors)
- [trpc/server](https://trpc.io/docs/) & [zod](https://zod.dev/)
- [socket.io](https://socket.io/)
- [typescript](https://www.typescriptlang.org/)
- [pino](https://getpino.io/) (including [pino-pretty](https://github.com/pinojs/pino-pretty#readme))
- [prisma](https://prisma.io/docs)
- [dotenv](https://github.com/motdotla/dotenv#readme)

The root folder has [concurrently](https://github.com/open-cli-tools/concurrently) to easily run both _server_ & _client_ development servers.

## Getting Started

Getting started on github is super easy, you can find a guide to using template repositories [here](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template).

### Using the CLI

Another method of using this template would be using the CLI

- clone this repo
- remove the .git folder
- initialize a new repository

```bash
$ git clone https://github.com/Tobshub/react-fullstack-template.git <folder name>
$ cd <folder name>
$ rm -rf .git
$ git init
```

Edit and remove any packages you don't need from **_client/package.json_** & **_server/package.json_** and create a **_server/.env_** file similar to the **_server/.env-example_**.

Then run:

```bash
$ yarn setup
```

This installs all dependencies in the _**root**, client, and server_ directories, and also runs `prisma generate` in the server directory to generate prisma artifacts.

After installing all the dependencies, you can start both development servers from the project root by running:

```bash
$ yarn dev
```

