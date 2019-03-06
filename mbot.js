/* minimalBot rev6 - code by srbill1990 */
'use strict'
var gadgetConversacion = document.getElementById('mbotChat')

gadgetConversacion.innerHTML +=
    "<div id='caja-conteiner'>" +
    "<input id='userInput' type='text' spellcheck='true' placeholder='Escribe algo..'>" +
    "<div id='messageBox'></div>" +
    '</div>' +
    "<div id='typingNotification'></div>"

var maxMessageBox = 10
var responseDelayTime = toMilliseconds(1.5)
var mutedTime = toMilliseconds(30)

var userInputBox = document.getElementById('userInput')
var lastUserTextWrite = ''
var messageBox = document.getElementById('messageBox')
var typingNotification = document.getElementById('typingNotification')

var DEBUG = true
var SPEAK_VOICE = true
var coutMsj = 0 //actual msj in the box

var colorMessage = randomItem([['#8953DA', '#8C3BF1'], ['#FA1D1D', '#D43F3F']])

//global variables for conversational scope
var MBOT_VARS = {
    mbot_name: ['MBOT3'],
    user_name: ['Usuario'],
}

//temporal vars
var temporalLobe = {
    coutErrors: 0,
    conteoRepeticion: 0,
    repeatRegister: [],
    register: [],
}

try {
    if (!MBOT_DB) {
    }
} catch (error) {
    console.log(
        'ERROR!:DB is not found or contains some errors :(, please check it.',
        error
    )
}

userInputBox.onfocus = function() {
    document.onkeydown = function() {
        userInputBox.focus()
    }
}
//detect enter key up
userInputBox.addEventListener('keyup', function(event) {
    event.preventDefault()
    if (event.keyCode === 13) {
        lastUserTextWrite = userInputBox.value
        reply(userInputBox.value)
        userInputBox.value = ''
    }
    if (event.keyCode == 38) {
        userInputBox.value = lastUserTextWrite
    }
    if (event.keyCode == 40) {
        userInputBox.value = ''
    }
})


String.prototype.format = function() {
    var formatted = this
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi')
        formatted = formatted.replace(regexp, arguments[i])
    }
    return formatted
}

//add message to MessageBox
function addMessageIntoBox(name, color, message, emoji = 'em em-no_mouth') {
    var name = '' //"<span style='position:relative;color:" + color + "'>" + name + " </span>"
    var message_id = 'message_{0}'.format(coutMsj)
    var message_composition = "<div class='message' id='{0}'>".format(
        message_id
    )
    message_composition += "<div class='{0}'></div>".format(emoji)
    message_composition += ' <span>{0}</span></div>'.format(message)

    var msj = document.createElement('div')
    msj.className = 'messageAnimation'
    msj.innerHTML += message_composition
    messageBox.appendChild(msj)
}

function speakText(text) {
    var text_correction = {
        MBOT: 'M BOT',
        Hey: 'ey',
        'Ja ja ja': 'jajaja',
        'ja ja ja': 'jajaja',
        'Ja Ja Ja': 'jajaja',
        We: 'ueeee',
        L3L: 'lol',
        Ehmm: 'Am',
    }
    var text_avoid = ['http ']
    for (var i in text_correction) {
        var search = text.search(i)
        if (search != -1)
            text = text.replace(
                text.substr(search, text.length - search),
                text_correction[i]
            )
    }
    for (var i in text_avoid) {
        if (text.includes(text_avoid[i])) return false
    }
    speechSynthesis.speak(new SpeechSynthesisUtterance(text))
}
function emptyMessageBox() {
    messageBox.innerHTML = ''
    coutMsj = 0
}

//retorna milesegundos de una cantidad especifica de segundos
function toMilliseconds(seconds) {
    return seconds * 1000
}

function getKeys(dict) {
    return Object.keys(dict)
}

function mergeDict(from, to) {
    /* Update/Extends dict from other dict */
    var from_keys = getKeys(from)
    for (var keys in from_keys) {
        to[getKeys(to).length] = from[from_keys[keys]]
    }
}

function randomItem(array) {
    /*  Return random item of  a array */
    return array[Math.floor(Math.random() * (0 - array.length)) + array.length]
}

function forgetConversation() {
    temporalLobe['repeatRegister'] = []
}

var strManager = {
    //Filter special characters
    filterString: function(string) {
        var special_characters = []
        var process_string
        if (string[0] != '+')
            //conservar mayusculas originales
            process_string = string.toLowerCase()
        else process_string = string.replace('+', '')
        var final_string = process_string
            .split(/\s+/)
            .join(' ')
            .trim()
        for (var special in special_characters)
            final_string = final_string.replace(
                special_characters[special],
                ' ' + special_characters[special]
            )
        //Se filtran algunas acentuaciones previsoriamente
        var with_tick = ['á', 'é', 'í', 'ó', 'ú']
        var without_tick = ['a', 'e', 'i', 'o', 'u']
        for (var tick in with_tick)
            final_string = final_string.replace(
                with_tick[tick],
                without_tick[tick]
            )
        return final_string
        //ej: 'hóla!' > 'hola !'
    },

    //detect char into str
    inChar: function(str, characters) {
        for (var ch in characters) {
            if (str == characters[ch]) return true
        }
        return false
    },

    formatString: function(string, mark, replace) {
        /*  replace piece of string with x mark
			ex = "hi $name" > "hi guille" 
		*/
        var mark_index = string.indexOf(mark)
        if (mark_index != -1) {
            var i = mark_index
            for (i; i < string.length + 1; i++) {
                if (this.inChar(string[i], ')') || i == string.length) {
                    var var_name = string.slice(mark_index, i + 1)
                    var var_name_key = var_name
                        .split(mark)[1]
                        .substr(0, var_name.length - 1 - mark.length)
                    var string = string.replace(
                        var_name,
                        randomItem(replace[var_name_key])
                    )
                    return string
                }
            }
        }
        return false
    },

    strFormat: function(string, replace, mark = '$') {
        /* format with multiple replaces */
        var final_string = string
        var temp = final_string
        while ((temp = this.formatString(final_string, mark, replace)))
            final_string = temp
        return final_string
    },

    strStrSec: function(word0, word1) {
        /* sequencial
			[holaaaa, hola] -> ho hol hola > hola
		*/
        var word_buffer = []
        for (var letter in word0) {
            word_buffer.push(word0[letter])
            if (word_buffer.join('') == word1) return true
        }
        return false
    },

    strStr: function(words, string) {
        //IMPLEMENTAR MATCH
        /* comoooo estaasss? -> como estas?*/
        var words_array = words.split(' ')
        var string_array = string.split(' ')
        var cout = 0
        if (words_array.length < string_array.length) return false
        for (var str in string_array) {
            if (this.strStrSec(words_array[str], string_array[str])) cout++
        }
        return cout
    },
}

function dbSearchWord(word, indiceEspecifico = false) {
    /* Searches for matches in the database of some specific word */
    var candidates = {}
    var dbDir = indiceEspecifico ? getKeys(indiceEspecifico) : getKeys(MBOT_DB)
    for (var key_pos in dbDir) {
        //Se entra por keys en la base de datos
        var key_index = dbDir[key_pos] //key
        var answers = MBOT_DB[key_index] //values
        if (answers != undefined) {
            //escanea cada pregunta dentro de la lista
            for (
                var answer_index = 0;
                answer_index < answers.length;
                answer_index++
            ) {
                if (key_index.split('-')[0] == 'respuesta') break
                var answer = answers[answer_index]
                var scan = strManager.strStr(word, answer)
                if (answer.toLowerCase() == word)
                    candidates[key_index] = [key_index, answer_index, word]
                if (scan && scan == word.split(' ').length)
                    candidates[key_index] = [key_index, answer_index, word]
            }
        }
    }
    if (getKeys(candidates).length > 0) return candidates
    else return false
}

function analysisSentence(sentence) {
    /*
		Look for several matches in a sentence and return dict with
		types.
	*/
    sentence = strManager.filterString(sentence).split(' ')
    sentence.push('\0')
    var sentence_chunck = []
    var founds = {}
    var word_count = 0
    var control = 1
    do {
        if (control >= sentence.length) break
        if (word_count == sentence.length) {
            word_count = control++
            sentence_chunck = []
        }
        sentence_chunck.push(sentence[word_count++])
        var analysis = dbSearchWord(sentence_chunck.join(' '))
        if (analysis) {
            mergeDict(analysis, founds)
            word_count = sentence_chunck.length
            control += sentence_chunck.length
            sentence_chunck = []
        }
    } while (true)
    if (Object.keys(founds).length > 0) return founds
    else return { 0: ['error-null'] }
}
//Mensaje aleatorio de lista
function processAnswer(answer_list) {
    var selected_answer = randomItem(answer_list)
    //check vars scope
    selected_answer = strManager.strFormat(selected_answer, MBOT_VARS, '$(')
    //check reference scope
    selected_answer = strManager.strFormat(selected_answer, MBOT_DB, '*(')

    return selected_answer
}

function returnAnswer(answer_desc, answer_type = 'respuesta', origin = 'mbot') {
    /* search and return random answer type with the same descriptcion 
		answer_desc:bienvenida -> random:[che, hola, ...] */
    //temporalLobe.register.push([answer_type, answer_desc].join('-'))
    var db = getKeys(MBOT_DB)
    for (var keyn in db) {
        var dbKey = db[keyn].split('-')
        var ans_type = dbKey[0]
        var ans_desc = dbKey[1]
        //sequence , if found type - description
        if (answer_type) {
            if (ans_type === answer_type && ans_desc == answer_desc)
                return processAnswer(MBOT_DB[db[keyn]])
        } else {
            if (ans_desc === answer_desc)
                return processAnswer(MBOT_DB[db[keyn]])
        }
    }
}

function processCmd(comando) {
    /*controla el sistema de comandos*/
    switch (comando) {
        case 'clear':
            emptyMessageBox()
            console.clear()
            return '...'
        case 'olvidar':
            forgetConversation()
            return returnAnswer('existencial', 'pregunta')
        case 'DEBUG':
            if (DEBUG == false) {
                DEBUG = true
                return 'Depuracion Activada'
            } else {
                DEBUG = false
                return 'Depuracion Desactivada'
            }
        case 'callate':
            if (SPEAK_VOICE) {
                SPEAK_VOICE = false
                return returnAnswer('desactivar voz', 'expresion')
            } else {
                return returnAnswer('callado', 'expresion')
            }
        case 'habla':
            SPEAK_VOICE = true
            var voice = returnAnswer('activar voz', 'expresion')
            return voice

        default:
            return returnAnswer('comando', 'error')
    }
}

function analyzeAsoc(pattern) {
    /* if found a asociation, return a  alternative answer */
    var keys = getKeys(MBOT_ASOC)
    for (var i in keys) {
        var values = MBOT_ASOC[keys[i]]
        if (values[0] == pattern[0] && values[1] == pattern[1]) {
            return keys[i]
        }
    }
}

function processReply(message) {
    var sentence_analysis = analysisSentence(message)
    var reply = []
    var reply_template = ['desconocido', 'respuesta']
    if (DEBUG) {
        console.log('%c===================', 'color:blue')
        console.log('%c user message:', 'color:blue', message)
        for (var i in sentence_analysis) {
            console.table(i, sentence_analysis[i])
            // console.log("reply=", reply)
        }
    }
    for (var key in getKeys(sentence_analysis)) {
        var sentence_key = sentence_analysis[key][0].split('-')
        var sentence_type = sentence_key[0]
        var sentence_info = sentence_key[1]
        temporalLobe.register.push(sentence_analysis[key][0])
        if (temporalLobe['repeatRegister'].join('').includes(sentence_key)) {
            reply_template = ['repeticion', 'respuesta']
        }
        forgetConversation()
        //special reply
        switch (sentence_type) {
            case 'saludo':
                reply_template = [sentence_info, 'saludo']
                break
            case 'error':
                var errors = temporalLobe['coutErrors']++
                if (errors > 4) {
                    temporalLobe['coutErrors'] = 0
                    reply_template = ['discusion', 'respuesta']
                } else {
                    reply_template = ['desconocido', 'respuesta']
                }
                break
            case 'accion':
                switch (sentence_info) {
                    case 'comando':
                        reply.push(processCmd(message))
                        break
                    case 'hora':
                        var hora = new Date()
                        reply.push([
                            returnAnswer('respuesta-hora') +
                                hora.getHours() +
                                ' y ' +
                                hora.getMinutes() +
                                ' minutos.',
                        ])
                        break
                    case 'buscar':
                        var queryBusqueda = 'search?q='
                        var key = analisis[s_pos][0]
                        var posicion = analisis[s_pos][1]
                        var itemBuscar = strManager.filterString(
                            message.replace(MBOT_DB[key][posicion], '')
                        )
                        console.log(window.location.href)
                        if (
                            window.location.href
                                .toString()
                                .includes(queryBusqueda)
                        )
                            window.location.href =
                                window.location.href + itemBuscar
                        else
                            window.location.href =
                                window.location.href +
                                queryBusqueda +
                                itemBuscar
                        break
                    case 'quitar':
                        reply_template = ['despedida', 'saludo']
                        speakText(exit)
                        window.location.href = 'https://www.google.com'
                        return exit
                    default:
                        reply_template = ['desconocido', 'respuesta']
                }
                break
            default:
                //respuesta por defecto
                reply_template = [sentence_info, 'respuesta']
        }
        reply.push(returnAnswer(reply_template[0], reply_template[1]))
        if (temporalLobe.register.length >= 2) {
            var reg = temporalLobe.register
            var asoc_analyze = analyzeAsoc([
                reg[reg.length - 2],
                reg[reg.length - 1],
            ])
            if (asoc_analyze) {
                temporalLobe.register.push(asoc_analyze)
                asoc_analyze = asoc_analyze ? asoc_analyze.split('-') : false
                reply.push(returnAnswer(asoc_analyze[1], asoc_analyze[0]))
            }
        }
    }
    reply_template = ['desconocido', 'respuesta']
    if (!reply.length) reply.push(returnAnswer(reply_template))
    reply = reply.join(', ')
    reply = reply[0].toUpperCase() + reply.substr(1) + '.'
    if (DEBUG) {
        console.log('Registro actual:', temporalLobe.register)
        console.log('%c===================', 'color:blue')
    }
    if (SPEAK_VOICE) speakText(reply)

    return reply
}

//Manejar un intervalo de inactividad para enviar un mensaje automatico
var silenceInterval = setInterval(function() {
    reply()
}, mutedTime)

//reply un Mensaje y Devolver una Respuesta (Funcion principal)
function reply(inputMessage = '') {
    var userMessages = inputMessage.toLowerCase()
    //Si la cantidad de mensajes excede al limite de la caja se limpia.
    if (coutMsj * 2 > maxMessageBox) {
        emptyMessageBox()
        coutMsj = 0
    }

    //El usuario ya dijo algo, no hay necesidad de llamar mas la atención.
    window.clearInterval(silenceInterval)
    //Se agrega el mensaje del usuario a la caja de conversación.
    if (userMessages != '')
        addMessageIntoBox(
            MBOT_VARS['user_name'],
            'purple',
            userInputBox.value,
            'em em-smiley'
        )
    else userMessages = '*silencio*'
    var notify = document.createElement('span')
    notify.innerHTML = 'Escribiendo...'
    notify.id = 'typingNotification'
    typingNotification.appendChild(notify)
    setTimeout(function() {
        //Se muestra la notificacion simulada de escritura.
        typingNotification.innerHTML = ''
        addMessageIntoBox(
            'MinBot',
            'red',
            processReply(userMessages),
            'em em-robot_face'
        )
    }, responseDelayTime)
    coutMsj += 2
}
