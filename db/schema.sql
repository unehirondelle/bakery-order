drop database if exists cakes_db;
create database cakes_db;
use cakes_db;

create table cakes
(
    id      int auto_increment primary key,
    name    varchar(30) not null,
    layers  varchar(30) not null,
    filling varchar(30) not null,
    size    int         not null,
    price   int         not null,
    route   varchar(30) not null
);
