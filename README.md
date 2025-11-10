# movies-assement-BackEnd
This is the backedend application that will fecth datab from TMDB service and serve reponse to UI.
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

###  **Live Deployment**

✅ The backend is deployed on **Vercel**:
👉 [https://movies-assement-backend.vercel.app](https://movies-assement-backend.vercel.app)

---

###  **Available APIs**

## Get Trending Movies

**Endpoint:**

```
GET https://movies-assement-backend.vercel.app/api/movie/trending/day?pageNo=2
```

**Description:**
Fetches a list of trending movies from TMDB.

**Query Parameters:**

| Parameter    | Type                     | Default | Description                         |
| ------------ | ------------------------ | ------- | ----------------------------------- |
| `timeWindow` | string (`day` or `week`) | `day`   | Determines the trending time window |
| `pageNo`     | number                   | `1`     | The page number of results          |

**Example:**

```
GET /api/movie/trending/week?pageNo=3
```

**Note:**
If `timeWindow` is not provided, it defaults to `day`.
If `pageNo` is not provided, it defaults to `1`.

---

## 2 Get Movie Details by ID

**Endpoint:**

```
GET https://movies-assement-backend.vercel.app/api/movie/803796
```

**Description:**
Fetches detailed information about a specific movie by its TMDB ID.

**Required Parameter:**

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| `id`      | number | The TMDB movie ID (required) |

**Example:**

```
GET /api/movie/603692
```

**Note:**
If `id` is missing or not a valid number, the API returns
`400 Bad Request: "Movie ID is required"`.

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
# Environment Setup

Please refer to the `.example.env` file to cofigure Enviroment Varialbles.
Open the new .env file and add your TMDB credentials.
please make sure you have your account setp with [TMDB](https://www.themoviedb.org/)

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
