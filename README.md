# CLASE 3 SO1 1S 2022
En esta sesión aprendimos como crear imagenes de nuestras aplicaciones utilizando dockerfiles, tambien se realizo un ejemplos en el que se demuestra como desplegar una arquitectura sencilla compuesta por un frontend, backend y una base de datos utilizando contenedores, por ultimo se enseño como llevar esta arquitectura del entorno de desarro a un entorno de produccion en una maquina virtual en la nube.

## Herramientas Utilizadas
- [ Install Docker ](https://docs.docker.com/get-docker/)
- [ Docker Hub ](https://hub.docker.com/)
- [ Docker Volumes ](https://docs.docker.com/storage/volumes/)

## Recursos
- [ Grabación ](https://youtu.be/ZDORFteyMD8)
- [ Tutorial Dockerfile ](https://youtu.be/ubw9DuLX3_o)
- [ Slides ](/Slides)
- [ Código ](/Code)

## Ejemplo
El ejemplo realizado es una aplicacion que registra estudiantes, para esto se cuenta con un frontend desarrollado en React, un servidor desarrollado en NodeJS y como motor de base de datos se utiliza un contenedor de mongoDB, se crean los Dockerfiles del backend y del frontend para poder crear los contenedores y finalmente se tiene una arquitectura como se puede visualizar en la imagen.

## Arquitectura 
![Alt text](Img/arquitectura.png)

### Custom Images - Opcion 1
```sh
# Para crear una imagen nos ubicamos en donde se encuentra el dockerfile utilizamos:
# agregamos --no-cache al comando docker build si queremos que se cree una imagen nueva siempre.
# agregamos --pull al comando docker build si queremos que la imagen base se descarge nuevamente.
#Build Image
docker build -t <IMAGE_NAME>:<TAG> .

#Tag Image
docker tag <IMAGE_NAME>:<TAG> <DOCKERHUB_USER>/<IMAGE_NAME>:<TAG>

# Push Container to Registry
docker login
docker push <DOCKERHUB_USER>/<IMAGE_NAME>:<TAG>
```

### Custom Images - Opcion 2
```sh
# Para crear una imagen nos ubicamos en donde se encuentra el dockerfile utilizamos:
# agregamos --no-cache al comando docker build si queremos que se cree una imagen nueva siempre.
# agregamos --pull al comando docker build si queremos que la imagen base se descarge nuevamente.
#Build and Tag Image
docker build -t <DOCKERHUB_USER>/<IMAGE_NAME>:<TAG> .

# Push Container to Registry
docker login
docker push <DOCKERHUB_USER>/<IMAGE_NAME>:<TAG>
```
