# APP-DIVEN

APP-DIVEN es un proyecto escrito en [REACT NATIVE ](https://reactnative.dev/docs/getting-started) y [EXPO](https://docs.expo.dev/#quick-start) que implementa la aplicación móvil de DIVEN.

## Requisitos desarrollo

- Node>= v16.14.0
- NPM >= 8.3.1
- Yarn >=1.22.17
- Expo >=5.3.0


## Scripts disponibles

En el directorio del proyecto, puede ejecutar:

### `yarn`

Para instalar las dependencias necesarias.

### `expo start`

Ejecuta la aplicación en el modo de desarrollo.\
Abra [http://localhost:19002](http://localhost:19002) para verlo en su navegador.

La página se volverá a cargar cuando realice cambios.\
También puede ver errores de pelusa en la consola.\
En su móvil, instale [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US) para ver los cambios en este dispositivo escaneando el código qr generado.

### `expo android`

Inicia el corredor de prueba en el emulador de android.\
Consulte la sección sobre [ejecutar pruebas en android](https://docs.expo.dev/workflow/android-studio-emulator/) para obtener más información.

### `expo ios`

Inicia el corredor de prueba en el emulador de ios.\
Consulte la sección sobre [ejecutar pruebas en ios](https://docs.expo.dev/workflow/ios-simulator/) para obtener más información.


### `expo eject`

**Nota: esta es una operación unidireccional. ¡Una vez que te 'expulsas', no puedes volver atrás!**

Si no está satisfecho con la herramienta de compilación y las opciones de configuración, puede "expulsar" en cualquier momento. Este comando eliminará la dependencia de compilación única de su proyecto.

En cambio, copiará todos los archivos de configuración y las dependencias transitivas (webpack, Babel, ESLint, etc.) directamente en su proyecto para que tenga control total sobre ellos. Todos los comandos, excepto "expulsar", seguirán funcionando, pero apuntarán a los scripts copiados para que pueda modificarlos. En este punto estás por tu cuenta.

No tienes que usar nunca `eject`. El conjunto de funciones seleccionadas es adecuado para implementaciones pequeñas y medianas, y no debe sentirse obligado a usar esta función. Sin embargo, entendemos que esta herramienta no sería útil si no pudiera personalizarla cuando esté listo para hacerlo.


### Despliegue

**Nota: Previamente tiene que tener instalado las dependencias**

1. Generar las credenciales de autenticacion en google.\
   Consulte la sección sobre [authentication con google ](https://docs.expo.dev/guides/authentication/#google) para obtener más información.

3. Copie el archivo .env.example a la ruta raíz del proyecto con el nombre .env

4. Llene las siguientes variables con la información requerida.

  - **API_URL:**  URL del **API RESET** de diven, por ejemplo https://api-diven.midominio.com
  - **EXPO_CLIENT_ID:** Client id generado en google para expo
  - **IOS_CLIENT_ID:** Client id generado en google para ios
  - **ANDROID_CLIENT_ID:** Client id generado en google para android

4. En el archivo app.json modifique *com.devsoftec.diven* por su dominio.
5. Ejecute ` expo build:android -t apk`, este generara una apk en los servidores de expo, la cual debera instalar en sus dispositivos.
   Consulte la sección sobre [despliegue](https://docs.expo.dev/build/introduction/) para obtener más información de como compilar para android and ios.

## License
The APP-DIVEN is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).



