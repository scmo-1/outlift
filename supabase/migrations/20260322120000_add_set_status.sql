alter table public.sets
add column status text not null default 'completed';

alter table public.sets
alter column weight drop not null;

alter table public.sets
alter column reps drop not null;

alter table public.sets
alter column rir drop not null;

alter table public.sets
add constraint sets_status_check
check (status in ('completed', 'skipped'));

alter table public.sets
add constraint sets_status_values_check
check (
  (status = 'completed' and weight is not null and reps is not null and rir is not null)
  or
  (status = 'skipped' and weight is null and reps is null and rir is null)
);
