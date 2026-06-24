create table public.keluhan (
  id_keluhan text primary key,
  judul text not null check (char_length(judul) between 3 and 255),
  deskripsi text not null check (char_length(deskripsi) between 10 and 5000),
  tanggal_kirim timestamptz not null default now(),
  status text not null default 'DIKIRIM'
    check (status in ('DIKIRIM', 'MENUNGGU_VERIFIKASI', 'DIVERIFIKASI', 'DALAM_PENANGANAN', 'SELESAI', 'DITUNDA')),
  ringkasan text,
  kategori text,
  confidence_score numeric(4, 3) check (confidence_score between 0 and 1),
  prioritas text check (prioritas in ('Tinggi', 'Sedang', 'Rendah')),
  alasan text
);

create index keluhan_tanggal_kirim_idx on public.keluhan (tanggal_kirim desc);

alter table public.keluhan enable row level security;

revoke all on public.keluhan from anon, authenticated;
grant usage on schema public to service_role;
grant select, insert, update on public.keluhan to service_role;
