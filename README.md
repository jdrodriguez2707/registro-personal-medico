# Registro Personal Médico

Este proyecto es un sistema de registro de personal médico que utiliza NodeJS y XAMPP con PHPMyAdmin para la base de datos.

## Funcionalidades

El sistema de registro personal médico permite a los usuarios realizar las siguientes acciones:

- Registrar nuevo personal médico con sus datos personales.
- Ver la lista completa del personal médico registrado y de las fechas y horas de ingresos y salidas.
- Agregar fecha y hora de ingresos y salidas del personal del hospital.
- Eliminar personal médico del registro junto con sus registros de ingresos y salidas del hospital.

## Requisitos

Para ejecutar este proyecto en tu máquina, necesitarás tener instalados los siguientes componentes:

- NodeJS: Puedes descargarlo e instalarlo desde [https://nodejs.org](https://nodejs.org).
- XAMPP: Puedes descargarlo e instalarlo desde [https://www.apachefriends.org](https://www.apachefriends.org).

## Pasos para ejecutar el proyecto

Sigue estos pasos para ejecutar el proyecto en tu máquina:

1. Clona este repositorio en tu máquina local.
2. Abre XAMPP y asegúrate de que los servicios de Apache y MySQL estén activos.
3. Crea una base de datos en PHPMyAdmin con el nombre `registro_personal_medico`.
4. Importa el archivo `registro_personal_medico.sql` ubicado en la carpeta `database` a la base de datos que acabas de crear.
5. Abre una terminal y navega hasta la carpeta del proyecto.
6. Ejecuta el siguiente comando para instalar las dependencias del proyecto:

  ```
  npm install
  ```

7. Configura la conexión a la base de datos en el archivo `server.js` ubicado en la raiz del proyecto. Reemplaza los valores de `user` y `password` con tu username y password de PHPMyAdmin, respectivamente. Por ejemplo, si tu username es `phpmyadmin` y tu password es `frosty2707`, la configuración se vería así:
  
    ```javascript
    const connection = createConnection({
      host: "localhost",
      user: "phpmyadmin", // Reemplaza por tu username de PHPMyAdmin
      password: "frosty2707", // Reemplaza por tu password de PHPMyAdmin
      database: "registro_personal_medico",
    });
    ```
8. Ejecuta el siguiente comando para iniciar el servidor:

  ```
  npm start
  ```

9. Abre tu navegador web y visita [http://localhost:3000](http://localhost:3000) para acceder al sistema de registro personal médico.

¡Listo! Ahora puedes utilizar el sistema de registro personal médico en tu máquina local.

## Integrantes del equipo de desarrollo
- COELI GABRIELA CORZO ROMERO - ID: 918728

- SHARET AILYN VARGAS PÉREZ - ID: 942942

- JIMMY ALEXANDER TEJEDOR ROMERO - ID: 919789

- JOHAN DAVID RODRIGUEZ CASTRO - ID: 915940

Muchas gracias por visitar nuestro proyecto. ¡Esperamos que lo disfrutes! 😊



