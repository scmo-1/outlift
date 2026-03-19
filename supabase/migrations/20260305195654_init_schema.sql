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


create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, email, created_at)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.email,
    now()
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.exercises enable row level security;
alter table public.programs enable row level security;
alter table public.program_workouts enable row level security;
alter table public.program_workout_exercises enable row level security;
alter table public.workout_sessions enable row level security;
alter table public.session_exercises enable row level security;
alter table public.sets enable row level security;

-- policies sist
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id);

create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

create policy "exercises_select_visible"
on public.exercises
for select
to authenticated
using (
  archived_at is null
  and (
    created_by is null
    or created_by = auth.uid()
  )
);

create policy "exercises_insert_own"
on public.exercises
for insert
to authenticated
with check (
  created_by = auth.uid()
);

create policy "exercises_update_own"
on public.exercises
for update
to authenticated
using (created_by = auth.uid());

create policy "exercises_delete_own"
on public.exercises
for delete
to authenticated
using (created_by = auth.uid());

create policy "programs_select_own"
on public.programs
for select
to authenticated
using (profile_id = auth.uid());

create policy "programs_insert_own"
on public.programs
for insert
to authenticated
with check (profile_id = auth.uid());

create policy "programs_update_own"
on public.programs
for update
to authenticated
using (profile_id = auth.uid());

create policy "programs_delete_own"
on public.programs
for delete
to authenticated
using (profile_id = auth.uid());

create policy "program_workouts_select_own"
on public.program_workouts
for select
to authenticated
using (
  exists (
    select 1
    from public.programs p
    where p.id = program_workouts.program_id
      and p.profile_id = auth.uid()
  )
);

create policy "program_workouts_insert_own"
on public.program_workouts
for insert
to authenticated
with check (
  exists (
    select 1
    from public.programs p
    where p.id = program_workouts.program_id
      and p.profile_id = auth.uid()
  )
);

create policy "program_workouts_update_own"
on public.program_workouts
for update
to authenticated
using (
  exists (
    select 1
    from public.programs p
    where p.id = program_workouts.program_id
      and p.profile_id = auth.uid()
  )
);

create policy "program_workouts_delete_own"
on public.program_workouts
for delete
to authenticated
using (
  exists (
    select 1
    from public.programs p
    where p.id = program_workouts.program_id
      and p.profile_id = auth.uid()
  )
);

create policy "program_workout_exercises_select_own"
on public.program_workout_exercises
for select
to authenticated
using (
  exists (
    select 1
    from public.program_workouts w
    join public.programs p on p.id = w.program_id
    where w.id = program_workout_exercises.workout_id
      and p.profile_id = auth.uid()
  )
);

create policy "program_workout_exercises_insert_own"
on public.program_workout_exercises
for insert
to authenticated
with check (
  exists (
    select 1
    from public.program_workouts w
    join public.programs p on p.id = w.program_id
    where w.id = program_workout_exercises.workout_id
      and p.profile_id = auth.uid()
  )
);

create policy "program_workout_exercises_update_own"
on public.program_workout_exercises
for update
to authenticated
using (
  exists (
    select 1
    from public.program_workouts w
    join public.programs p on p.id = w.program_id
    where w.id = program_workout_exercises.workout_id
      and p.profile_id = auth.uid()
  )
);

create policy "program_workout_exercises_delete_own"
on public.program_workout_exercises
for delete
to authenticated
using (
  exists (
    select 1
    from public.program_workouts w
    join public.programs p on p.id = w.program_id
    where w.id = program_workout_exercises.workout_id
      and p.profile_id = auth.uid()
  )
);

create policy "workout_sessions_select_own"
on public.workout_sessions
for select
to authenticated
using (profile_id = auth.uid());

create policy "workout_sessions_insert_own"
on public.workout_sessions
for insert
to authenticated
with check (profile_id = auth.uid());

create policy "workout_sessions_update_own"
on public.workout_sessions
for update
to authenticated
using (profile_id = auth.uid());

create policy "workout_sessions_delete_own"
on public.workout_sessions
for delete
to authenticated
using (profile_id = auth.uid());

create policy "session_exercises_select_own"
on public.session_exercises
for select
to authenticated
using (
  exists (
    select 1
    from public.workout_sessions s
    where s.id = session_exercises.session_id
      and s.profile_id = auth.uid()
  )
);

create policy "session_exercises_insert_own"
on public.session_exercises
for insert
to authenticated
with check (
  exists (
    select 1
    from public.workout_sessions s
    where s.id = session_exercises.session_id
      and s.profile_id = auth.uid()
  )
);

create policy "session_exercises_update_own"
on public.session_exercises
for update
to authenticated
using (
  exists (
    select 1
    from public.workout_sessions s
    where s.id = session_exercises.session_id
      and s.profile_id = auth.uid()
  )
);

create policy "session_exercises_delete_own"
on public.session_exercises
for delete
to authenticated
using (
  exists (
    select 1
    from public.workout_sessions s
    where s.id = session_exercises.session_id
      and s.profile_id = auth.uid()
  )
);

create policy "sets_select_own"
on public.sets
for select
to authenticated
using (
  exists (
    select 1
    from public.session_exercises se
    join public.workout_sessions s on s.id = se.session_id
    where se.id = sets.session_exercise_id
      and s.profile_id = auth.uid()
  )
);

create policy "sets_insert_own"
on public.sets
for insert
to authenticated
with check (
  exists (
    select 1
    from public.session_exercises se
    join public.workout_sessions s on s.id = se.session_id
    where se.id = sets.session_exercise_id
      and s.profile_id = auth.uid()
  )
);

create policy "sets_update_own"
on public.sets
for update
to authenticated
using (
  exists (
    select 1
    from public.session_exercises se
    join public.workout_sessions s on s.id = se.session_id
    where se.id = sets.session_exercise_id
      and s.profile_id = auth.uid()
  )
);

create policy "sets_delete_own"
on public.sets
for delete
to authenticated
using (
  exists (
    select 1
    from public.session_exercises se
    join public.workout_sessions s on s.id = se.session_id
    where se.id = sets.session_exercise_id
      and s.profile_id = auth.uid()
  )
);