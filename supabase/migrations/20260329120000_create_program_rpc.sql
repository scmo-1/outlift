create or replace function public.create_program_with_workouts(
    p_profile_id uuid,
    p_program_name text,
    p_workouts jsonb
)
returns uuid
language plpgsql
security invoker
set search_path = public
as $$
declare
    v_program_id uuid;
    v_workout_record record;
    v_exercise_record record;
    v_workout_id uuid;
    v_workout_name text;
    v_exercise_id uuid;
    v_sets_count integer;
    v_rep_goal integer;
begin
    if auth.uid() is null or auth.uid() <> p_profile_id then
        raise exception 'Not authorized';
    end if;

    if btrim(coalesce(p_program_name, '')) = '' then
        raise exception 'Program name is required';
    end if;

    if p_workouts is null or jsonb_typeof(p_workouts) <> 'array' then
        raise exception 'Workouts must be an array';
    end if;

    insert into public.programs (profile_id, name, is_active)
    values (p_profile_id, btrim(p_program_name), false)
    returning id into v_program_id;

    for v_workout_record in
        select value, ordinality
        from jsonb_array_elements(p_workouts) with ordinality
    loop
        v_workout_name := btrim(coalesce(v_workout_record.value ->> 'name', ''));

        if v_workout_name = '' then
            raise exception 'Workout name is required';
        end if;

        if jsonb_typeof(v_workout_record.value -> 'exercises') <> 'array' then
            raise exception 'Workout exercises must be an array';
        end if;

        insert into public.program_workouts (program_id, name, order_index)
        values (v_program_id, v_workout_name, v_workout_record.ordinality::integer)
        returning id into v_workout_id;

        for v_exercise_record in
            select value, ordinality
            from jsonb_array_elements(v_workout_record.value -> 'exercises') with ordinality
        loop
            if coalesce(v_exercise_record.value ->> 'exerciseId', '') = '' then
                raise exception 'Exercise is required';
            end if;

            if jsonb_typeof(v_exercise_record.value -> 'sets') <> 'array' then
                raise exception 'Exercise sets are required';
            end if;

            v_sets_count := jsonb_array_length(v_exercise_record.value -> 'sets');

            if v_sets_count = 0 then
                raise exception 'Exercise sets are required';
            end if;

            if coalesce(v_exercise_record.value -> 'sets' -> 0 ->> 'repGoal', '') = '' then
                raise exception 'Rep goal is required';
            end if;

            v_exercise_id := (v_exercise_record.value ->> 'exerciseId')::uuid;
            v_rep_goal := (v_exercise_record.value -> 'sets' -> 0 ->> 'repGoal')::integer;

            insert into public.program_workout_exercises (
                workout_id,
                exercise_id,
                in_workout_index,
                sets,
                rep_goal
            )
            values (
                v_workout_id,
                v_exercise_id,
                v_exercise_record.ordinality::integer,
                v_sets_count,
                v_rep_goal
            );
        end loop;
    end loop;

    return v_program_id;
end;
$$;
