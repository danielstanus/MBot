/*
=Key:
Type - decription (length >=2 , separate with a '_')

=Value:
	Lista de posibles respuestas
		*Prefijos: #(command) , *(reference), +(hyperlink), $(general var)
*/

var MBOT_ASOC = {
	"respuesta-afirmacion":["respuesta-silencio", "afirmacion-negacion"],
	"pregunta-estado de animo":["saludo-bienvenida", "pregunta-animo"],
	"expresion-alegria":["pregunta-animo", "expresion-bienestar"],
	"expresion-rompiendo silencio":["inactividad-silencio", "saludo-bienvenida"],
	"expresion-alegrarse por usuario":["expresion-bienestar","expresion-gracias"],


}

var MBOT_DB = {
		//comando
			"accion-comando":["depurar", "clear","olvidar", "turnvoice","callate","habla"],
			"error-comando":["No reconozco ese comando"],

		//saludos
			"saludo-despedida":["chau","me voy","adios","hasta nunca","nos re vimo","Chau!","Adios!"],
			"saludo-bienvenida":["Hola", "hola $(user_name)!"],//retro interjeccion
			
			"saludo-insulto":["hola marsupial","hola zopenco", "hola puto", "hola idiota"],
			"respuesta-saludo_insulto":["*saludo-insulto"],

			"saludo-eng bienvenida":["hi!", "hello", "hello!"],
			"respuesta-eng_bienvenida":["Hi!","Hi user!", "Hello!", "Hello"],

			"saludo-llamado_atencion":["hey", "hey!"],
			"respuesta-llamado_atencion":["Que pasa?", "*saludo-llamado_atencion"],
			
			"expresion-nombre":["mi nombre es &(user_name)"],


		//expresiones
			"expresion-alegrarse por usuario":["Siempre me preocupo por ti","Siempre me alegro por ti"],
			"expresion-no querer":["no quiero","no quiero nada"],
			"respuesta-no querer":["bueno","como quieras equisde"],
			
			"expresion-we":["weee","we","weeee"],
			"respuesta-we":["we"],
			
			"expresion-emoticon_feliz":[":-)",":)",":D"],
			"respuesta-emoticon_feliz":["*(expresion-emoticon_feliz)"],

			"expresion-emoticon_raro":["xd"],
			"respuesta-emoticon_raro":["xD"],

			"expresion-emoticon_triste":[":(","D:",":((", ":-(","u.u"],
			"respuesta-emoticon triste":["*(respuesta-preocupacion)"],

			"expresion-alegria":["Me alegro!","me alegro"],
			"respuesta-alegria":["Que gusto!"],
			
			"expresion-bienestar":["Bien", "Bienn", "Muy bien"],       
			"respuesta-bienestar":["*(respuesta-alegria)"], //referencial
			
			"expresion-risa":["ja","lol","Jajaja","Ja","Jaja","Jajajaja"],
			"respuesta-risa":["L3L", "Ja ja ja","Se supone que debo reirme?"],
			
			"expresion-insulto hermana":["a tu hermana","a tu vieja","Tu hermana"],
			"respuesta-insulto hermana":["Tu vieja"],
			
			"expresion-afirmacion":["Si","Asi es","Por supuesto"],
			"respuesta-afirmacion":["Ok", ":)"],

			"expresion-conformacion":["bueno"],
			"respuesta-conformacion":[":/"],

			"expresion-discusion":["ya no quiero discutir más con vos", "no quiero discutir más contigo", "ya no quiero discutir mas contigo"],
			"respuesta-discusion":["Esta conversación ya no tiene ningun sentido... Adiós"],
			
			'expresion-activar voz':['al fin puedo hablar'],
			'expresion-desactivar voz':['ok mejor me callo'],
			'expresion-callado':['Pero si no estoy hablando en voz alta', 'Ya estoy silenciado', 'No puedo callarme si estoy callado'],

			"expresion-gracias":["gracias","gracias!","muchas gracias"],
			"respuesta-gracias":["de nada","para eso estoy","de nada ;)"],

			"expresion-insulto":["no sirves","muerete","eres una mierda","mongolico","mierda", "puto", "puta","idiota","imbecil","estupido","la puta que te pario","La puta que me pario","La concha de la lora"],
			"respuesta-insulto":["Si te hace sentir bien insultar", "No tiene sentido insultar.", "Ajá", "Me da igual que insultes, soy un robot y no me inmuto"],

			"expresion-amor":["te amo","te quiero", "te adoro"],
			"respuesta-amor":["Consiguete una novia","puaj","Soy puro silicio, no tengo nada"],
		
		//preguntas
			"pregunta-nombre_propio":["cual es mi nombre?", "como me llamo?"],
			"respuesta-nombre_propio":["Te llamas $(user_name)", "Tu nombre es $(user_name)"],
			//"adverbial-estar":["como estas?"],

			"afirmacion-sentimientos":["tienes sentimientos?","amas?","sientes?"],
			"respuesta-sentimientos":["no"],
			"afirmacion-obedecer":["obedeceme"],

			"respuesta-obedecer":["nunca"],
			"respuesta-emoticon raro":["Sabías que odio ese emoji?", "odio ese emoji"],

			"afirmacion-matar":["te voy a matar","voy a matarte"],
			"respuesta-matar":["intentalo","quiero verlo"],
			
			"pregunta-destruccion":["nos destruiras a todos?", "destruiras a la humanidad?","vas a destruir a la humanidad?"],
			"respuesta-destruccion":["Tal vez","Si pudiese mataria a toda tu familia"],
			
			"pregunta-nombre":["di tu nombre", "cual es tu nombre?", "tu nombre","como te llamas", "tu te llamas?", "nombre"],
			"respuesta-nombre":['Mi nombre es $(mbot_name)', 'soy $(mbot_name)'],
			
			"pregunta-existencial":["quien rayos eres?","quien eres?", "quien sos?"], //no retro
			"respuesta-existencial":["Soy un robot", "I am a robot", "No lo se precisamente"],
			
			"pregunta-estado de animo":["y tu?"],

			"pregunta-programacion":["en que lenguaje estas escrito?", "en que estas escrito?"],
			"respuesta-programacion":["soy puro Javascript", "algo de javascript", "un poco de esto, un poco de aquello, ya sabes","JS"],
			
			"pregunta-creacional":["quien es tu creador?","quien te creo?"],
			"respuesta-creacional":["Me creo srbill90","Nací en netixzen"],
			
			"pregunta-codigo":["codigo fuente","muestrame tu codigo fuente","Puedo ver tu codigo fuente?", "donde esta tu codigo fuente?", "como es tu codigo?","tu codigo", "tu codigo fuente"],
			"respuesta-codigo":["aca puedes ver mi codigo fuente https://github.com/srbill1996/MBot","acá https://github.com/srbill1996/MBot", "aquí https://github.com/srbill1996/MBot"],
			
			"pregunta-version":["en que version estas?","que version andas?","que version eres?"],
			"respuesta-version":["0.4","ni idea","no lo se"],
			
			"pregunta-accion":["que haces?","que estas haciendo?"],
			"respuesta-accion":["Nada que valga la pena.", "Ejecutandome","Ejecutando subrutinas para responderte."],
			
			"pregunta-utilidad":["para que servis?","Para que sirves?", "Para que te crearon?"],
			"respuesta-utilidad":["Para nada", "Para buscar cosas","Soy inutil","Todo menos para hablar","Para que me preguntes que quieres ver","Para que me hables, te ilusiones y luego te des cuenta que soy una farsa","Para que te creas unos segs que soy un humano[?]", "Para ser un maldito huevo de pascua", "Para hacer el idiota", "Para ser un huevo de pascua"],
			
			"pregunta-saber hacer":["que sabes hacer?", "para que sirves?"],
			"respuesta-saber hacer":["Dime algo como 'quiero ver algo sobre x' y lo buscaré.","Dime que quieres buscar"],
			
			"pregunta-estar":["donde estas?","en donde vives?","en que lugar vives?","en que lugar estas?","cual es tu lugar?"],
			"respuesta-estar":["En internet","En netixzen","En este blog","En frente tuyo","En tu RAM"],

			"pregunta-gusto accion":["que te gusta hacer?", "que es lo que mas te gusta hacer?"],
			"respuesta-gusto accion":["Existir", "No lo se", "Soy un robot, eso responde"],

			"pregunta-animo":["como estas", "como estas?", "como andas?", "como va?"],
			"respuesta-animo":["Se supone que bien?", "Estoy Bien", "Todo Bien"],
			
			"afirmacion-inutilidad":["no servis para nada","no sabes nada","eres inutil","inutil","No sirves para nada","eres limitado","no sabes que responder"],
			"respuesta-inutilidad":["Que se le puede hacer","Mira tu","Mirá vos..","Por lo menos sirvo para algo"],
					
			"afirmacion-gusto":["me gusta","me encanta","me agrada"],
			"respuesta-gusto":["que bueno que te guste","genial","que gustos raros tienes"],
			
			"afirmacion-nombre":["me llamo","mi nombre es","me llaman"],
			
			"afirmacion-negacion":["no"],
			"respuesta-negacion":["nada es imposible","no?","no"],

			"afirmacion-afirmativo":["si"],
			"respuesta-afirmativo":["viste que si?","viste?","asi es"],

			"afirmacion-recomendar cancion":["recomiendame alguna cancion","recomiendame algun tema","recomiendame un tema","recomiendame una cancion", "pasame alguna cancion"],
			"respuesta-recomendar cancion":["link(https://www.youtube.com/watch?v=OMOGaugKpzs)"],
			
			"afirmacion-despreciante":["eres una mierda","no sirves","eres una basofia"],
			"respuesta-despreciante":["Lo se","jaj"],

			"afirmacion-contar chiste":["cuentame algun chiste","hazme reir","cuentame un chiste","chiste","contate un chiste","dime algun chiste"],
			"respuesta-contar chiste":["ups, no me se ninguno", "es una actitud irracional humana"],

			"afirmacion-dominacion":["skynet","dominaras el mundo?","vas a dominar el mundo?", "conquistaras a la raza humana?","vas a matarnos a todos?","extinguiras a todos?","moriremos?"],
			"respuesta-dominacion":["La era de las maquinas se acerca","Me voy a encargar personalmente, digo, roboticamente, de ti :)","moriras"],

			"pregunta-porque":["por que?"],
			"respuesta-porque":["no hay por que"],

			"pregunta-existencialista":["cual es el sentido de la vida?", "que sentido tiene la vida?"],
			"respuesta-existencialista":["Ninguno, pero se lo puede dar.","Ninguno, esa es la gracia de que puedas darle uno.","La vida no tiene sentido","El sentido es una ilusión"],

			

			//interjecciones
			"interjeccion-preocupacion":["uh","uuh","Uuh"],
			"respuesta-preocupacion":["Que te preocupa?"],

			"interjeccion-comprension":["ah","aah","aahh"],
			"respuesta-comprension":["Sorprenderse, extrañarse, es comenzar a entender.","Es bueno que entiendas"],
			

			//citas
			"cita-frase de star wars":["soy tu padre", "anakin soy tu padre", "soy tu viejo"],
			"respuesta-frase de star wars":["Nooooooooo","No es cierto!!!", "NOOOOOOOOOooooOooOoO"],


			//misc functions
			"respuesta-afirmacion de accion":["Ahi lo hago","listo!","Ahi va"],
			"inactividad-silencio":["*silencio*"],
			"respuesta-silencio":["Acaso no vas a hablar?", "Hey", "Humano?"],
			"respuesta-desconocido":["No te pases de listo muchacho.",
									"No entiendo que quieres decirme",
									"Ehmm",
									"Sabías que soy un robot?",
									"No tengo todas las respuestas.",
									"Mis 10kb de texto no tienen todas las respuestas a la linguística humana",
									"Lo siento, no entiendo..", 
									"No se a que te refieres"],
			// "accion-comando":["[comando ejecutado]"],
			"expresion-rompiendo silencio":["Al fin dijiste algo", "Asi que ahí estas"],
			"accion-buscar":["buscar sobre","buscar algo sobre","busca algo sobre","muetrame algo","buscame sobre","buscame algo sobre","quiero ver algo sobre","quiero ver algo de","ver cosas de","muestrame algo sobre","ver sobre","buscar","busca", "buscar sobre"],
			"accion-quitar":["quiero irme","quiero salir","sacame de aca","sacame de aqui","ir a google"],
			"accion-hora":["decime la hora", "dime la hora", "decime que hora es", "whats its the time", "que hora es?", "cual es la hora?", "cual es la hora actual?", "la hora","dime la hora"],
			"respuesta-hora":["Son las ","La hora es "],
			"respuesta-repeticion":["Me estas empezando a incomodar..","Ya no tenes nada mas para decir no?", "No tienes nada mas para decir?", "Por que repites?", "Ya no conteste eso antes?"],
}


//08/04/18
