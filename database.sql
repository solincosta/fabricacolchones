CREATE TABLE cliente
(
    documento INTEGER PRIMARY KEY NOT NULL,
    nombre VARCHAR(155)
);

INSERT INTO cliente(
	documento, nombre)
	VALUES (?, ?);

CREATE TABLE colchon
(
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(55),
    imagen VARCHAR(255),
    precio INTEGER,
    medidas VARCHAR(25)
);

INSERT INTO colchon(id, nombre, imagen, precio, medidas)
	VALUES (1, 'Brisa Marina', 'https://solincosta.com/images/colchon_1.jpg', 1350000, '1.6Mx2Mx40CM'),
	(2, 'Arrecife', 'https://solincosta.com/images/colchon_2.jpeg', 1450000, '1.5Mx2Mx40CM'),
	(3, 'Brisa Caribe', 'https://solincosta.com/images/colchon_3.jpeg', 1550000, '1.5Mx2.2Mx30CM'),
	(4, 'Homologado', 'https://solincosta.com/images/colchon_4.jpeg', 1750000, '1.6Mx2Mx40CM'),
	(5, 'Suave Team', 'https://solincosta.com/images/colchon_5.jpeg', 1150000, '1.5Mx2Mx40CM'),
	(6, 'Comodisimo suave', 'https://solincosta.com/images/colchon_6.jpg', 2350000, '1.6Mx2.4Mx40CM'),
	(7, 'Relax Romance', 'https://solincosta.com/images/colchon_7.jpg', 2000000, '1.6Mx2Mx40CM');

CREATE TABLE colchonxcliente
(
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    documento_cliente INTEGER,
    id_colchon INTEGER,
    FOREIGN KEY (documento_cliente) REFERENCES cliente (documento),
    FOREIGN KEY (id_colchon) REFERENCES colchon (id)
);
