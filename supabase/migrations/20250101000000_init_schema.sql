-- ==============================================================================
-- PHASE 1: SUPABASE MIGRATIONS - SCHEMA, RLS, STORAGE & AUDIT LOG
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. Helper Function: update updated_at timestamp
-- ------------------------------------------------------------------------------
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ------------------------------------------------------------------------------
-- 2. Admin Users Table & is_admin() Function
-- ------------------------------------------------------------------------------
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null default 'admin',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  ) or (
    lower(coalesce(auth.jwt() ->> 'email', '')) = 'arshh12145@gmail.com'
  );
$$;

-- ------------------------------------------------------------------------------
-- 3. Core Tables
-- ------------------------------------------------------------------------------

-- site_settings
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Md Arsh Eqbal',
  headline text default 'Full Stack Web Developer & AI Enthusiast',
  tagline text default 'Passionate about building practical tools that solve real-world problems.',
  bio text,
  photo_url text default '/profile/arsh-profile.jpg',
  location text default 'Jamshedpur, India',
  email text default 'arshh12145@gmail.com',
  phone text default '+91 9608846764',
  availability_text text default 'Open to internships and full-time roles',
  show_availability boolean default true,
  footer_text text default '© 2024 Md Arsh Eqbal. Built with Next.js and Tailwind CSS.',
  favicon_url text,
  meta_title text default 'Md Arsh Eqbal | Full Stack Developer',
  meta_description text default 'Personal portfolio of Md Arsh Eqbal, full-stack developer skilled in building AI-powered web applications and automation systems.',
  og_image_url text,
  status text not null check (status in ('draft', 'published')) default 'published',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- social_links
create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  label text not null,
  url text not null,
  icon text,
  visible boolean not null default true,
  status text not null check (status in ('draft', 'published')) default 'published',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text,
  category text default 'Full Stack',
  overview text,
  problem text,
  role text,
  key_features text[] not null default '{}',
  tech_stack text[] not null default '{}',
  cover_url text,
  gallery jsonb not null default '[]'::jsonb,
  video_url text,
  live_url text,
  repo_url text,
  award_badge text,
  start_date text,
  end_date text,
  featured boolean not null default false,
  meta_title text,
  meta_description text,
  status text not null check (status in ('draft', 'published')) default 'published',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- certificates
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null,
  issue_date text,
  expiry_date text,
  credential_id text,
  credential_url text,
  file_url text,
  file_type text not null default 'image',
  category text not null default 'development',
  visible boolean not null default true,
  skills text[] not null default '{}',
  instructor text,
  duration text,
  description text,
  status text not null check (status in ('draft', 'published')) default 'published',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- achievements
create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  position text,
  event text,
  organizer text,
  year text,
  description text,
  link_url text,
  image_url text,
  status text not null check (status in ('draft', 'published')) default 'published',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- skill_categories
create table if not exists public.skill_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  status text not null check (status in ('draft', 'published')) default 'published',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- skills
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.skill_categories(id) on delete set null,
  name text not null,
  icon text,
  level text default 'Advanced',
  status text not null check (status in ('draft', 'published')) default 'published',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- experiences
create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  type text default 'Internship',
  location text,
  start_date text,
  end_date text,
  is_current boolean default false,
  bullets text[] not null default '{}',
  logo_url text,
  status text not null check (status in ('draft', 'published')) default 'published',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- education
create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  degree text not null,
  field text not null,
  start_year text,
  end_year text,
  grade text,
  status text not null default 'pursuing',
  content_status text not null check (content_status in ('draft', 'published')) default 'published',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- resumes
create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  file_url text not null,
  is_active boolean not null default false,
  status text not null check (status in ('draft', 'published')) default 'published',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- media
create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  file_url text not null,
  file_name text not null,
  mime_type text,
  size bigint not null default 0,
  alt_text text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- messages
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  body text not null,
  is_read boolean not null default false,
  is_starred boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- page_sections
create table if not exists public.page_sections (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text not null,
  subtitle text,
  enabled boolean not null default true,
  status text not null check (status in ('draft', 'published')) default 'published',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- analytics_events
create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  path text not null,
  project_id uuid references public.projects(id) on delete set null,
  referrer text,
  device text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- audit_log
create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  table_name text not null,
  record_id text,
  before jsonb,
  after jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- testimonials (preserve original testimonials)
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  text text not null,
  avatar text,
  status text not null check (status in ('draft', 'published')) default 'published',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------------------------
-- 4. Set updated_at Triggers
-- ------------------------------------------------------------------------------
do $$
declare
  t text;
begin
  for t in select unnest(array[
    'admin_users', 'site_settings', 'social_links', 'projects',
    'certificates', 'achievements', 'skill_categories', 'skills',
    'experiences', 'education', 'resumes', 'media', 'messages',
    'page_sections', 'analytics_events', 'audit_log', 'testimonials'
  ]) loop
    execute format('
      drop trigger if exists trigger_set_updated_at on public.%I;
      create trigger trigger_set_updated_at
      before update on public.%I
      for each row execute function public.update_updated_at_column();
    ', t, t);
  end loop;
end;
$$;

-- ------------------------------------------------------------------------------
-- 5. Audit Log Trigger Function & Triggers
-- ------------------------------------------------------------------------------
create or replace function public.process_audit_log()
returns trigger as $$
begin
  if (TG_OP = 'DELETE') then
    insert into public.audit_log (action, table_name, record_id, before)
    values ('DELETE', TG_TABLE_NAME, OLD.id::text, to_jsonb(OLD));
    return OLD;
  elsif (TG_OP = 'UPDATE') then
    insert into public.audit_log (action, table_name, record_id, before, after)
    values ('UPDATE', TG_TABLE_NAME, NEW.id::text, to_jsonb(OLD), to_jsonb(NEW));
    return NEW;
  elsif (TG_OP = 'INSERT') then
    insert into public.audit_log (action, table_name, record_id, after)
    values ('INSERT', TG_TABLE_NAME, NEW.id::text, to_jsonb(NEW));
    return NEW;
  end if;
  return null;
end;
$$ language plpgsql security definer;

do $$
declare
  t text;
begin
  for t in select unnest(array[
    'site_settings', 'social_links', 'projects',
    'certificates', 'achievements', 'skill_categories', 'skills',
    'experiences', 'education', 'resumes', 'media', 'page_sections',
    'testimonials'
  ]) loop
    execute format('
      drop trigger if exists trigger_audit_log on public.%I;
      create trigger trigger_audit_log
      after insert or update or delete on public.%I
      for each row execute function public.process_audit_log();
    ', t, t);
  end loop;
end;
$$;

-- ------------------------------------------------------------------------------
-- 6. Row Level Security (RLS)
-- ------------------------------------------------------------------------------

-- Enable RLS on all tables
alter table public.admin_users enable row level security;
alter table public.site_settings enable row level security;
alter table public.social_links enable row level security;
alter table public.projects enable row level security;
alter table public.certificates enable row level security;
alter table public.achievements enable row level security;
alter table public.skill_categories enable row level security;
alter table public.skills enable row level security;
alter table public.experiences enable row level security;
alter table public.education enable row level security;
alter table public.resumes enable row level security;
alter table public.media enable row level security;
alter table public.messages enable row level security;
alter table public.page_sections enable row level security;
alter table public.analytics_events enable row level security;
alter table public.audit_log enable row level security;
alter table public.testimonials enable row level security;

-- Admin Users RLS
create policy "Admin users full access for admin"
  on public.admin_users for all using (public.is_admin());

-- Content Tables: Public SELECT published, Admin full access
-- site_settings
create policy "Public read published site_settings"
  on public.site_settings for select using (status = 'published');
create policy "Admin full access site_settings"
  on public.site_settings for all using (public.is_admin());

-- social_links
create policy "Public read visible social_links"
  on public.social_links for select using (status = 'published' and visible = true);
create policy "Admin full access social_links"
  on public.social_links for all using (public.is_admin());

-- projects
create policy "Public read published projects"
  on public.projects for select using (status = 'published');
create policy "Admin full access projects"
  on public.projects for all using (public.is_admin());

-- certificates
create policy "Public read visible certificates"
  on public.certificates for select using (status = 'published' and visible = true);
create policy "Admin full access certificates"
  on public.certificates for all using (public.is_admin());

-- achievements
create policy "Public read published achievements"
  on public.achievements for select using (status = 'published');
create policy "Admin full access achievements"
  on public.achievements for all using (public.is_admin());

-- skill_categories
create policy "Public read published skill_categories"
  on public.skill_categories for select using (status = 'published');
create policy "Admin full access skill_categories"
  on public.skill_categories for all using (public.is_admin());

-- skills
create policy "Public read published skills"
  on public.skills for select using (status = 'published');
create policy "Admin full access skills"
  on public.skills for all using (public.is_admin());

-- experiences
create policy "Public read published experiences"
  on public.experiences for select using (status = 'published');
create policy "Admin full access experiences"
  on public.experiences for all using (public.is_admin());

-- education
create policy "Public read published education"
  on public.education for select using (content_status = 'published');
create policy "Admin full access education"
  on public.education for all using (public.is_admin());

-- resumes
create policy "Public read published resumes"
  on public.resumes for select using (status = 'published');
create policy "Admin full access resumes"
  on public.resumes for all using (public.is_admin());

-- media
create policy "Public read media"
  on public.media for select using (true);
create policy "Admin full access media"
  on public.media for all using (public.is_admin());

-- messages: Public can INSERT only, Admin can read/update/delete
create policy "Public insert messages"
  on public.messages for insert with check (true);
create policy "Admin full access messages"
  on public.messages for all using (public.is_admin());

-- page_sections
create policy "Public read page_sections"
  on public.page_sections for select using (status = 'published' and enabled = true);
create policy "Admin full access page_sections"
  on public.page_sections for all using (public.is_admin());

-- analytics_events: Public can INSERT only, Admin can read
create policy "Public insert analytics_events"
  on public.analytics_events for insert with check (true);
create policy "Admin full access analytics_events"
  on public.analytics_events for all using (public.is_admin());

-- audit_log: Admin can read only
create policy "Admin read audit_log"
  on public.audit_log for select using (public.is_admin());

-- testimonials
create policy "Public read testimonials"
  on public.testimonials for select using (status = 'published');
create policy "Admin full access testimonials"
  on public.testimonials for all using (public.is_admin());

-- ------------------------------------------------------------------------------
-- 7. Supabase Storage Buckets & Policies
-- ------------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('public-media', 'public-media', true)
on conflict (id) do update set public = true;

insert into storage.buckets (id, name, public)
values ('private-drafts', 'private-drafts', false)
on conflict (id) do update set public = false;

-- Storage RLS
create policy "Public read public-media"
  on storage.objects for select
  using (bucket_id = 'public-media');

create policy "Admin write public-media"
  on storage.objects for all
  using (bucket_id = 'public-media' and public.is_admin());

create policy "Admin full access private-drafts"
  on storage.objects for all
  using (bucket_id = 'private-drafts' and public.is_admin());
