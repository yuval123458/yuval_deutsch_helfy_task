# Task Manager App

## Backend Setup

cd backend
npm install
npm start (runs on port 4000)

## Frontend Setup

cd frontend
npm install
npm start (runs on port 3000)

## API Endpoints

- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- PATCH /api/tasks/:id/toggle

## Design Decisions:

- id's auto generated and incremented so ids stay unique
- priority defaults to medium for new tasks
- edit tasks on the same form with created ones for simplicity
- carousel has an infinite wrap around with tanslateX and css transitions.
- validation in two places: two middlewares to verify incoming http reqs.
