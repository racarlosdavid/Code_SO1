# CLASE 8 SO1 1S 2022
En esta sesión se resolvieron dudas sobre la primera fase del proyecto y se enseñó a los estudiantes sobre los rcp ( llamadas a procedimiento remotos) y también se enseñó el framework gRCP el cual es una herramienta muy útil para implementar los rpc.


## Recursos
- [ Grabación ](https://drive.google.com/file/d/1If__e6eHlhXrpUIeF1CGEPBNf2XcABfn/view?usp=sharing)
- [ Tutorial gRPC - NodeJS ](https://youtu.be/5xlwFWakNvA)
- [ Tutorial gRPC - Go ](https://youtu.be/-4gbPEqbeVg)
- [ Slides ](/Slides)
- [ Código ](/Code)


## Arquitectura 
![Alt text](Img/arquitectura.png)

### Comandos utilizados para el ejemplo de gRPC
```sh
# Iniciamos el proyecto gRPC-Client-api
mkdir gRPC-Client-api
cd gRPC-Client-api
npm init -y
npm install express cors morgan
npm install @grpc/grpc-js @grpc/proto-loader async google-protobuf lodash minimist

# Iniciamos el proyecto gRPC-Server 
mkdir gRPC-Server
cd gRPC-Server
npm init -y
npm install mysql
npm install @grpc/grpc-js @grpc/proto-loader async google-protobuf lodash minimist

# Container mysql
docker run --name dbpruebas -p 3306:3306 -e MYSQL_ROOT_PASSWORD=databasepass -d mysql:5.7
docker exec -it dbpruebas mysql -u root -p
```
