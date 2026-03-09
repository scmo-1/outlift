begin;

insert into
    public.exercises (
        id,
        name,
        nickname,
        body_part,
        exercise_type,
        created_by,
        created_at,
        updated_at,
        archived_at
    )
values
    (
        gen_random_uuid (),
        'Barbell Back Squat',
        'Squat',
        'legs',
        'push',
        null,
        now (),
        now (),
        null
    ),
    (
        gen_random_uuid (),
        'Front Squat',
        null,
        'legs',
        'push',
        null,
        now (),
        now (),
        null
    ),
    (
        gen_random_uuid (),
        'Romanian Deadlift',
        'RDL',
        'legs',
        'pull',
        null,
        now (),
        now (),
        null
    ),
    (
        gen_random_uuid (),
        'Leg Press',
        null,
        'legs',
        'push',
        null,
        now (),
        now (),
        null
    ),
    (
        gen_random_uuid (),
        'Flat Barbell Bench Press',
        'Bench',
        'chest',
        'push',
        null,
        now (),
        now (),
        null
    ),
    (
        gen_random_uuid (),
        'Incline Dumbbell Press',
        'Incline DB Press',
        'chest',
        'push',
        null,
        now (),
        now (),
        null
    ),
    (
        gen_random_uuid (),
        'Dips',
        null,
        'chest',
        'push',
        null,
        now (),
        now (),
        null
    ),
    (
        gen_random_uuid (),
        'Barbell Row',
        'BB Row',
        'back',
        'pull',
        null,
        now (),
        now (),
        null
    ),
    (
        gen_random_uuid (),
        'Pull-Up',
        null,
        'back',
        'pull',
        null,
        now (),
        now (),
        null
    ),
    (
        gen_random_uuid (),
        'Lat Pulldown',
        null,
        'back',
        'pull',
        null,
        now (),
        now (),
        null
    ),
    (
        gen_random_uuid (),
        'Overhead Press',
        'OHP',
        'shoulders',
        'push',
        null,
        now (),
        now (),
        null
    ),
    (
        gen_random_uuid (),
        'Lateral Raise',
        null,
        'shoulders',
        'push',
        null,
        now (),
        now (),
        null
    ),
    (
        gen_random_uuid (),
        'Rear Delt Fly',
        null,
        'shoulders',
        'pull',
        null,
        now (),
        now (),
        null
    ),
    (
        gen_random_uuid (),
        'Barbell Curl',
        null,
        'arms',
        'pull',
        null,
        now (),
        now (),
        null
    ),
    (
        gen_random_uuid (),
        'Hammer Curl',
        null,
        'arms',
        'pull',
        null,
        now (),
        now (),
        null
    ),
    (
        gen_random_uuid (),
        'Triceps Pushdown',
        null,
        'arms',
        'push',
        null,
        now (),
        now (),
        null
    ),
    (
        gen_random_uuid (),
        'Skull Crusher',
        null,
        'arms',
        'push',
        null,
        now (),
        now (),
        null
    ),
    (
        gen_random_uuid (),
        'Standing Calf Raise',
        'Calf Raise',
        'legs',
        'push',
        null,
        now (),
        now (),
        null
    ),
    (
        gen_random_uuid (),
        'Plank',
        null,
        'core',
        'hold',
        null,
        now (),
        now (),
        null
    ),
    (
        gen_random_uuid (),
        'Hanging Leg Raise',
        null,
        'core',
        'pull',
        null,
        now (),
        now (),
        null
    );

commit;