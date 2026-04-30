# Course Architect AI

![Backend](https://img.shields.io/badge/backend-Spring%20Boot-green)
![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20TypeScript-blue)
![Database](https://img.shields.io/badge/database-PostgreSQL-blue)
![Status](https://img.shields.io/badge/status-active-lightgrey)

A small side project that explores generating structured learning content from a single prompt using AI.

Instead of jumping across articles and videos, you describe what you want to learn, and the system builds a basic course outline with supporting material.

## Overview

Course Architect AI generates:

* Structured course (chapters, topics)
* Explanatory content
* Simple quizzes
* Relevant videos for each topic

It’s meant for quick exploration of topics, not as a replacement for full courses or textbooks.


## Tech Stack

### Backend

* Java Spring Boot

### Frontend

* React + TypeScript

### AI Layer

* Groq

### Auth

* Basic Email & Password
* Google OAuth 2.0

### External Content

* YouTube Data API

### Database

* PostgreSQL

### Infra / Deployment

* Docker
* Render


## Project Structure

```
course-architect-ai/
│
├── server/                    # Spring Boot service
│   ├── src/
│   │   ├── adapters/          # External API clients (YouTube, Groq)
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── dtos/
│   │   ├── entities/
│   │   ├── errors/
│   │   ├── filters/           # JWT Auth Filter
│   │   ├── repositories/
│   │   ├── services/
│   │   └── ServerApplication.java
│   │
│   ├── main/
│   │   └── resources/
│   │       └── application.properties
│   │
│   └── Dockerfile
│
├── client/
│   ├── src/
│   │   ├── adapters/          # External API client (Backend) 
│   │   ├── components/
│   │   ├── context/
│   │   ├── helpers/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   └── .env.example
│
└── README.md
```

## How It Works

```
User Prompt
   ↓
Groq API → course structure + content
   ↓
YouTube API → videos per topic
   ↓
Backend aggregation
   ↓
Frontend rendering
```

## API Design (Simplified)

### Generate Course

**POST /api/v1/courses**

Request:

```json
{
  "prompt": "Learn system design"
}
```

Response (simplified):

```json
{
  "title": "System Design",
  "description" : "System design is the process of defining the architecture...",
  "chapters": [
    {
      "title": "Introduction",
      "description": "...",
      "segments": [
        {
          "type": one of ["code", "text", "url", "video_query", "reference", "tip"],
          "title": string (min 10, max 100 chars),
          "value": string
        }
      ],
      "quiz": [
        {
          "question": string (min 10 chars),
          "options": [string, string, string, string],
          "correct_option_idx": integer (0 to 3)
        }
      ]
    }
  ]
}
```

## Error Handling

Current approach focuses on stability, not completeness:

* Global exception handling via `@RestControllerAdvice`

Typical failure scenarios handled:

* Empty AI response
* Missing fields in JSON
* YouTube API failure / empty results

## External APIs

### Groq

* Core AI generation engine
* Requires structured prompts + JSON output discipline

### YouTube API

* Used per topic
* No heavy caching yet → can be optimized

### Google OAuth

* Handles login
* Backend validates tokens before issuing JWT

## Database

PostgreSQL is currently used for:

* User data (OAuth-linked accounts)
* Basic persistence (courses and their contents)

Not fully normalized or optimized yet — still evolving.

## Limitations

* No progress tracking
* External API latency affects response time

## Running Locally

### 1. Clone

```bash
git clone https://github.com/itsbhaumikjoshi/course-architect-ai.git
cd course-architect-ai
```

### 2. Environment Variables

Create `.env`:

Server
```
CORS_ALLOWED_ORIGIN=
GEN_AI_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
YT_API_KEY=
JWT_SECRET=
JWT_EXPIRES_IN=43200
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
```

Client
```
VITE_API_BASE_URL=
VITE_GOOGLE_CLIENT_ID=
VITE_GOOGLE_REDIRECT_URI=
VITE_TEST_EMAIL=
VITE_TEST_PASSWORD=
```

### 3. Run with Docker

```bash
docker build -t course-architect .
docker run -p 8080:8080 course-architect
```

---

## Future Improvements

Practical next steps:

* Cache YouTube results
* Add user progress tracking
* Reduce API calls via batching

## Thoughts

This project is intentionally simple.

It’s mainly an exploration of:

* structured AI outputs
* combining multiple APIs
* building something usable without overengineering

Not aiming to be a full learning platform — just a tool that can be occasionally useful.
