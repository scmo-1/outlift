# Tables

## base_exercises

- id:
- name:
- type: (compound / isolation)
- bodypart:

## user_exercises

- id:
- name:
- base_exercise_id: FK > base_exercises.id
- profile_id: FK > profiles.id
- created_at
- updated_at

## profiles

- id: FK -> auth_users.id
- username
- email
- created_at

## user_programs

- id
- name
- profile_id: FK -> profiles.id
- created_at
- updated_at
- isActive: boolean

## workouts

- id
- name
- program_id: FK -> user_programs.id
- created_at
- updated_at
- order_index

## workout_exercises

- id
- workout_id: FK -> workouts.id
- user_exercise_id: FK -> user_exercises.id
- in_workout_index:
- sets:
- rep_goal:

## workout_sessions

- id
- workout_id: FK -> workouts.id
- profile_id: FK -> profiles.id
- created_at
- started_at
- ended_at

## workout_session_exercises

- id
- session_id: FK -> workout_sessions.id
- user_exercise_id: FK -> user_exercises.id
- in_session_index
- planned_exercise_id: FK -> workout_exercises.id // nullable
- isSkipped: boolean

## workout_sets

- id
- session_exercise_id: FK -> workout_session_exercies.id
- set_index
- weight
- reps
- RIR
- setSkipped: boolean
- created_at

# DB

### Programs

- listPrograms(profileId)
- getProgram(profileId, programId)
- listWorkoutsFromProgram(profileId, programId)
- createProgram(profileId, payload)
- deleteProgram(profileId, programId)
- updateProgram(programId, payload)

### Workout

- listWorkoutExercises(workoutId)
- updateWorkout(workoutId, payload)
- deleteWorkout(profileId, workoutId)
- getWorkout(profileId, workoutId)

### Sessions

- getActiveSession(profileId)
- createSession(profileId, workoutId)
- getSession(profileId, sessionId)
- listSessionExercises(sessionId)
- listSetsForSession(sessionId)
- insertSet(sessionExerciseId)
- updateSessionExercise(sessionExerciseId, newExerciseId)
- finishSession(profileId, sessionId)

### Exercises

- listUserExercises(profileId)
- SearchBaseExercise(query)
- createUserExercise(profileId, baseExerciseId, name)
- updateExercise(userExerciseId, payload)
-

# Services

- calculateE1RM
-
