begin;

with
    target_profile as (
        select
            id,
            email
        from
            public.profiles
        where
            id = 'ed837b3b-d199-4bd4-b0fb-6e0ee7d2d83b'
            and email = 'test@mail.com'
        limit
            1
    ),
    full_body_program as (
        insert into
            public.programs (name, profile_id, is_active, archived_at)
        select
            'Full Body 3 Day',
            tp.id,
            true,
            null
        from
            target_profile tp returning id,
            profile_id
    ),
    upper_lower_program as (
        insert into
            public.programs (name, profile_id, is_active, archived_at)
        select
            'Upper / Lower 4 Day',
            tp.id,
            false,
            null
        from
            target_profile tp returning id,
            profile_id
    ),
    full_body_a as (
        insert into
            public.program_workouts (name, program_id, order_index, archived_at)
        select
            'Full Body A',
            p.id,
            1,
            null
        from
            full_body_program p returning id
    ),
    full_body_b as (
        insert into
            public.program_workouts (name, program_id, order_index, archived_at)
        select
            'Full Body B',
            p.id,
            2,
            null
        from
            full_body_program p returning id
    ),
    full_body_c as (
        insert into
            public.program_workouts (name, program_id, order_index, archived_at)
        select
            'Full Body C',
            p.id,
            3,
            null
        from
            full_body_program p returning id
    ),
    upper_a as (
        insert into
            public.program_workouts (name, program_id, order_index, archived_at)
        select
            'Upper A',
            p.id,
            1,
            null
        from
            upper_lower_program p returning id
    ),
    lower_a as (
        insert into
            public.program_workouts (name, program_id, order_index, archived_at)
        select
            'Lower A',
            p.id,
            2,
            null
        from
            upper_lower_program p returning id
    ),
    upper_b as (
        insert into
            public.program_workouts (name, program_id, order_index, archived_at)
        select
            'Upper B',
            p.id,
            3,
            null
        from
            upper_lower_program p returning id
    ),
    lower_b as (
        insert into
            public.program_workouts (name, program_id, order_index, archived_at)
        select
            'Lower B',
            p.id,
            4,
            null
        from
            upper_lower_program p returning id
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
    ex_front_squat as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Front Squat'
        limit
            1
    ),
    ex_leg_press as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Leg Press'
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
    ex_deadlift as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Conventional Deadlift'
        limit
            1
    ),
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
    ex_incline_db as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Incline Dumbbell Press'
        limit
            1
    ),
    ex_db_bench as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Flat Dumbbell Press'
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
    ex_db_shoulder as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Seated Dumbbell Shoulder Press'
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
    ex_cable_row as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Seated Cable Row'
        limit
            1
    ),
    ex_pulldown as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Lat Pulldown'
        limit
            1
    ),
    ex_pullup as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Pull-Up'
        limit
            1
    ),
    ex_bss as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Bulgarian Split Squat'
        limit
            1
    ),
    ex_leg_extension as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Leg Extension'
        limit
            1
    ),
    ex_leg_curl as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Seated Leg Curl'
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
    ex_lateral_raise as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Lateral Raise'
        limit
            1
    ),
    ex_rear_delt as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Rear Delt Fly'
        limit
            1
    ),
    ex_face_pull as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Face Pull'
        limit
            1
    ),
    ex_curl as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Barbell Curl'
        limit
            1
    ),
    ex_hammer_curl as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Hammer Curl'
        limit
            1
    ),
    ex_pushdown as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Triceps Pushdown'
        limit
            1
    ),
    ex_skull as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Skull Crusher'
        limit
            1
    ),
    ex_plank as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Plank'
        limit
            1
    ),
    ex_hanging_leg_raise as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Hanging Leg Raise'
        limit
            1
    ),
    ex_cable_crunch as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Cable Crunch'
        limit
            1
    ),
    ex_goblet_squat as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Goblet Squat'
        limit
            1
    ),
    ex_chest_supported_row as (
        select
            id,
            name
        from
            public.exercises
        where
            name = 'Chest Supported Row'
        limit
            1
    ),
    full_body_a_plan as (
        insert into
            public.program_workout_exercises (
                workout_id,
                exercise_id,
                in_workout_index,
                sets,
                rep_goal
            )
        select
            w.id,
            e.id,
            1,
            4,
            6
        from
            full_body_a w,
            ex_squat e
        union all
        select
            w.id,
            e.id,
            2,
            4,
            6
        from
            full_body_a w,
            ex_bench e
        union all
        select
            w.id,
            e.id,
            3,
            4,
            8
        from
            full_body_a w,
            ex_row e
        union all
        select
            w.id,
            e.id,
            4,
            3,
            10
        from
            full_body_a w,
            ex_lateral_raise e
        union all
        select
            w.id,
            e.id,
            5,
            3,
            12
        from
            full_body_a w,
            ex_cable_crunch e returning id,
            workout_id,
            exercise_id,
            in_workout_index
    ),
    full_body_b_plan as (
        insert into
            public.program_workout_exercises (
                workout_id,
                exercise_id,
                in_workout_index,
                sets,
                rep_goal
            )
        select
            w.id,
            e.id,
            1,
            4,
            8
        from
            full_body_b w,
            ex_rdl e
        union all
        select
            w.id,
            e.id,
            2,
            4,
            8
        from
            full_body_b w,
            ex_incline_db e
        union all
        select
            w.id,
            e.id,
            3,
            4,
            10
        from
            full_body_b w,
            ex_pulldown e
        union all
        select
            w.id,
            e.id,
            4,
            3,
            12
        from
            full_body_b w,
            ex_bss e
        union all
        select
            w.id,
            e.id,
            5,
            3,
            12
        from
            full_body_b w,
            ex_pushdown e returning id,
            workout_id,
            exercise_id,
            in_workout_index
    ),
    full_body_c_plan as (
        insert into
            public.program_workout_exercises (
                workout_id,
                exercise_id,
                in_workout_index,
                sets,
                rep_goal
            )
        select
            w.id,
            e.id,
            1,
            3,
            5
        from
            full_body_c w,
            ex_deadlift e
        union all
        select
            w.id,
            e.id,
            2,
            4,
            6
        from
            full_body_c w,
            ex_ohp e
        union all
        select
            w.id,
            e.id,
            3,
            4,
            8
        from
            full_body_c w,
            ex_pullup e
        union all
        select
            w.id,
            e.id,
            4,
            3,
            12
        from
            full_body_c w,
            ex_leg_curl e
        union all
        select
            w.id,
            e.id,
            5,
            3,
            10
        from
            full_body_c w,
            ex_hanging_leg_raise e returning id,
            workout_id,
            exercise_id,
            in_workout_index
    ),
    upper_a_plan as (
        insert into
            public.program_workout_exercises (
                workout_id,
                exercise_id,
                in_workout_index,
                sets,
                rep_goal
            )
        select
            w.id,
            e.id,
            1,
            4,
            6
        from
            upper_a w,
            ex_bench e
        union all
        select
            w.id,
            e.id,
            2,
            4,
            8
        from
            upper_a w,
            ex_row e
        union all
        select
            w.id,
            e.id,
            3,
            3,
            8
        from
            upper_a w,
            ex_ohp e
        union all
        select
            w.id,
            e.id,
            4,
            3,
            12
        from
            upper_a w,
            ex_curl e
        union all
        select
            w.id,
            e.id,
            5,
            3,
            12
        from
            upper_a w,
            ex_pushdown e returning id
    ),
    lower_a_plan as (
        insert into
            public.program_workout_exercises (
                workout_id,
                exercise_id,
                in_workout_index,
                sets,
                rep_goal
            )
        select
            w.id,
            e.id,
            1,
            4,
            6
        from
            lower_a w,
            ex_squat e
        union all
        select
            w.id,
            e.id,
            2,
            4,
            8
        from
            lower_a w,
            ex_rdl e
        union all
        select
            w.id,
            e.id,
            3,
            3,
            12
        from
            lower_a w,
            ex_leg_extension e
        union all
        select
            w.id,
            e.id,
            4,
            4,
            12
        from
            lower_a w,
            ex_calf e returning id
    ),
    upper_b_plan as (
        insert into
            public.program_workout_exercises (
                workout_id,
                exercise_id,
                in_workout_index,
                sets,
                rep_goal
            )
        select
            w.id,
            e.id,
            1,
            4,
            8
        from
            upper_b w,
            ex_incline_db e
        union all
        select
            w.id,
            e.id,
            2,
            4,
            10
        from
            upper_b w,
            ex_pulldown e
        union all
        select
            w.id,
            e.id,
            3,
            3,
            10
        from
            upper_b w,
            ex_db_shoulder e
        union all
        select
            w.id,
            e.id,
            4,
            3,
            15
        from
            upper_b w,
            ex_rear_delt e
        union all
        select
            w.id,
            e.id,
            5,
            3,
            12
        from
            upper_b w,
            ex_skull e returning id
    ),
    lower_b_plan as (
        insert into
            public.program_workout_exercises (
                workout_id,
                exercise_id,
                in_workout_index,
                sets,
                rep_goal
            )
        select
            w.id,
            e.id,
            1,
            4,
            8
        from
            lower_b w,
            ex_front_squat e
        union all
        select
            w.id,
            e.id,
            2,
            4,
            10
        from
            lower_b w,
            ex_leg_press e
        union all
        select
            w.id,
            e.id,
            3,
            3,
            12
        from
            lower_b w,
            ex_leg_curl e
        union all
        select
            w.id,
            e.id,
            4,
            4,
            15
        from
            lower_b w,
            ex_calf e returning id
    ),
    session_fb_a_1 as (
        insert into
            public.workout_sessions (
                workout_id,
                profile_id,
                created_at,
                started_at,
                ended_at
            )
        select
            w.id,
            tp.id,
            now () - interval '20 days',
            now () - interval '20 days' + interval '18 hours',
            now () - interval '20 days' + interval '19 hours 5 minutes'
        from
            full_body_a w,
            target_profile tp returning id
    ),
    session_fb_b_1 as (
        insert into
            public.workout_sessions (
                workout_id,
                profile_id,
                created_at,
                started_at,
                ended_at
            )
        select
            w.id,
            tp.id,
            now () - interval '18 days',
            now () - interval '18 days' + interval '18 hours 10 minutes',
            now () - interval '18 days' + interval '19 hours 12 minutes'
        from
            full_body_b w,
            target_profile tp returning id
    ),
    session_fb_c_1 as (
        insert into
            public.workout_sessions (
                workout_id,
                profile_id,
                created_at,
                started_at,
                ended_at
            )
        select
            w.id,
            tp.id,
            now () - interval '16 days',
            now () - interval '16 days' + interval '17 hours 45 minutes',
            now () - interval '16 days' + interval '18 hours 40 minutes'
        from
            full_body_c w,
            target_profile tp returning id
    ),
    session_fb_a_2 as (
        insert into
            public.workout_sessions (
                workout_id,
                profile_id,
                created_at,
                started_at,
                ended_at
            )
        select
            w.id,
            tp.id,
            now () - interval '13 days',
            now () - interval '13 days' + interval '18 hours',
            now () - interval '13 days' + interval '19 hours 3 minutes'
        from
            full_body_a w,
            target_profile tp returning id
    ),
    session_fb_b_2 as (
        insert into
            public.workout_sessions (
                workout_id,
                profile_id,
                created_at,
                started_at,
                ended_at
            )
        select
            w.id,
            tp.id,
            now () - interval '11 days',
            now () - interval '11 days' + interval '18 hours 5 minutes',
            now () - interval '11 days' + interval '19 hours 9 minutes'
        from
            full_body_b w,
            target_profile tp returning id
    ),
    session_fb_c_2 as (
        insert into
            public.workout_sessions (
                workout_id,
                profile_id,
                created_at,
                started_at,
                ended_at
            )
        select
            w.id,
            tp.id,
            now () - interval '9 days',
            now () - interval '9 days' + interval '17 hours 40 minutes',
            now () - interval '9 days' + interval '18 hours 32 minutes'
        from
            full_body_c w,
            target_profile tp returning id
    ),
    session_fb_a_3 as (
        insert into
            public.workout_sessions (
                workout_id,
                profile_id,
                created_at,
                started_at,
                ended_at
            )
        select
            w.id,
            tp.id,
            now () - interval '6 days',
            now () - interval '6 days' + interval '18 hours 15 minutes',
            now () - interval '6 days' + interval '19 hours 18 minutes'
        from
            full_body_a w,
            target_profile tp returning id
    ),
    session_fb_b_3 as (
        insert into
            public.workout_sessions (
                workout_id,
                profile_id,
                created_at,
                started_at,
                ended_at
            )
        select
            w.id,
            tp.id,
            now () - interval '4 days',
            now () - interval '4 days' + interval '18 hours',
            now () - interval '4 days' + interval '19 hours 4 minutes'
        from
            full_body_b w,
            target_profile tp returning id
    ),
    fb_a_1_exercises as (
        insert into
            public.session_exercises (
                session_id,
                exercise_id,
                exercise_name,
                in_session_index,
                planned_exercise_id
            )
        select
            s.id,
            e.id,
            e.name,
            1,
            null::uuid
        from
            session_fb_a_1 s,
            ex_squat e
        union all
        select
            s.id,
            e.id,
            e.name,
            2,
            null::uuid
        from
            session_fb_a_1 s,
            ex_bench e
        union all
        select
            s.id,
            e.id,
            e.name,
            3,
            null::uuid
        from
            session_fb_a_1 s,
            ex_row e
        union all
        select
            s.id,
            e.id,
            e.name,
            4,
            null::uuid
        from
            session_fb_a_1 s,
            ex_lateral_raise e
        union all
        select
            s.id,
            e.id,
            e.name,
            5,
            null::uuid
        from
            session_fb_a_1 s,
            ex_cable_crunch e returning id,
            in_session_index
    ),
    fb_b_1_exercises as (
        insert into
            public.session_exercises (
                session_id,
                exercise_id,
                exercise_name,
                in_session_index,
                planned_exercise_id
            )
        select
            s.id,
            e.id,
            e.name,
            1,
            null::uuid
        from
            session_fb_b_1 s,
            ex_rdl e
        union all
        select
            s.id,
            e.id,
            e.name,
            2,
            null::uuid
        from
            session_fb_b_1 s,
            ex_incline_db e
        union all
        select
            s.id,
            e.id,
            e.name,
            3,
            null::uuid
        from
            session_fb_b_1 s,
            ex_pulldown e
        union all
        select
            s.id,
            e.id,
            e.name,
            4,
            null::uuid
        from
            session_fb_b_1 s,
            ex_bss e
        union all
        select
            s.id,
            e.id,
            e.name,
            5,
            null::uuid
        from
            session_fb_b_1 s,
            ex_pushdown e returning id,
            in_session_index
    ),
    fb_c_1_exercises as (
        insert into
            public.session_exercises (
                session_id,
                exercise_id,
                exercise_name,
                in_session_index,
                planned_exercise_id
            )
        select
            s.id,
            e.id,
            e.name,
            1,
            null::uuid
        from
            session_fb_c_1 s,
            ex_deadlift e
        union all
        select
            s.id,
            e.id,
            e.name,
            2,
            null::uuid
        from
            session_fb_c_1 s,
            ex_ohp e
        union all
        select
            s.id,
            e.id,
            e.name,
            3,
            null::uuid
        from
            session_fb_c_1 s,
            ex_pullup e
        union all
        select
            s.id,
            e.id,
            e.name,
            4,
            null::uuid
        from
            session_fb_c_1 s,
            ex_leg_curl e
        union all
        select
            s.id,
            e.id,
            e.name,
            5,
            null::uuid
        from
            session_fb_c_1 s,
            ex_hanging_leg_raise e returning id,
            in_session_index
    ),
    fb_a_2_exercises as (
        insert into
            public.session_exercises (
                session_id,
                exercise_id,
                exercise_name,
                in_session_index,
                planned_exercise_id
            )
        select
            s.id,
            e.id,
            e.name,
            1,
            null::uuid
        from
            session_fb_a_2 s,
            ex_squat e
        union all
        select
            s.id,
            e.id,
            e.name,
            2,
            null::uuid
        from
            session_fb_a_2 s,
            ex_db_bench e
        union all
        select
            s.id,
            e.id,
            e.name,
            3,
            p.id
        from
            session_fb_a_2 s
            cross join ex_chest_supported_row e
            join full_body_a_plan p on p.in_workout_index = 3
        union all
        select
            s.id,
            e.id,
            e.name,
            4,
            null::uuid
        from
            session_fb_a_2 s,
            ex_lateral_raise e
        union all
        select
            s.id,
            e.id,
            e.name,
            5,
            null::uuid
        from
            session_fb_a_2 s,
            ex_cable_crunch e returning id,
            in_session_index
    ),
    fb_b_2_exercises as (
        insert into
            public.session_exercises (
                session_id,
                exercise_id,
                exercise_name,
                in_session_index,
                planned_exercise_id
            )
        select
            s.id,
            e.id,
            e.name,
            1,
            null::uuid
        from
            session_fb_b_2 s,
            ex_rdl e
        union all
        select
            s.id,
            e.id,
            e.name,
            2,
            null::uuid
        from
            session_fb_b_2 s,
            ex_incline_db e
        union all
        select
            s.id,
            e.id,
            e.name,
            3,
            null::uuid
        from
            session_fb_b_2 s,
            ex_pulldown e
        union all
        select
            s.id,
            e.id,
            e.name,
            4,
            null::uuid
        from
            session_fb_b_2 s,
            ex_bss e
        union all
        select
            s.id,
            e.id,
            e.name,
            5,
            null::uuid
        from
            session_fb_b_2 s,
            ex_pushdown e returning id,
            in_session_index
    ),
    fb_c_2_exercises as (
        insert into
            public.session_exercises (
                session_id,
                exercise_id,
                exercise_name,
                in_session_index,
                planned_exercise_id
            )
        select
            s.id,
            e.id,
            e.name,
            1,
            null::uuid
        from
            session_fb_c_2 s,
            ex_deadlift e
        union all
        select
            s.id,
            e.id,
            e.name,
            2,
            null::uuid
        from
            session_fb_c_2 s,
            ex_db_shoulder e
        union all
        select
            s.id,
            e.id,
            e.name,
            3,
            null::uuid
        from
            session_fb_c_2 s,
            ex_pullup e
        union all
        select
            s.id,
            e.id,
            e.name,
            4,
            null::uuid
        from
            session_fb_c_2 s,
            ex_leg_curl e
        union all
        select
            s.id,
            e.id,
            e.name,
            5,
            null::uuid
        from
            session_fb_c_2 s,
            ex_hanging_leg_raise e returning id,
            in_session_index
    ),
    fb_a_3_exercises as (
        insert into
            public.session_exercises (
                session_id,
                exercise_id,
                exercise_name,
                in_session_index,
                planned_exercise_id
            )
        select
            s.id,
            e.id,
            e.name,
            1,
            null::uuid
        from
            session_fb_a_3 s,
            ex_squat e
        union all
        select
            s.id,
            e.id,
            e.name,
            2,
            null::uuid
        from
            session_fb_a_3 s,
            ex_bench e
        union all
        select
            s.id,
            e.id,
            e.name,
            3,
            null::uuid
        from
            session_fb_a_3 s,
            ex_row e
        union all
        select
            s.id,
            e.id,
            e.name,
            4,
            null::uuid
        from
            session_fb_a_3 s,
            ex_lateral_raise e
        union all
        select
            s.id,
            e.id,
            e.name,
            5,
            null::uuid
        from
            session_fb_a_3 s,
            ex_cable_crunch e returning id,
            in_session_index
    ),
    fb_b_3_exercises as (
        insert into
            public.session_exercises (
                session_id,
                exercise_id,
                exercise_name,
                in_session_index,
                planned_exercise_id
            )
        select
            s.id,
            e.id,
            e.name,
            1,
            p.id
        from
            session_fb_b_3 s
            cross join ex_goblet_squat e
            join full_body_b_plan p on p.in_workout_index = 1
        union all
        select
            s.id,
            e.id,
            e.name,
            2,
            null::uuid
        from
            session_fb_b_3 s,
            ex_incline_db e
        union all
        select
            s.id,
            e.id,
            e.name,
            3,
            null::uuid
        from
            session_fb_b_3 s,
            ex_pulldown e
        union all
        select
            s.id,
            e.id,
            e.name,
            4,
            null::uuid
        from
            session_fb_b_3 s,
            ex_bss e
        union all
        select
            s.id,
            e.id,
            e.name,
            5,
            null::uuid
        from
            session_fb_b_3 s,
            ex_pushdown e returning id,
            in_session_index
    ),
    all_session_exercises as (
        select
            id,
            in_session_index
        from
            fb_a_1_exercises
        union all
        select
            id,
            in_session_index
        from
            fb_b_1_exercises
        union all
        select
            id,
            in_session_index
        from
            fb_c_1_exercises
        union all
        select
            id,
            in_session_index
        from
            fb_a_2_exercises
        union all
        select
            id,
            in_session_index
        from
            fb_b_2_exercises
        union all
        select
            id,
            in_session_index
        from
            fb_c_2_exercises
        union all
        select
            id,
            in_session_index
        from
            fb_a_3_exercises
        union all
        select
            id,
            in_session_index
        from
            fb_b_3_exercises
    )
insert into
    public.sets (
        session_exercise_id,
        set_index,
        status,
        weight,
        reps,
        rir,
        created_at
    )
select
    ase.id,
    set_data.set_index,
    'completed',
    case
        when ase.in_session_index = 1 then
            set_data.weight_base + 40
        when ase.in_session_index = 2 then
            set_data.weight_base + 15
        when ase.in_session_index = 3 then
            set_data.weight_base + 20
        when ase.in_session_index = 4 then
            set_data.weight_base
        else
            set_data.weight_base - 5
    end,
    set_data.reps,
    set_data.rir,
    now () - interval '2 days'
from
    all_session_exercises ase
    cross join (
        values
            (1, 20::numeric, 10, 3),
            (2, 25::numeric, 8, 2),
            (3, 30::numeric, 6, 1)
    ) as set_data (set_index, weight_base, reps, rir);

commit;
