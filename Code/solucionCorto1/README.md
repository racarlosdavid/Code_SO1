# SO1_Corto1
Examen Corto 1

# Instrucciomes
- modificar el endpoint /nota con el nombre del estudiante.
- agregar un dockerfile 
- crear la imagen del backend con el siguiente formato "USER-DOCKERHUB"/corto1_"CARNET"
- hacer push a dockerhub u otro registry

# Restricciones 
- en el endpoint /nota unicamente se debe modificar el nombre
- el numero de carnet debe ser pasado por medio de variable de entorno en el comando docker run

# Entregable en UEDi
- comando que permita correr el contenedor y este debe estar expuesto en el puerto 80

docker run -d -p 80:5001 --name 201213132 -e CARNET=2022 racarlosdavid/corto1_201213132