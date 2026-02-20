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
- user_id: FK > users.id
- created_at
- updated_at

## users

- id
- username
- email
- created_at

## user_programs

- id
- name
- user_id: FK -> users.id
- created_at

## workouts

- id
- name
- program_id: FK -> user_programs.id
- created_at
- order_index

## workout_exercises

- id
- workout_id: FK -> workouts.id
- user_exercise_id: FK -> user_exercises.id
- in_workout_index:

## workout_sessions

- id
- workout_id: FK -> workouts.id
- user_id: FK -> users.id
- created_at
- started_at
- ended_at

## workout_session_exercises

- id
- session_id: FK -> workout_sessions.id
- user_exercise_id: FK -> user_exercises.id
- in_session_index
- planned_exercise_id: FK -> workout_exercises.id // nullable

## workout_sets

- id
- session_exercise_id: FK -> workout_session_exercies.id
- set_index
- weight
- reps
- RIR
- created_at
