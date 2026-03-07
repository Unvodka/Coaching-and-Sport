-- Subscriptions table — synced from Stripe webhooks
create table if not exists public.subscriptions (
  id                    text primary key,          -- Stripe subscription ID
  user_id               uuid not null references public.profiles(id) on delete cascade,
  stripe_customer_id    text not null,
  status                text not null,             -- active | canceled | past_due | trialing ...
  program_title         text not null,
  amount_cents          int  not null,
  currency              text not null default 'eur',
  interval              text not null default 'month',
  minimum_months        int  not null default 1,   -- 1 for Coaching en Ligne, 3 for others
  current_period_start  timestamptz,
  current_period_end    timestamptz,
  cancel_at_period_end  boolean not null default false,
  canceled_at           timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- Payment history table
create table if not exists public.subscription_payments (
  id              text primary key,   -- Stripe invoice ID
  subscription_id text not null references public.subscriptions(id) on delete cascade,
  user_id         uuid not null references public.profiles(id) on delete cascade,
  amount_cents    int  not null,
  currency        text not null default 'eur',
  status          text not null,      -- paid | open | failed
  invoice_url     text,
  invoice_pdf     text,
  paid_at         timestamptz,
  created_at      timestamptz not null default now()
);

-- RLS
alter table public.subscriptions enable row level security;
alter table public.subscription_payments enable row level security;

-- Users can only read their own data
create policy "Users read own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create policy "Users read own payments"
  on public.subscription_payments for select
  using (auth.uid() = user_id);

-- Indexes
create index if not exists subscriptions_user_id_idx on public.subscriptions(user_id);
create index if not exists subscription_payments_user_id_idx on public.subscription_payments(user_id);
create index if not exists subscription_payments_sub_id_idx on public.subscription_payments(subscription_id);
