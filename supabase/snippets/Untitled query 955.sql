begin;

with
    target_profile as (
        select
            id,
            email
        from public.profiles
        where
            id = 'e0e8f2f9-f5d6-4b52-af51-1de48e061902'
            and email = 'test@email.com'
        limit 1
    ),

    exercise_lookup as (
        select
            id,
            name
        from public.exercises
        where name in (
            'Barbell Back Squat',
            'Incline Dumbbell Press',
            'Pendlay Row',
            'Barbell Curl',
            'Stiff-Leg Deadlift',
            'Dips',
            'Neutral Grip Lat Pulldown',
            'Lateral Raise',
            'Bulgarian Split Squat',
            'Overhead Press',
            'Pull-Up',
            'Skull Crusher',
            'Flat Barbell Bench Press',
            'Barbell Row',
            'Triceps Pushdown',
            'Romanian Deadlift',
            'Leg Extension',
            'Standing Calf Raise',
            'Lat Pulldown',
            'Seated Dumbbell Shoulder Press',
            'Rear Delt Fly',
            'Front Squat',
            'Leg Press',
            'Seated Leg Curl'
        )
    ),

    inserted_programs as (
        insert into public.programs (
            name,
            profile_id,
            is_active,
            archived_at
        )
        select
            p.name,
            tp.id,
            p.is_active,
            null
        from target_profile tp
        cross join (
            values
                ('Full Body 3 Day', true),
                ('Upper / Lower 4 Day', false)
        ) as p(name, is_active)
        returning id, name, profile_id
    ),

    inserted_workouts as (
        insert into public.program_workouts (
            name,
            program_id,
            order_index,
            archived_at
        )
        select
            w.workout_name,
            ip.id,
            w.order_index,
            null
        from inserted_programs ip
        join (
            values
                ('Full Body 3 Day', 'Full Body A', 1),
                ('Full Body 3 Day', 'Full Body B', 2),
                ('Full Body 3 Day', 'Full Body C', 3),
                ('Upper / Lower 4 Day', 'Upper A', 1),
                ('Upper / Lower 4 Day', 'Lower A', 2),
                ('Upper / Lower 4 Day', 'Upper B', 3),
                ('Upper / Lower 4 Day', 'Lower B', 4)
        ) as w(program_name, workout_name, order_index)
            on w.program_name = ip.name
        returning id, program_id, name
    ),

    inserted_plans as (
        insert into public.program_workout_exercises (
            workout_id,
            exercise_id,
            in_workout_index,
            sets,
            rep_goal
        )
        select
            iw.id,
            el.id,
            p.in_workout_index,
            p.sets,
            p.rep_goal
        from inserted_workouts iw
        join (
            values
                ('Full Body A', 1, 'Barbell Back Squat', 3, 6),
                ('Full Body A', 2, 'Incline Dumbbell Press', 3, 8),
                ('Full Body A', 3, 'Pendlay Row', 3, 8),
                ('Full Body A', 4, 'Barbell Curl', 3, 8),

                ('Full Body B', 1, 'Stiff-Leg Deadlift', 3, 6),
                ('Full Body B', 2, 'Dips', 3, 8),
                ('Full Body B', 3, 'Neutral Grip Lat Pulldown', 3, 8),
                ('Full Body B', 4, 'Lateral Raise', 3, 10),

                ('Full Body C', 1, 'Bulgarian Split Squat', 3, 8),
                ('Full Body C', 2, 'Overhead Press', 3, 6),
                ('Full Body C', 3, 'Pull-Up', 3, 6),
                ('Full Body C', 4, 'Skull Crusher', 3, 8),

                ('Upper A', 1, 'Flat Barbell Bench Press', 4, 6),
                ('Upper A', 2, 'Barbell Row', 4, 8),
                ('Upper A', 3, 'Overhead Press', 3, 8),
                ('Upper A', 4, 'Barbell Curl', 3, 12),
                ('Upper A', 5, 'Triceps Pushdown', 3, 12),

                ('Lower A', 1, 'Barbell Back Squat', 4, 6),
                ('Lower A', 2, 'Romanian Deadlift', 4, 8),
                ('Lower A', 3, 'Leg Extension', 3, 12),
                ('Lower A', 4, 'Standing Calf Raise', 4, 12),

                ('Upper B', 1, 'Incline Dumbbell Press', 4, 8),
                ('Upper B', 2, 'Lat Pulldown', 4, 10),
                ('Upper B', 3, 'Seated Dumbbell Shoulder Press', 3, 10),
                ('Upper B', 4, 'Rear Delt Fly', 3, 15),
                ('Upper B', 5, 'Skull Crusher', 3, 12),

                ('Lower B', 1, 'Front Squat', 4, 8),
                ('Lower B', 2, 'Leg Press', 4, 10),
                ('Lower B', 3, 'Seated Leg Curl', 3, 12),
                ('Lower B', 4, 'Standing Calf Raise', 4, 15)
        ) as p(workout_name, in_workout_index, exercise_name, sets, rep_goal)
            on p.workout_name = iw.name
        join exercise_lookup el
            on el.name = p.exercise_name
        returning id, workout_id, exercise_id, in_workout_index
    ),

    full_body_weeks as (
        select
            gs as week_idx,
            cast(
                date_trunc('week', current_date - interval '5 months')
                + (gs * 7) * interval '1 day'
                as date
            ) as week_start
        from generate_series(0, 21) as gs
    ),

    full_body_session_source as (
        select
            case day_slot
                when 1 then 'Full Body A'
                when 2 then 'Full Body B'
                when 3 then 'Full Body C'
            end as workout_name,
            cast(
                fw.week_start
                + case
                    when mod(fw.week_idx, 2) = 0 then
                        case day_slot
                            when 1 then 0
                            when 2 then 2
                            when 3 then 4
                        end
                    else
                        case day_slot
                            when 1 then 1
                            when 2 then 3
                            when 3 then 5
                        end
                  end
                as date
            ) as session_date
        from full_body_weeks fw
        cross join generate_series(1, 3) as day_slot
    ),

    inserted_full_body_sessions as (
        insert into public.workout_sessions (
            workout_id,
            profile_id,
            created_at,
            started_at,
            ended_at
        )
        select
            iw.id,
            tp.id,
            cast(fbss.session_date as timestamp) + interval '17 hours 45 minutes',
            cast(fbss.session_date as timestamp) + interval '18 hours',
            cast(fbss.session_date as timestamp)
                + interval '18 hours'
                + case fbss.workout_name
                    when 'Full Body A' then interval '1 hour 18 minutes'
                    when 'Full Body B' then interval '1 hour 14 minutes'
                    else interval '1 hour 11 minutes'
                  end
        from full_body_session_source fbss
        join inserted_workouts iw
            on iw.name = fbss.workout_name
        cross join target_profile tp
        returning id, workout_id, started_at, ended_at
    ),

    full_body_sessions as (
        select
            ifbs.id,
            iw.name as workout_name,
            ifbs.started_at,
            ifbs.ended_at,
            row_number() over (
                partition by iw.name
                order by ifbs.started_at
            ) as workout_occurrence
        from inserted_full_body_sessions ifbs
        join inserted_workouts iw
            on iw.id = ifbs.workout_id
    ),

    upper_lower_weeks as (
        select
            gs as week_idx,
            cast(
                date_trunc('week', current_date - interval '8 weeks')
                + (gs * 7) * interval '1 day'
                as date
            ) as week_start
        from generate_series(0, 2) as gs
    ),

    upper_lower_session_source as (
        select
            ul.workout_name,
            cast(ulw.week_start + ul.day_offset as date) as session_date
        from upper_lower_weeks ulw
        join (
            values
                ('Upper A', 0),
                ('Lower A', 1),
                ('Upper B', 3),
                ('Lower B', 5)
        ) as ul(workout_name, day_offset)
            on true
    ),

    inserted_upper_lower_sessions as (
        insert into public.workout_sessions (
            workout_id,
            profile_id,
            created_at,
            started_at,
            ended_at
        )
        select
            iw.id,
            tp.id,
            cast(ulss.session_date as timestamp) + interval '17 hours 45 minutes',
            cast(ulss.session_date as timestamp) + interval '18 hours',
            cast(ulss.session_date as timestamp)
                + interval '18 hours'
                + case
                    when ulss.workout_name like 'Upper%' then interval '1 hour 12 minutes'
                    else interval '1 hour 16 minutes'
                  end
        from upper_lower_session_source ulss
        join inserted_workouts iw
            on iw.name = ulss.workout_name
        cross join target_profile tp
        returning id, workout_id, started_at, ended_at
    ),

    upper_lower_sessions as (
        select
            iuls.id,
            iw.name as workout_name,
            iuls.started_at,
            iuls.ended_at,
            row_number() over (
                partition by iw.name
                order by iuls.started_at
            ) as workout_occurrence
        from inserted_upper_lower_sessions iuls
        join inserted_workouts iw
            on iw.id = iuls.workout_id
    ),

    all_sessions as (
        select
            id,
            workout_name,
            started_at,
            ended_at,
            workout_occurrence
        from full_body_sessions

        union all

        select
            id,
            workout_name,
            started_at,
            ended_at,
            workout_occurrence
        from upper_lower_sessions
    ),

    inserted_session_exercises as (
        insert into public.session_exercises (
            session_id,
            exercise_id,
            exercise_name,
            in_session_index,
            planned_exercise_id
        )
        select
            s.id,
            p.exercise_id,
            e.name,
            p.in_workout_index,
            cast(null as uuid)
        from all_sessions s
        join inserted_workouts iw
            on iw.name = s.workout_name
        join inserted_plans p
            on p.workout_id = iw.id
        join public.exercises e
            on e.id = p.exercise_id
        returning
            id,
            session_id,
            exercise_name
    ),

    session_exercise_context as (
        select
            ise.id as session_exercise_id,
            s.workout_name,
            s.workout_occurrence,
            s.ended_at,
            ise.exercise_name
        from inserted_session_exercises ise
        join all_sessions s
            on s.id = ise.session_id
    ),

    progression_map as (
        select
            workout_name,
            exercise_name,
            cast(start_weight as numeric(10, 2)) as start_weight,
            start_reps,
            start_rir,
            cast(end_weight as numeric(10, 2)) as end_weight,
            end_reps,
            end_rir,
            total_occurrences
        from (
            values
                ('Full Body A', 'Barbell Back Squat', 120.0, 5, 2, 150.0, 6, 1, 22),
                ('Full Body A', 'Incline Dumbbell Press', 37.5, 5, 1, 45.0, 7, 2, 22),
                ('Full Body A', 'Pendlay Row', 85.0, 6, 2, 95.0, 6, 2, 22),
                ('Full Body A', 'Barbell Curl', 30.0, 7, 2, 35.0, 7, 2, 22),

                ('Full Body B', 'Stiff-Leg Deadlift', 140.0, 4, 2, 165.0, 5, 1, 22),
                ('Full Body B', 'Dips', 27.5, 5, 2, 35.0, 8, 1, 22),
                ('Full Body B', 'Neutral Grip Lat Pulldown', 85.0, 7, 2, 95.0, 8, 2, 22),
                ('Full Body B', 'Lateral Raise', 10.0, 10, 1, 15.0, 12, 1, 22),

                ('Full Body C', 'Bulgarian Split Squat', 45.0, 7, 2, 57.5, 7, 2, 22),
                ('Full Body C', 'Overhead Press', 57.5, 6, 2, 67.5, 7, 1, 22),
                ('Full Body C', 'Pull-Up', 27.5, 7, 2, 40.0, 6, 1, 22),
                ('Full Body C', 'Skull Crusher', 25.0, 7, 1, 35.0, 8, 1, 22)
        ) as pm(
            workout_name,
            exercise_name,
            start_weight,
            start_reps,
            start_rir,
            end_weight,
            end_reps,
            end_rir,
            total_occurrences
        )
    ),

    upper_lower_base_map as (
        select
            workout_name,
            exercise_name,
            cast(base_weight as numeric(10, 2)) as base_weight,
            base_reps,
            base_rir
        from (
            values
                ('Upper A', 'Flat Barbell Bench Press', 80.0, 6, 2),
                ('Upper A', 'Barbell Row', 75.0, 8, 2),
                ('Upper A', 'Overhead Press', 50.0, 8, 2),
                ('Upper A', 'Barbell Curl', 27.5, 10, 2),
                ('Upper A', 'Triceps Pushdown', 40.0, 12, 2),

                ('Lower A', 'Barbell Back Squat', 110.0, 6, 2),
                ('Lower A', 'Romanian Deadlift', 120.0, 8, 2),
                ('Lower A', 'Leg Extension', 60.0, 12, 1),
                ('Lower A', 'Standing Calf Raise', 70.0, 12, 1),

                ('Upper B', 'Incline Dumbbell Press', 32.5, 8, 2),
                ('Upper B', 'Lat Pulldown', 75.0, 10, 2),
                ('Upper B', 'Seated Dumbbell Shoulder Press', 25.0, 10, 2),
                ('Upper B', 'Rear Delt Fly', 35.0, 15, 1),
                ('Upper B', 'Skull Crusher', 22.5, 12, 1),

                ('Lower B', 'Front Squat', 90.0, 8, 2),
                ('Lower B', 'Leg Press', 180.0, 10, 2),
                ('Lower B', 'Seated Leg Curl', 50.0, 12, 1),
                ('Lower B', 'Standing Calf Raise', 75.0, 15, 1)
        ) as ul(
            workout_name,
            exercise_name,
            base_weight,
            base_reps,
            base_rir
        )
    ),

    full_body_sets as (
        select
            sec.session_exercise_id,
            gs.set_index,
            'completed' as status,
            cast(
                round(
                    (
                        (
                            pm.start_weight
                            + (
                                (pm.end_weight - pm.start_weight)
                                * cast(sec.workout_occurrence - 1 as numeric)
                                / cast(pm.total_occurrences - 1 as numeric)
                            )
                        ) / 2.5
                    )
                ) * 2.5 - ((gs.set_index - 1) * 2.5)
                as numeric(10, 2)
            ) as weight,
            greatest(
                1,
                cast(
                    round(
                        pm.start_reps
                        + (
                            (pm.end_reps - pm.start_reps)
                            * cast(sec.workout_occurrence - 1 as numeric)
                            / cast(pm.total_occurrences - 1 as numeric)
                        )
                    ) as integer
                ) + (gs.set_index - 1)
            ) as reps,
            greatest(
                0,
                cast(
                    round(
                        pm.start_rir
                        + (
                            (pm.end_rir - pm.start_rir)
                            * cast(sec.workout_occurrence - 1 as numeric)
                            / cast(pm.total_occurrences - 1 as numeric)
                        )
                    ) as integer
                )
            ) as rir,
            sec.ended_at - ((4 - gs.set_index) * interval '2 minutes') as created_at
        from session_exercise_context sec
        join progression_map pm
            on pm.workout_name = sec.workout_name
            and pm.exercise_name = sec.exercise_name
        cross join generate_series(1, 3) as gs(set_index)
        where sec.workout_name in ('Full Body A', 'Full Body B', 'Full Body C')
    ),

    upper_lower_sets as (
        select
            sec.session_exercise_id,
            gs.set_index,
            'completed' as status,
            cast(
                ul.base_weight
                + ((sec.workout_occurrence - 1) * 2.5)
                - ((gs.set_index - 1) * 2.5)
                as numeric(10, 2)
            ) as weight,
            cast(
                ul.base_reps
                + least(sec.workout_occurrence - 1, 2)
                + (gs.set_index - 1)
                as integer
            ) as reps,
            cast(ul.base_rir as integer) as rir,
            sec.ended_at - ((5 - gs.set_index) * interval '2 minutes') as created_at
        from session_exercise_context sec
        join upper_lower_base_map ul
            on ul.workout_name = sec.workout_name
            and ul.exercise_name = sec.exercise_name
        cross join generate_series(1, 3) as gs(set_index)
        where sec.workout_name in ('Upper A', 'Lower A', 'Upper B', 'Lower B')
    ),

    all_sets as (
        select
            session_exercise_id,
            set_index,
            status,
            weight,
            reps,
            rir,
            created_at
        from full_body_sets

        union all

        select
            session_exercise_id,
            set_index,
            status,
            weight,
            reps,
            rir,
            created_at
        from upper_lower_sets
    )

insert into public.sets (
    session_exercise_id,
    set_index,
    status,
    weight,
    reps,
    rir,
    created_at
)
select
    session_exercise_id,
    set_index,
    status,
    weight,
    reps,
    rir,
    created_at
from all_sets;

commit;