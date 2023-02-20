-- Deploy devBoard:init_db to pg

CREATE ROLE  admin_devboard WITH LOGIN PASSWORD 'devboard';

CREATE DATABASE devboard OWNER admin_devboard;

