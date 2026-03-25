create unique index if not exists profiles_username_key
on public.profiles (lower(username));

create unique index if not exists profiles_email_key
on public.profiles (lower(email));
