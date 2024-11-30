CREATE DATABASE sistema_cadastro;
USE sistema_cadastro;
CREATE TABLE sistema_cadastro.titulares (
	matricula varchar(15) NOT NULL,
	nome varchar(50) NOT NULL,
	data_nascimento DATE NULL,
	cpf varchar(15) NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;
