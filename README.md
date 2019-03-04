# MBot :speech_balloon:
Un chatbot muy básico escrito escrito en Javascript para insertar en algun blog,se basa en reconocer respuesta ya presente en la base de datos y lanzar una respuesta aleatoria.


Es algo estupido solo para entretenerse un rato o decorar y modificar a su antojo :joy:


:arrow_right:**Algo sobre el funcionamiento principal**

Su funcionamiento rige en un sistema de Consigna-Respuesta
Ejemplo:
en la base de datos(db_mbot.js) se encuentran los siguientes items:
```
      "pregunta-animo":["como estas?", "como andas?", "como va?"],
      "respuesta-animo":["Se supone que bien?", "Estoy Bien", "Todo Bien"]
```

Automaticamente si se encuentra la pregunta de 'animo' se busca la respuesta 'animo' respondiendo alguna aleatoria de esta.

En el siguiente caso el '*' seguido del tipo, hereda tales expresiones.
Si se saluda con un insulto, el bot usara la misma expresion que reconoce para contestar.
```
      "saludo-insulto":["hola marsupial","hola zopenco"],
      "respuesta-saludo insulto":["*saludo-insulto"],
 ```
 :fast_forward:**Variables globales y personalizadas**
 [22/02/2019] Sistema de variables globales con el prefijo '$', Conteniendo MBOT_VARS el indice 'nombre_usuario' y este el valor 'Guillermo' retornará "Hola Guillermo"
 
 ```
      "saludo-bienvenida":["Hola $nombre_usuario!"],
 ```
 
 :fast_forward:**Asociaciones**
 [28/02/2019] Asociaciones, durante el transcurso de la conversación, si se encuentra un patrón reconocible en la base de datos, MBOT_ASOC, esta retornará una respuesta especifica.
 Ejemplo:
 ```
      Usuario:Hola, como estas?
      MBot:Hola! Bien y tu?
      Usuario:Bien
      MBot:Me alegro! :D
 ```

 :fast_forward: **Conservar Formato**
 Si se quiere conservar el formato en la respuesta que se va a dar, se usa el prefijo '+', por ejemplo
 en el caso en el que el bot tenga que contestar con un link y este tenga que respetar las mayusculas.

 ```
      "saludo-insulto":["cancion de youtube"],
      "respuesta-saludo insulto":["+https://www.youtube.com/watch?v=DkeiKbqa02g"],
 ```
retornara el link con las mayusculas necesarias

:fast_forward:**Comandos**
  Tambien admite el uso de comandos de control con el prefijo '#', tales como:<br/>
 **#depurar: Activa o desactiva la depuracion<br/>**
 **#clear:   Borrar mensajes en pantalla<br/>**
 **#olvidar: Borra de la memoria las relaciones que haya establecido hasta el momento<br/>**
 
:arrow_right:**Uso**

Solamente se crea un div con el id "mbotConversacion" y se importan la db y el script correspondiente:

```
<body>
<div id="mbotChat"></div>
</body>

<script type="text/javascript" src="db_mbot.js"></script>
<script type="text/javascript" src="mbot.js"></script>
<link   type='text/css'  href='estilo.css' rel='stylesheet' />
```

:arrow_right:**Opcional**
Cambiar la linea donde importa el"db_mbot.js" por el de esta repo para mantenerlo actualizado.

```
<div id="mbotChat"></div>
<script src='https://rawgit.com/srbill1996/MBot/master/mbot.js' type='text/javascript'></script>
<script src='https://rawgit.com/srbill1996/MBot/master/db_mbot.js' type='text/javascript'></script>
<link href='https://rawgit.com/srbill1996/MBot/master/estilo.css' rel='stylesheet' type='text/css'/>
<link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet"/>
```
