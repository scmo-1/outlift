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
        bodypart text not null,
        type text not null,
        created_by uuid references public.profiles (id) on delete set null,
        created_at timestamptz not null default now (),
        updated_at timestamptz not null default now (),
        archived_at timestamptz
    );

create table
    public.user_programs (
        id uuid primary key default gen_random_uuid (),
        name text not null,
        profile_id uuid not null references public.profiles (id) on delete cascade,
        created_at timestamptz not null default now (),
        updated_at timestamptz not null default now (),
        is_active boolean not null default false,
        archived_at timestamptz
    );

create table
    public.workouts (
        id uuid primary key default gen_random_uuid (),
        name text not null,
        program_id uuid not null references public.user_programs (id) on delete cascade,
        created_at timestamptz not null default now (),
        updated_at timestamptz not null default now (),
        order_index int not null,
        archived_at timestamptz
    );

create table
    public.workout_exercises (
        id uuid primary key default gen_random_uuid (),
        workout_id uuid not null references public.workouts (id) on delete cascade,
        exercise_id uuid not null references public.exercises (id) on delete restrict,
        in_workout_index int not null,
        sets int not null,
        rep_goal int not null
    );