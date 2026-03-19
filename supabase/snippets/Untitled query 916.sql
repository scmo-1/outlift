begin;

-- Replace this with your real profile email
with
    target_profile as (
        select
            id
        from
            public.profiles
        where
            email = 'me@scmo.dev'
        limit
            1
    ),
    -- Create 1 active program
    new_program as (
        insert into
            public.programs (name, profile_id, is_active, archived_at)
        select
            'Upper / Lower 4 Day',
            tp.id,
            true,
            null
        from
            target_profile tp returning id,
            profile_id
    ),
    -- Create 2 workouts in the program
    upper_workout as (
        insert into
            public.program_workouts (name, program_id, order_index, archived_at)
        select
            'Upper A',
            np.id,
            1,
            null
        from
            new_program np returning id
    ),
    lower_workout as (
        insert into
            public.program_workouts (name, program_id, order_index, archived_at)
        select
            'Lower A',
            np.id,
            2,
            null
        from
            new_program np returning id
    ),
    -- Find exercises by name from your global seed
    ex_bench as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Flat Barbell Bench Press'
        limit
            1
    ),
    ex_row as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Barbell Row'
        limit
            1
    ),
    ex_ohp as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Overhead Press'
        limit
            1
    ),
    ex_squat as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Barbell Back Squat'
        limit
            1
    ),
    ex_rdl as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Romanian Deadlift'
        limit
            1
    ),
    ex_calf as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Standing Calf Raise'
        limit
            1
    ),
    -- Planned exercises for Upper A
    upper_plan as (
        insert into
            public.program_workout_exercises (
                workout_id,
                exercise_id,
                in_workout_index,
                sets,
                rep_goal
            )
        select
            uw.id,
            eb.id,
            1,
            4,
            6
        from
            upper_workout uw,
            ex_bench eb
        union all
        select
            uw.id,
            er.id,
            2,
            4,
            8
        from
            upper_workout uw,
            ex_row er
        union all
        select
            uw.id,
            eo.id,
            3,
            3,
            8
        from
            upper_workout uw,
            ex_ohp eo returning id,
            workout_id,
            exercise_id,
            in_workout_index
    ),
    -- Planned exercises for Lower A
    lower_plan as (
        insert into
            public.program_workout_exercises (
                workout_id,
                exercise_id,
                in_workout_index,
                sets,
                rep_goal
            )
        select
            lw.id,
            es.id,
            1,
            4,
            6
        from
            lower_workout lw,
            ex_squat es
        union all
        select
            lw.id,
            er.id,
            2,
            3,
            8
        from
            lower_workout lw,
            ex_rdl er
        union all
        select
            lw.id,
            ec.id,
            3,
            4,
            12
        from
            lower_workout lw,
            ex_calf ec returning id
    ),
    -- Create one finished session for Upper A
    new_session as (
        insert into
            public.workout_sessions (
                workout_id,
                profile_id,
                created_at,
                started_at,
                ended_at
            )
        select
            uw.id,
            np.profile_id,
            now () - interval '1 day',
            now () - interval '1 day' + interval '5 minutes',
            now () - interval '1 day' + interval '55 minutes'
        from
            upper_workout uw,
            new_program np returning id
    ),
    -- Session exercises copied from the upper plan
    new_session_exercises as (
        insert into
            public.session_exercises (
                session_id,
                exercise_id,
                exercise_name,
                in_session_index,
                planned_exercise_id
            )
        select
            ns.id,
            e.id,
            e.name,
            up.in_workout_index,
            up.id
        from
            new_session ns
            join upper_plan up on true
            join public.exercises e on e.id = up.exercise_id returning id
    )
    -- Add 3 sets per session exercise
insert into
    public.sets (
        session_exercise_id,
        set_index,
        weight,
        reps,
        rir,
        created_at
    )
select
    nse.id,
    1,
    40,
    10,
    3,
    now () - interval '1 day'
from
    new_session_exercises nse
union all
select
    nse.id,
    2,
    45,
    8,
    2,
    now () - interval '1 day'
from
    new_session_exercises nse
union all
select
    nse.id,
    3,
    47.5,
    6,
    1,
    now () - interval '1 day'
from
    new_session_exercises nse;

commit;