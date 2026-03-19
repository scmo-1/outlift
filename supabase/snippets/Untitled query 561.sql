begin;

with
    p as (
        select
            id
        from
            public.profiles
        where
            email = 'me@scmo.dev'
        limit
            1
    ),
    prog as (
        insert into
            public.user_programs (
                id,
                name,
                profile_id,
                created_at,
                updated_at,
                is_active,
                archived_at
            )
        select
            gen_random_uuid (),
            'Upper/Lower 2-Day',
            p.id,
            now (),
            now (),
            true,
            null
        from
            p returning id,
            profile_id
    ),
    w1 as (
        insert into
            public.workouts (
                id,
                name,
                program_id,
                created_at,
                updated_at,
                order_index,
                archived_at
            )
        select
            gen_random_uuid (),
            'Upper A',
            prog.id,
            now (),
            now (),
            1,
            null
        from
            prog returning id
    ),
    w2 as (
        insert into
            public.workouts (
                id,
                name,
                program_id,
                created_at,
                updated_at,
                order_index,
                archived_at
            )
        select
            gen_random_uuid (),
            'Lower A',
            prog.id,
            now (),
            now (),
            2,
            null
        from
            prog returning id
    ),
    bench as (
        select
            id
        from
            public.exercises
        where
            name = 'Flat Barbell Bench Press'
        limit
            1
    ),
    row_ as (
        select
            id
        from
            public.exercises
        where
            name = 'Barbell Row'
        limit
            1
    ),
    ohp as (
        select
            id
        from
            public.exercises
        where
            name = 'Overhead Press'
        limit
            1
    ),
    squat as (
        select
            id
        from
            public.exercises
        where
            name = 'Barbell Back Squat'
        limit
            1
    ),
    rdl as (
        select
            id
        from
            public.exercises
        where
            name = 'Romanian Deadlift'
        limit
            1
    ),
    calf as (
        select
            id
        from
            public.exercises
        where
            name = 'Standing Calf Raise'
        limit
            1
    ),
    we_upper as (
        insert into
            public.workout_exercises (
                id,
                workout_id,
                exercise_id,
                in_workout_index,
                sets,
                rep_goal
            )
        select
            gen_random_uuid (),
            w1.id,
            bench.id,
            1,
            4,
            6
        from
            w1,
            bench
        union all
        select
            gen_random_uuid (),
            w1.id,
            row_.id,
            2,
            4,
            8
        from
            w1,
            row_
        union all
        select
            gen_random_uuid (),
            w1.id,
            ohp.id,
            3,
            3,
            8
        from
            w1,
            ohp returning id,
            exercise_id,
            in_workout_index
    ),
    we_lower as (
        insert into
            public.workout_exercises (
                id,
                workout_id,
                exercise_id,
                in_workout_index,
                sets,
                rep_goal
            )
        select
            gen_random_uuid (),
            w2.id,
            squat.id,
            1,
            4,
            6
        from
            w2,
            squat
        union all
        select
            gen_random_uuid (),
            w2.id,
            rdl.id,
            2,
            3,
            8
        from
            w2,
            rdl
        union all
        select
            gen_random_uuid (),
            w2.id,
            calf.id,
            3,
            4,
            12
        from
            w2,
            calf returning id
    ),
    sess as (
        insert into
            public.workout_sessions (
                id,
                workout_id,
                profile_id,
                created_at,
                started_at,
                ended_at
            )
        select
            gen_random_uuid (),
            w1.id,
            prog.profile_id,
            now () - interval '1 day',
            now () - interval '1 day' + interval '5 min',
            now () - interval '1 day' + interval '55 min'
        from
            w1,
            prog returning id
    ),
    wse as (
        insert into
            public.workout_session_exercises (
                id,
                session_id,
                exercise_id,
                in_session_index,
                planned_exercise_id
            )
        select
            gen_random_uuid (),
            sess.id,
            we_upper.exercise_id,
            we_upper.in_workout_index,
            we_upper.id
        from
            sess,
            we_upper returning id
    )
insert into
    public.workout_sets (
        id,
        session_exercise_id,
        set_index,
        weight,
        reps,
        rir,
        created_at
    )
select
    gen_random_uuid (),
    wse.id,
    1,
    40,
    10,
    3,
    now () - interval '1 day'
from
    wse
union all
select
    gen_random_uuid (),
    wse.id,
    2,
    45,
    8,
    2,
    now () - interval '1 day'
from
    wse
union all
select
    gen_random_uuid (),
    wse.id,
    3,
    47.5,
    6,
    1,
    now () - interval '1 day'
from
    wse;

commit;