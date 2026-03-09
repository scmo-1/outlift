create extension if not exists pgcrypto;

create table
    public.profiles (
        id uuid primary key references auth.users (id) on delete cascade,
        username text not null,
        email text not null,
        created_at timestamptz not null default now ()
    );

create table
    public.exercises (
        id uuid primary key default gen_random_uuid (),
        name text not null,
        nickname text,
        body_part text not null,
        exercise_type text not null,
        created_by uuid references public.profiles (id) on delete set null,
        created_at timestamptz not null default now (),
        updated_at timestamptz not null default now (),
        archived_at timestamptz
    );

create table
    public.programs (
        id uuid primary key default gen_random_uuid (),
        name text not null,
        profile_id uuid not null references public.profiles (id) on delete cascade,
        created_at timestamptz not null default now (),
        updated_at timestamptz not null default now (),
        is_active boolean not null default false,
        archived_at timestamptz
    );

create table
    public.program_workouts (
        id uuid primary key default gen_random_uuid (),
        name text not null,
        program_id uuid not null references public.programs (id) on delete cascade,
        created_at timestamptz not null default now (),
        updated_at timestamptz not null default now (),
        order_index int not null,
        archived_at timestamptz
    );

create table
    public.program_workout_exercises (
        id uuid primary key default gen_random_uuid (),
        workout_id uuid not null references public.program_workouts (id) on delete cascade,
        exercise_id uuid not null references public.exercises (id) on delete restrict,
        in_workout_index int not null,
        sets int not null,
        rep_goal int not null
    );

create table
    public.workout_sessions (
        id uuid primary key default gen_random_uuid (),
        workout_id uuid references public.program_workouts (id) on delete set null,
        profile_id uuid not null references public.profiles (id) on delete cascade,
        created_at timestamptz not null default now (),
        started_at timestamptz not null default now (),
        ended_at timestamptz
    );

create table
    public.session_exercises (
        id uuid primary key default gen_random_uuid (),
        session_id uuid not null references public.workout_sessions (id) on delete cascade,
        exercise_id uuid references public.exercises (id) on delete set null,
        exercise_name text not null,
        in_session_index int not null,
        planned_exercise_id uuid references public.program_workout_exercises (id) on delete set null
    );

create table
    public.sets (
        id uuid primary key default gen_random_uuid (),
        session_exercise_id uuid not null references public.session_exercises (id) on delete cascade,
        set_index int not null,
        weight numeric not null,
        reps int not null,
        rir int not null,
        created_at timestamptz not null default now ()
    );