# Proyecto Fabrica colchones

## Clonar el repositorio
```
git clone https://github.com/solincosta/fabricacolchones.git
```

## Ingresar el proyecto
```
cd fabricacolchones
```

## Crear el archivo .env 
```
nano .env
```

## Agrega las credenciales de la BD OJO las de tu conexión y no las del PROFE
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=colchones
DB_USER=usuariocolchones
DB_PASSWORD=123456
PORT=3000
```

## Instalar dependencias
```
npm install
```

## arrancar servidor
```
npm start
```