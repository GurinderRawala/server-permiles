## Server Permiles

PerMiles is a fleet management software, providing payroll, safety record, tracking and driver app. For more information visit [permiles.com](https://permiles.com).
This app is a node app which is dedicated to expose http endpoints and graphql for driver app and company software.

## Get Started

To get started first create docker containers for redis and postgres:

```shell
docker compose up
```

Install dependencies:

```shell
npm install
```
Build server: 
```shell
npm run build
```

Build server: 
```shell
npm run build
```

Start server:

```shell
npm run dev
```

You can check different enpoints by importing postman scripts in your postman from [here](https://github.com/GurinderRawala/server-permiles/tree/main/scripts/postman)
Driver app graphql is exposed on `driver-app/graphql`.
Software graphql is exposed on `/graphql`
