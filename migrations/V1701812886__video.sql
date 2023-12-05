CREATE TABLE video (
id serial primary key,
embed_url text not null,
image_url text not null,
title text not null,
created_at timestamp without time zone default now()
);