# data-model.md

## Purpose

Defines the database schema and DB-layer function contracts for the Outlift app (Next.js + Supabase).

This file is intended to be:

- easy to read for humans
- unambiguous for LLMs generating code (SQL / Supabase queries / TypeScript)

---

## Conventions

- Tables: `snake_case`
- Columns: `snake_case`
- Primary keys: `uuid` (`id`)
- Foreign keys: `<referenced_table>_id`
- Soft delete: `archived_at` (nullable timestamp)
- Timestamps: `created_at`, `updated_at`

---

## Entity Hierarchy

Core ownership chain:
profiles
└─ user_programs
└─ workouts
├─ workout_exercises
└─ workout_sessions
└─ workout_session_exercises
└─ workout_sets

`exercises` is a shared catalog referenced by both templates and sessions.

---

# Tables

## profiles

User profile tied to Supabase Auth user.

| column     | type        | constraints  | references    |
| ---------- | ----------- | ------------ | ------------- |
| id         | uuid        | PK, not null | auth_users.id |
| username   | text        | not null     |               |
| email      | text        | not null     |               |
| created_at | timestamptz | not null     |               |

Notes:

- `profiles.id` equals `auth_users.id` (1:1 mapping).

---

## exercises

Exercise catalog. Can contain system exercises and custom user exercises.

| column      | type        | constraints  | references  |
| ----------- | ----------- | ------------ | ----------- |
| id          | uuid        | PK, not null |             |
| name        | text        | not null     |             |
| bodypart    | text        | not null     |             |
| type        | text        | not null     |             |
| created_by  | uuid        | nullable     | profiles.id |
| created_at  | timestamptz | not null     |             |
| updated_at  | timestamptz | not null     |             |
| archived_at | timestamptz | nullable     |             |

Notes:

- `created_by`:
  - `NULL` → system exercise
  - non-null → user-created exercise

---

## user_programs

Training programs owned by users.

| column      | type        | constraints  | references  |
| ----------- | ----------- | ------------ | ----------- |
| id          | uuid        | PK, not null |             |
| name        | text        | not null     |             |
| profile_id  | uuid        | not null     | profiles.id |
| created_at  | timestamptz | not null     |             |
| updated_at  | timestamptz | not null     |             |
| is_active   | boolean     | not null     |             |
| archived_at | timestamptz | nullable     |             |

Notes:

- There may be multiple programs per user.
- `is_active` indicates the currently active program (enforce at app/service level unless DB constraint exists).

---

## workouts

Workout templates inside a program.

| column      | type        | constraints  | references       |
| ----------- | ----------- | ------------ | ---------------- |
| id          | uuid        | PK, not null |                  |
| name        | text        | not null     |                  |
| program_id  | uuid        | not null     | user_programs.id |
| created_at  | timestamptz | not null     |                  |
| updated_at  | timestamptz | not null     |                  |
| order_index | int         | not null     |                  |
| archived_at | timestamptz | nullable     |                  |

Notes:

- `order_index` defines ordering within a program.

---

## workout_exercises

Planned exercises for a workout template.

| column           | type | constraints  | references   |
| ---------------- | ---- | ------------ | ------------ |
| id               | uuid | PK, not null |              |
| workout_id       | uuid | not null     | workouts.id  |
| exercise_id      | uuid | not null     | exercises.id |
| in_workout_index | int  | not null     |              |
| sets             | int  | not null     |              |
| rep_goal         | int  | not null     |              |

Notes:

- `in_workout_index` is the ordering of exercises in a workout template.

---

## workout_sessions

A performed workout session (active or finished).

| column     | type        | constraints  | references  |
| ---------- | ----------- | ------------ | ----------- |
| id         | uuid        | PK, not null |             |
| workout_id | uuid        | not null     | workouts.id |
| profile_id | uuid        | not null     | profiles.id |
| created_at | timestamptz | not null     |             |
| started_at | timestamptz | not null     |             |
| ended_at   | timestamptz | nullable     |             |

Notes:

- Active session: `ended_at IS NULL`
- Finished session: `ended_at IS NOT NULL`

---

## workout_session_exercises

Exercises performed during a session.

| column              | type | constraints  | references           |
| ------------------- | ---- | ------------ | -------------------- |
| id                  | uuid | PK, not null |                      |
| session_id          | uuid | not null     | workout_sessions.id  |
| exercise_id         | uuid | not null     | exercises.id         |
| in_session_index    | int  | not null     |                      |
| planned_exercise_id | uuid | nullable     | workout_exercises.id |

Notes:

- `planned_exercise_id` allows linking performed exercises to planned workout exercises.
- Nullable because user can add ad-hoc exercises during a session.

---

## workout_sets

Sets performed for a specific session exercise.

| column              | type        | constraints  | references                   |
| ------------------- | ----------- | ------------ | ---------------------------- |
| id                  | uuid        | PK, not null |                              |
| session_exercise_id | uuid        | not null     | workout_session_exercises.id |
| set_index           | int         | not null     |                              |
| weight              | numeric     | not null     |                              |
| reps                | int         | not null     |                              |
| rir                 | int         | nullable     |                              |
| created_at          | timestamptz | not null     |                              |

Notes:

- `set_index` is the ordering within a session exercise.

---

# Relationships (Explicit)

- `profiles (1) -> (many) user_programs` via `user_programs.profile_id`
- `profiles (1) -> (many) workout_sessions` via `workout_sessions.profile_id`
- `user_programs (1) -> (many) workouts` via `workouts.program_id`
- `workouts (1) -> (many) workout_exercises` via `workout_exercises.workout_id`
- `workouts (1) -> (many) workout_sessions` via `workout_sessions.workout_id`
- `exercises (1) -> (many) workout_exercises` via `workout_exercises.exercise_id`
- `exercises (1) -> (many) workout_session_exercises` via `workout_session_exercises.exercise_id`
- `workout_sessions (1) -> (many) workout_session_exercises` via `workout_session_exercises.session_id`
- `workout_session_exercises (1) -> (many) workout_sets` via `workout_sets.session_exercise_id`
- `workout_exercises (optional 1) -> (many) workout_session_exercises` via `planned_exercise_id`

---

# DB Layer Function Contracts

These are the **DB layer functions** (Supabase queries only).
No business logic here — only CRUD and direct query operations.

Conventions:

- Authorization is enforced via `profileId` in queries (and by RLS policies).
- Prefer batching (avoid N+1 queries).
- Avoid `select('*')` in production code.

---

## Programs (user_programs)

- `listPrograms(profileId)`
- `getProgram(profileId, programId)`
- `createProgram(profileId, payload)`
- `updateProgram(programId, payload)`
- `archiveProgram(profileId, programId)`

Payload shape (suggested):

- `createProgram`: `{ name: string, is_active?: boolean }`
- `updateProgram`: `{ name?: string, is_active?: boolean }`

---

## Workouts (workouts)

- `listWorkouts(programId)`
- `getWorkout(profileId, workoutId)`
- `updateWorkout(workoutId, payload)`
- `archiveWorkout(profileId, workoutId)`

Payload shape (suggested):

- `updateWorkout`: `{ name?: string, order_index?: number }`

---

## Sessions (workout_sessions, workout_session_exercises, workout_sets)

- `listCompletedSessions(profileId, workoutId)`
- `getActiveSession(profileId)`
- `createSession(profileId, workoutId)`
- `insertSet(sessionExerciseId)`
- `updateSessionExercise(sessionExerciseId)`
- `finishSession(profileId, sessionId)`

Notes:

- `listCompletedSessions` returns sessions where `ended_at IS NOT NULL`.
- `getActiveSession` returns the active session where `ended_at IS NULL`.

---

## Exercises (exercises, workout_exercises, workout_session_exercises, workout_sets)

- `listAllExercises(profileId)`
- `createCustomExercise(profileId, payload)`
- `updateExercise(profileId, exerciseId, payload)`
- `archiveExercise(profileId, exerciseId)`

- `listWorkoutExercises(workoutId)`
- `listSessionExercises(sessionId)`
- `listSets(sessionExerciseId)`

Payload shape (suggested):

- `createCustomExercise`: `{ name: string, bodypart: string, type: string }`
- `updateExercise`: `{ name?: string, bodypart?: string, type?: string }`

Notes:

- `listAllExercises(profileId)` should include:
  - system exercises (`created_by IS NULL`)
  - user exercises (`created_by = profileId`)
  - exclude archived (`archived_at IS NULL`) unless explicitly needed
