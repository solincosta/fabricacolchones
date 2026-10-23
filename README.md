# Proyecto Fabrica colchones

## Clonar el repositorio
```
git clone https://github.com/solincosta/fabricacolchones.git
```

## Ingresar el proyecto
```
cd fabricacolchones
```

## Crear el archivo .env (Ajuste su archivo para conectar a su BD)
```
New FILE (.env)

dentro del archivo .env agregue lo siguiente. según sea su conexión:

DB_HOST=localhost
DB_PORT=3306
DB_NAME=colchones
DB_USER=usuariocolchones
DB_PASSWORD=123456
PORT=3000

```

## Agrega los registros de la BD
```
Cree una base de datos en MySQL que se llame: colchones y dentro de la BD ejecute 
el script que está dentro del archivo: database.sql
```

## Instalar dependencias
```
npm install
```

## arrancar servidor
```
npm start
```