# Aplicación Questions

## Requisitos

1. Node v20.11.0
2. NPM v 10.6.0
3. Angular 17+

## Pasos para la instalación de la apliación
Como paso previo cabe indicar que esta aplicación se conecta un API REST que proporciona los datos de la aplicación. Este servidor se encuentra configurado en la carpeta `environments` con los entornos para producción y desarrollo.

### 1. Descarga del codigo fuente
El código fuente se debe descargar en una carpeta del equipo local para poder iniciar el servidor de desarrollo.

### 2. Instalación de paquetes

    npm install

### Inicio del servidor desarrollo
El siguiente comando inicializa el servidor local angular en `http://localhost:4200` actualizando los cambios realizados en los archivos fuente.

    npm run dev 

o

    ng serve --configuration development

## Construye el proyecto para producción
El siguiente comando contruye el proyecto y almacena los artefactos construidos en la carpeta `dist/`.

    ng build
