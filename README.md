# CLASE 4 SO1 1S 2022
Los temas vistos en esta sesion fueron docker network, los distintos tipos de drives que existen, tambien se enseño docker-compose, una herramienta muy util de docker que permite la ejecucion de multiples contenedores de tal forma que permite la ejecucion de multiples contenedores de una forma rapida y sencilla, por ultimo en esta sesion se dio la explicacion de la primera practica del laboratorio.

## Herramientas Utilizadas
- [ Install Docker ](https://docs.docker.com/get-docker/)
- [ Install Docker Compose](https://docs.docker.com/compose/install/)
- [ Docker Hub ](https://hub.docker.com/)
- [ Docker Volumes ](https://docs.docker.com/storage/volumes/)

## Recursos
- [ Grabación ](https://drive.google.com/file/d/1VHq8T9H75LLosdlIzEZPAGyktL4erTyu/view?usp=sharing)
- [ Slides ](/Slides)
- [ Código ](/Code)

## Ejemplo
El ejemplo realizado es una aplicacion que registra estudiantes, para esto se cuenta con un frontend desarrollado en React, un servidor desarrollado en NodeJS y como motor de base de datos se utiliza un contenedor de mongoDB, se crean los Dockerfiles del backend y del frontend para poder crear los contenedores y finalmente se tiene una arquitectura como se puede visualizar en la imagen.

## Arquitectura 
![Alt text](Img/arquitectura.png)

### Comandos Docker Networks
```sh
# Para listar las networks utilizamos:
docker network ls

# Para crear una nueva network utilizamos:
# Si no especificamos el driver, se usar por defecto bridge
docker network create <NETWORK_NAME>

# Para crear una nueva network especificando el driver utilizamos:
docker network create --driver <DRIVER_NAME> <NETWORK_NAME>

# Para inspeccionar una network utilizamos:
docker inspect <NETWORK_ID|NETWORK_NAME>

# Para conectar un container a una network utilizamos: 
docker network connect <NETWORK_ID|NETWORK_NAME> <CONTAINER_ID|CONTAINER_NAME>

# Para desconectar un container a una network utilizamos: 
docker network disconnect <NETWORK_ID|NETWORK_NAME> <CONTAINER_ID|CONTAINER_NAME>

# Si quiero conectar un container a una network cuando ejecuto el comando run utilizamos el parametro --network:
--network <NETWORK_ID|NETWORK_NAME>

# Para eliminar una network utilizamos:
docker network rm <NETWORK_ID|NETWORK_NAME>
```

### Docker Compose
```sh
# Si el archivo yml se llama docker-compose 
# Agregamos --build si queremos que las imagenes se construyan nuevamente
docker-compose up -d
docker-compose down

# Si el archivo yml tiene otro nombre diferente a docker-compose
# Agregamos --build si queremos que las imagenes se construyan nuevamente
docker-compose -f <NAME>.yml up -d
docker-compose -f <NAME>.yml down
```