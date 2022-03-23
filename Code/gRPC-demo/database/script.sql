create database so1_ejemplo;

use so1_ejemplo;

DROP TABLE IF EXISTS  Caso;

CREATE TABLE Caso (
  id            INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name          VARCHAR(40)        NULL,
  location      VARCHAR(40)        NULL,
  age           INT                NULL,
  infected_type VARCHAR(40)        NULL,
  state         VARCHAR(20)        NULL
);

