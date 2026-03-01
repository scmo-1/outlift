# Tables

## Exercises

- id
- name
- bodypart
- type
- created_by: FK -> profiles.id <nullable | created by user>
- created_at
- updated_at
- archived_at

## profiles

- id: FK -> auth_users.id
- username
- email
- created_at

## user_programs

- id
- name
- profileId: FK -> profiles.id
- created_at
- updated_at
- isActive: boolean
- archived_at

## workouts

- id
- name
- program_id: FK -> user_programs.id
- created_at
- updated_at
- order_index
- archived_at

## workout_exercises

- id
- workoutId: FK -> workouts.id
- exerciseId: FK -> exercises.id
- in_workout_index:
- sets:
- rep_goal:

## workout_sessions

- id
- workoutId: FK -> workouts.id
- profileId: FK -> profiles.id
- created_at
- started_at
- ended_at

## workout_session_exercises

- id
- sessionId: FK -> workout_sessions.id
- exerciseId: FK -> exercises.id
- in_session_index
- planned_exercise_id: FK -> workout_exercises.id // nullable

## workout_sets

- id
- sessionExerciseId: FK -> workout_session_exercies.id
- set_index
- weight
- reps
- RIR
- created_at

# DB

### Programs

- listPrograms(profileId)
- getProgram(profileId, programId)
- createProgram(profileId, payload)
- archiveProgram(profileId, programId)
- updateProgram(programId, payload)

### Workout

- listWorkouts(programId)
- updateWorkout(workoutId, payload)
- archiveWorkout(profileId, workoutId)
- getWorkout(profileId, workoutId)

### Sessions

- listCompletedSessions(profileId, workoutId)
- getActiveSession(profileId)
- createSession(profileId, workoutId)
- insertSet(sessionExerciseId)
- updateSessionExercise(sessionExerciseId)
- finishSession(profileId, sessionId)

### Exercises

- listAllExercises(profileId)
- createCustomExercise(profileId, payload)
- updateExercise(profileId, exerciseId, payload)
- archiveExercise(profileId, exerciseId)
- listWorkoutExercises(workoutId)
- listSessionExercises(sessionId)
- listSets(sessionExerciseId)
