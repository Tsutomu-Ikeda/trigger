create database if not exists buttyake;
use buttyake;

-- test table
CREATE TABLE if not exists test (
    id INT(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(64) NOT NULL,
    PRIMARY KEY (id)
);