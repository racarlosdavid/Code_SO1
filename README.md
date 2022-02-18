# CLASE 4 SO1 1S 2022
Los temas vistos en esta sesión fueron docker network, los distintos tipos de drives que existen, también se enseñó docker-compose, una herramienta muy útil de docker que permite la ejecución de múltiples contenedores de tal forma que permite la ejecución de múltiples contenedores de una forma rápida y sencilla, por último en esta sesión se dio la explicación de la primera práctica del laboratorio.

## Herramientas Utilizadas
- [ Install Docker ](https://docs.docker.com/get-docker/)
- [ Install Docker Compose](https://docs.docker.com/compose/install/)
- [ Docker Volumes ](https://docs.docker.com/storage/volumes/)

## Recursos
- [ Grabación ](https://drive.google.com/file/d/1IFL6Q6qWfyiWBAYQs0RI30L6SUxiPL8X/view?usp=sharing)
- [ Slides ](/Slides)
- [ Código ](/Code)

## Ejemplo
El ejemplo realizado es modulo de kernel que imprime la hora del sistema en un archivo llamado timestamps ubicado en /proc, tambien se desarrollo una api en NodeJS para poder obtener dicha informacion y que pueda ser consumida por el cliente.

## Arquitectura 
![Alt text](Img/arquitectura.png)

### Comandos Docker Networks
```sh
#PREPARACION DEL ENTORNO DE TRABAJO
sudo apt-get update
sudo apt-get install gcc
sudo apt-get install g++
sudo apt-get install make
sudo apt-get install build-essential linux-headers-`uname -r`

#Para compilar timestamps.c
make all

#Para limpiar los archivos generados al hacer make all
make clean

#Para imprimir en pantalla los logs del buffer del sistema operativo
sudo dmesg

#Para limpiar los logs del buffer del sistema operativo
sudo dmesg -C

#Para insertar el modulo al kernel
sudo insmod [nombre_modulo].ko

#Para quitar el modulo del kernel
sudo rmmod [nombre_modulo].ko

#Para revisar los datos del archivo que genera nuestro modulo con la data 
cat /proc/[nombre_modulo]

#Para ver todos los modulos
lsmod
```
