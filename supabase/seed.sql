begin;

-- 1) Exercises (no custom id)
insert into
    public.exercises (
        name,
        nickname,
        bodypart,
        type,
        created_by,
        archived_at
    )
values
    (
        'Barbell Back Squat',
        'Squats',
        'legs',
        'push',
        null,
        null
    ),
    (
        'Flat Barbell Bench Press',
        'Bench Press',
        'chest',
        'push',
        null,
        null
    ),
    (
        'Barbell Row',
        'BB Rows',
        'back',
        'pull',
        null,
        null
    ),
    (
        'Overhead Press',
        'OHP',
        'shoulders',
        'push',
        null,
        null
    ),
    (
        'Romanian Deadlift',
        'RDL',
        'legs',
        'pull',
        null,
        null
    );

-- 2) Program for first profile
with
    p as (
        select
            id
        from
            public.profiles
        order by
            created_at asc
        limit
            1
    ),
    prog as (
        insert into
            public.user_programs (name, profile_id, is_active, archived_at)
        select
            'Upper/Lower 4 Day',
            p.id,
            true,
            null
        from
            p returning id,
            profile_id
    ),
    w_upper as (
        insert into
            public.workouts (name, program_id, order_index, archived_at)
        select
            'Upper A',
            prog.id,
            1,
            null
        from
            prog returning id
    ),
    w_lower as (
        insert into
            public.workouts (name, program_id, order_index, archived_at)
        select
            'Lower A',
            prog.id,
            2,
            null
        from
            prog returning id
    ),
    ex_bench as (
        select
            id
        from
            public.exercises
        where
            name = 'Flat Barbell Bench Press'
        limit
            1
    ),
    ex_row as (
        select
            id
        from
            public.exercises
        where
            name = 'Barbell Row'
        limit
            1
    ),
    ex_squat as (
        select
            id
        from
            public.exercises
        where
            name = 'Barbell Back Squat'
        limit
            1
    ),
    ex_rdl as (
        select
            id
        from
            public.exercises
        where
            name = 'Romanian Deadlift'
        limit
            1
    )
insert into
    public.workout_exercises (
        workout_id,
        exercise_id,
        in_workout_index,
        sets,
        rep_goal
    )
select
    w_upper.id,
    ex_bench.id,
    1,
    4,
    6
from
    w_upper,
    ex_bench
union all
select
    w_upper.id,
    ex_row.id,
    2,
    4,
    8
from
    w_upper,
    ex_row
union all
select
    w_lower.id,
    ex_squat.id,
    1,
    4,
    6
from
    w_lower,
    ex_squat
union all
select
    w_lower.id,
    ex_rdl.id,
    2,
    3,
    8
from
    w_lower,
    ex_rdl;

commit;