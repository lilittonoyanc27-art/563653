export interface QuestionItem {
  id: number;
  categoryNumber: number;
  categoryEs: string;
  categoryAm: string;
  questionEs: string;
  questionAm: string;
  answerEs: string;
  answerAm: string;
  grammarTag: string;
  notes?: string;
}

export interface ChallengeItem {
  id: number;
  questionEs: string;
  questionAm: string;
  modelAnswerEs: string;
  modelAnswerAm: string;
  hint: string;
}

export const CATEGORIES = [
  { id: 1, nameEs: "Antes del partido", nameAm: "Խաղից առաջ", count: 10, icon: "⏱️" },
  { id: 2, nameEs: "Durante el partido", nameAm: "Խաղի ընթացքում", count: 10, icon: "⚽" },
  { id: 3, nameEs: "El entrenador pregunta", nameAm: "Մարզիչը հարցնում է", count: 10, icon: "📋" },
  { id: 4, nameEs: "Con los amigos", nameAm: "Ընկերների հետ", count: 10, icon: "🤝" },
  { id: 5, nameEs: "Problemas y situaciones", nameAm: "Ֆուտբոլային իրավիճակներ", count: 10, icon: "🧠" },
];

export const QUESTIONS_DATA: QuestionItem[] = [
  // 1. Antes del partido — Խաղից առաջ
  {
    id: 1,
    categoryNumber: 1,
    categoryEs: "Antes del partido",
    categoryAm: "Խաղից առաջ",
    questionEs: "¿Quieres jugar al fútbol conmigo?",
    questionAm: "Ուզո՞ւմ ես ինձ հետ ֆուտբոլ խաղալ։",
    answerEs: "Sí, claro. Me encanta jugar al fútbol.",
    answerAm: "Այո՛, իհարկե։ Շատ եմ սիրում ֆուտբոլ խաղալ։",
    grammarTag: "Presente (Querer + Infinitivo)",
    notes: "conmigo = ինձ հետ; me encanta = շատ եմ սիրում"
  },
  {
    id: 2,
    categoryNumber: 1,
    categoryEs: "Antes del partido",
    categoryAm: "Խաղից առաջ",
    questionEs: "¿A qué hora empieza el partido?",
    questionAm: "Ժամը քանիսի՞ն է սկսվում խաղը։",
    answerEs: "Empieza a las cinco de la tarde.",
    answerAm: "Սկսվում է երեկոյան ժամը հինգին։",
    grammarTag: "La hora (Empezar)",
    notes: "a qué hora = ժամը քանիսին; a las cinco = ժամը հինգին"
  },
  {
    id: 3,
    categoryNumber: 1,
    categoryEs: "Antes del partido",
    categoryAm: "Խաղից առաջ",
    questionEs: "¿Dónde vamos a jugar hoy?",
    questionAm: "Այսօր որտե՞ղ ենք խաղալու։",
    answerEs: "Vamos a jugar en el campo del colegio.",
    answerAm: "Խաղալու ենք դպրոցի ֆուտբոլի դաշտում։",
    grammarTag: "Futuro próximo (Ir a + Inf)",
    notes: "el campo = դաշտ; el colegio = դպրոց"
  },
  {
    id: 4,
    categoryNumber: 1,
    categoryEs: "Antes del partido",
    categoryAm: "Խաղից առաջ",
    questionEs: "¿Has traído el balón?",
    questionAm: "Գնդակը բերե՞լ ես։",
    answerEs: "Sí, lo tengo en mi mochila.",
    answerAm: "Այո՛, այն իմ պայուսակում է։",
    grammarTag: "Pretérito Perfecto (Haber + traído)",
    notes: "lo tengo = այն ունեմ/այն ինձ մոտ է; la mochila = պայուսակ"
  },
  {
    id: 5,
    categoryNumber: 1,
    categoryEs: "Antes del partido",
    categoryAm: "Խաղից առաջ",
    questionEs: "¿Con quién vas a jugar?",
    questionAm: "Ո՞ւմ հետ ես խաղալու։",
    answerEs: "Voy a jugar con mis amigos del colegio.",
    answerAm: "Խաղալու եմ դպրոցի ընկերներիս հետ։",
    grammarTag: "Ir a + jugar (Futuro)",
    notes: "con quién = ում հետ; amigos = ընկերներ"
  },
  {
    id: 6,
    categoryNumber: 1,
    categoryEs: "Antes del partido",
    categoryAm: "Խաղից առաջ",
    questionEs: "¿Quién es el capitán de tu equipo?",
    questionAm: "Ո՞վ է ձեր թիմի ավագը։",
    answerEs: "Nuestro capitán es Pablo.",
    answerAm: "Մեր թիմի ավագը Պաբլոն է։",
    grammarTag: "Posesivos (Nuestro)",
    notes: "el capitán = ավագ; el equipo = թիմ"
  },
  {
    id: 7,
    categoryNumber: 1,
    categoryEs: "Antes del partido",
    categoryAm: "Խաղից առաջ",
    questionEs: "¿En qué posición juegas normalmente?",
    questionAm: "Սովորաբար ո՞ր դիրքում ես խաղում։",
    answerEs: "Normalmente juego de delantero.",
    answerAm: "Սովորաբար հարձակվող եմ խաղում։",
    grammarTag: "Vocabulario de posiciones",
    notes: "delantero = հարձակվող; defensa = պաշտպան; portero = դարպասապահ"
  },
  {
    id: 8,
    categoryNumber: 1,
    categoryEs: "Antes del partido",
    categoryAm: "Խաղից առաջ",
    questionEs: "¿Por qué quieres ser delantero?",
    questionAm: "Ինչո՞ւ ես ուզում հարձակվող լինել։",
    answerEs: "Porque me gusta marcar goles.",
    answerAm: "Որովհետև սիրում եմ գոլեր խփել։",
    grammarTag: "Por qué / Porque",
    notes: "marcar goles = գոլեր խփել"
  },
  {
    id: 9,
    categoryNumber: 1,
    categoryEs: "Antes del partido",
    categoryAm: "Խաղից առաջ",
    questionEs: "¿Cuántos jugadores hay en tu equipo?",
    questionAm: "Քանի՞ խաղացող կա ձեր թիմում։",
    answerEs: "En mi equipo hay siete jugadores.",
    answerAm: "Մեր թիմում յոթ խաղացող կա։",
    grammarTag: "Hay + Números",
    notes: "los jugadores = խաղացողներ; siete = 7"
  },
  {
    id: 10,
    categoryNumber: 1,
    categoryEs: "Antes del partido",
    categoryAm: "Խաղից առաջ",
    questionEs: "¿Estás listo para empezar?",
    questionAm: "Պատրա՞ստ ես սկսելու։",
    answerEs: "Sí, estoy listo. ¡Vamos!",
    answerAm: "Այո՛, պատրաստ եմ։ Գնացի՛նք։",
    grammarTag: "Estar listo (Adjetivos)",
    notes: "estar listo = պատրաստ լինել; ¡Vamos! = գնացինք"
  },

  // 2. Durante el partido — Խաղի ընթացքում
  {
    id: 11,
    categoryNumber: 2,
    categoryEs: "Durante el partido",
    categoryAm: "Խաղի ընթացքում",
    questionEs: "¿Me pasas el balón, por favor?",
    questionAm: "Կփոխանցե՞ս ինձ գնդակը, խնդրում եմ։",
    answerEs: "Sí, toma. ¡Corre!",
    answerAm: "Այո՛, վերցրու։ Վազի՛ր։",
    grammarTag: "Imperativo (toma, corre)",
    notes: "pasar el balón = փոխանցել գնդակը; ¡Toma! = վերցրո՛ւ"
  },
  {
    id: 12,
    categoryNumber: 2,
    categoryEs: "Durante el partido",
    categoryAm: "Խաղի ընթացքում",
    questionEs: "¿Por qué no corres?",
    questionAm: "Ինչո՞ւ չես վազում։",
    answerEs: "Porque estoy un poco cansado.",
    answerAm: "Որովհետև մի քիչ հոգնած եմ։",
    grammarTag: "Estar + Adjetivo",
    notes: "un poco = մի քիչ; cansado = հոգնած"
  },
  {
    id: 13,
    categoryNumber: 2,
    categoryEs: "Durante el partido",
    categoryAm: "Խաղի ընթացքում",
    questionEs: "¿Dónde está el balón?",
    questionAm: "Որտե՞ղ է գնդակը։",
    answerEs: "Está detrás de la portería.",
    answerAm: "Դարպասի հետևում է։",
    grammarTag: "Preposiciones de lugar",
    notes: "detrás de = հետևում; la portería = դարպաս"
  },
  {
    id: 14,
    categoryNumber: 2,
    categoryEs: "Durante el partido",
    categoryAm: "Խաղի ընթացքում",
    questionEs: "¿Quién ha marcado el primer gol?",
    questionAm: "Ո՞վ է խփել առաջին գոլը։",
    answerEs: "Lo ha marcado Carlos.",
    answerAm: "Կառլոսն է խփել։",
    grammarTag: "Pretérito Perfecto (ha marcado)",
    notes: "el primer gol = առաջին գոլը"
  },
  {
    id: 15,
    categoryNumber: 2,
    categoryEs: "Durante el partido",
    categoryAm: "Խաղի ընթացքում",
    questionEs: "¿Cuántos goles llevamos?",
    questionAm: "Քանի՞ գոլ ենք խփել մինչև հիմա։",
    answerEs: "Llevamos tres goles.",
    answerAm: "Մինչև հիմա երեք գոլ ենք խփել։",
    grammarTag: "Llevar (resultado actual)",
    notes: "llevamos = ունենք / հաշիվն է"
  },
  {
    id: 16,
    categoryNumber: 2,
    categoryEs: "Durante el partido",
    categoryAm: "Խաղի ընթացքում",
    questionEs: "¿Quién está ganando?",
    questionAm: "Ո՞վ է հաղթում։",
    answerEs: "Nuestro equipo está ganando.",
    answerAm: "Մեր թիմը հաղթում է։",
    grammarTag: "Estar + Gerundio (-ando)",
    notes: "ganar = հաղթել; perdiendo = պարտվել"
  },
  {
    id: 17,
    categoryNumber: 2,
    categoryEs: "Durante el partido",
    categoryAm: "Խաղի ընթացքում",
    questionEs: "¿Por qué estás enfadado?",
    questionAm: "Ինչո՞ւ ես բարկացած։",
    answerEs: "Porque he fallado un gol fácil.",
    answerAm: "Որովհետև հեշտ գոլ խփելու հնարավորությունը բաց եմ թողել։",
    grammarTag: "Pretérito Perfecto (he fallado)",
    notes: "fallar un gol = բաց թողնել գոլի պահը; fácil = հեշտ"
  },
  {
    id: 18,
    categoryNumber: 2,
    categoryEs: "Durante el partido",
    categoryAm: "Խաղի ընթացքում",
    questionEs: "¿Puedes jugar un poco más rápido?",
    questionAm: "Կարո՞ղ ես մի քիչ ավելի արագ խաղալ։",
    answerEs: "Sí, voy a intentarlo.",
    answerAm: "Այո՛, կփորձեմ։",
    grammarTag: "Poder + Infinitivo / Comparativo",
    notes: "más rápido = ավելի արագ; intentarlo = փորձել"
  },
  {
    id: 19,
    categoryNumber: 2,
    categoryEs: "Durante el partido",
    categoryAm: "Խաղի ընթացքում",
    questionEs: "¿Qué haces cuando tienes el balón?",
    questionAm: "Ի՞նչ ես անում, երբ գնդակը քեզ մոտ է։",
    answerEs: "Busco a un compañero y le paso el balón.",
    answerAm: "Փնտրում եմ թիմակցիս և գնդակը փոխանցում նրան։",
    grammarTag: "Pronombres de objeto indirecto (le)",
    notes: "un compañero = թիմակից; buscar = փնտրել"
  },
  {
    id: 20,
    categoryNumber: 2,
    categoryEs: "Durante el partido",
    categoryAm: "Խաղի ընթացքում",
    questionEs: "¿Quieres tirar a portería?",
    questionAm: "Ուզո՞ւմ ես հարվածել դարպասին։",
    answerEs: "Sí, voy a intentarlo.",
    answerAm: "Այո՛, պատրաստվում եմ փորձել։",
    grammarTag: "Tirar a portería (Vocabulario)",
    notes: "tirar a portería = հարվածել դարպասին"
  },

  // 3. El entrenador pregunta — Մարզիչը հարցնում է
  {
    id: 21,
    categoryNumber: 3,
    categoryEs: "El entrenador pregunta",
    categoryAm: "Մարզիչը հարցնում է",
    questionEs: "¿Por qué has llegado tarde al entrenamiento?",
    questionAm: "Ինչո՞ւ ես ուշացել մարզումից։",
    answerEs: "Porque he perdido el autobús.",
    answerAm: "Որովհետև ուշացել եմ ավտոբուսից։",
    grammarTag: "Pretérito Perfecto (has llegado, he perdido)",
    notes: "llegar tarde = ուշանալ; perder el autobús = բաց թողնել ավտոբուսը"
  },
  {
    id: 22,
    categoryNumber: 3,
    categoryEs: "El entrenador pregunta",
    categoryAm: "Մարզիչը հարցնում է",
    questionEs: "¿Has bebido suficiente agua?",
    questionAm: "Բավականաչափ ջուր խմե՞լ ես։",
    answerEs: "Sí, he bebido una botella de agua.",
    answerAm: "Այո՛, մեկ շիշ ջուր եմ խմել։",
    grammarTag: "Pretérito Perfecto (beber -> bebido)",
    notes: "suficiente = բավարար; una botella = շիշ"
  },
  {
    id: 23,
    categoryNumber: 3,
    categoryEs: "El entrenador pregunta",
    categoryAm: "Մարզիչը հարցնում է",
    questionEs: "¿Cuántas veces entrenas a la semana?",
    questionAm: "Շաբաթը քանի՞ անգամ ես մարզվում։",
    answerEs: "Entreno tres veces a la semana.",
    answerAm: "Շաբաթը երեք անգամ եմ մարզվում։",
    grammarTag: "Frecuencia (veces a la semana)",
    notes: "a la semana = շաբաթական; tres veces = 3 անգամ"
  },
  {
    id: 24,
    categoryNumber: 3,
    categoryEs: "El entrenador pregunta",
    categoryAm: "Մարզիչը հարցնում է",
    questionEs: "¿Qué necesitas mejorar?",
    questionAm: "Ի՞նչը պետք է բարելավես։",
    answerEs: "Necesito mejorar mis pases.",
    answerAm: "Պետք է բարելավեմ փոխանցումներս։",
    grammarTag: "Necesitar + Infinitivo",
    notes: "mejorar = բարելավել; los pases = փոխանցումները"
  },
  {
    id: 25,
    categoryNumber: 3,
    categoryEs: "El entrenador pregunta",
    categoryAm: "Մարզիչը հարցնում է",
    questionEs: "¿Te gusta entrenar con tus compañeros?",
    questionAm: "Սիրո՞ւմ ես մարզվել թիմակիցներիդ հետ։",
    answerEs: "Sí, porque aprendemos juntos.",
    answerAm: "Այո՛, որովհետև միասին սովորում ենք։",
    grammarTag: "Gustar + Infinitivo",
    notes: "juntos = միասին; aprender = սովորել"
  },
  {
    id: 26,
    categoryNumber: 3,
    categoryEs: "El entrenador pregunta",
    categoryAm: "Մարզիչը հարցնում է",
    questionEs: "¿Puedes repetir el ejercicio?",
    questionAm: "Կարո՞ղ ես կրկնել վարժությունը։",
    answerEs: "Sí, entrenador. Lo hago otra vez.",
    answerAm: "Այո՛, մարզի՛չ։ Նորից կանեմ։",
    grammarTag: "Poder + repetir / Hacer",
    notes: "repetir = կրկնել; otra vez = նորից, կրկին"
  },
  {
    id: 27,
    categoryNumber: 3,
    categoryEs: "El entrenador pregunta",
    categoryAm: "Մարզիչը հարցնում է",
    questionEs: "¿Por qué no has pasado el balón?",
    questionAm: "Ինչո՞ւ գնդակը չես փոխանցել։",
    answerEs: "Porque no he visto a mi compañero.",
    answerAm: "Որովհետև թիմակցիս չեմ տեսել։",
    grammarTag: "Pretérito Perfecto irregular (ver -> visto)",
    notes: "no he visto = չեմ տեսել"
  },
  {
    id: 28,
    categoryNumber: 3,
    categoryEs: "El entrenador pregunta",
    categoryAm: "Մարզիչը հարցնում է",
    questionEs: "¿Cómo te encuentras hoy?",
    questionAm: "Այսօր ինչպե՞ս ես քեզ զգում։",
    answerEs: "Me encuentro bien, pero estoy un poco cansado.",
    answerAm: "Ինձ լավ եմ զգում, բայց մի քիչ հոգնած եմ։",
    grammarTag: "Encontrarse (Reflexivo)",
    notes: "me encuentro bien = ինձ լավ եմ զգում"
  },
  {
    id: 29,
    categoryNumber: 3,
    categoryEs: "El entrenador pregunta",
    categoryAm: "Մարզիչը հարցնում է",
    questionEs: "¿Qué haces antes de entrenar?",
    questionAm: "Ի՞նչ ես անում մարզումից առաջ։",
    answerEs: "Primero corro un poco y después hago ejercicios.",
    answerAm: "Սկզբում մի քիչ վազում եմ, հետո վարժություններ անում։",
    grammarTag: "Secuencia (Primero ... después)",
    notes: "antes de = առաջ; después = հետո"
  },
  {
    id: 30,
    categoryNumber: 3,
    categoryEs: "El entrenador pregunta",
    categoryAm: "Մարզիչը հարցնում է",
    questionEs: "¿Te gusta jugar en equipo?",
    questionAm: "Սիրո՞ւմ ես թիմով խաղալ։",
    answerEs: "Sí, porque todos nos ayudamos.",
    answerAm: "Այո՛, որովհետև բոլորս օգնում ենք միմյանց։",
    grammarTag: "Verbo reflexivo recíproco (nos ayudamos)",
    notes: "en equipo = թիմով; nos ayudamos = օգնում ենք միմյանց"
  },

  // 4. Con los amigos — Ընկերների հետ
  {
    id: 31,
    categoryNumber: 4,
    categoryEs: "Con los amigos",
    categoryAm: "Ընկերների հետ",
    questionEs: "¿Has visto mi gol?",
    questionAm: "Տեսե՞լ ես իմ գոլը։",
    answerEs: "¡Sí! Ha sido un gol muy bonito.",
    answerAm: "Այո՛։ Շատ գեղեցիկ գոլ էր։",
    grammarTag: "Pretérito Perfecto (ha sido)",
    notes: "muy bonito = շատ գեղեցիկ"
  },
  {
    id: 32,
    categoryNumber: 4,
    categoryEs: "Con los amigos",
    categoryAm: "Ընկերների հետ",
    questionEs: "¿Por qué no has venido a jugar?",
    questionAm: "Ինչո՞ւ չես եկել խաղալու։",
    answerEs: "Porque tenía muchos deberes.",
    answerAm: "Որովհետև շատ տնային առաջադրանքներ ունեի։",
    grammarTag: "Pretérito Imperfecto (tenía)",
    notes: "venir -> has venido; los deberes = տնային աշխատանք"
  },
  {
    id: 33,
    categoryNumber: 4,
    categoryEs: "Con los amigos",
    categoryAm: "Ընկերների հետ",
    questionEs: "¿Jugamos otra vez mañana?",
    questionAm: "Վաղը նորի՞ց խաղանք։",
    answerEs: "Sí, pero después de clase.",
    answerAm: "Այո՛, բայց դասերից հետո։",
    grammarTag: "Presente con valor de futuro",
    notes: "otra vez = նորից; después de clase = դասերից հետո"
  },
  {
    id: 34,
    categoryNumber: 4,
    categoryEs: "Con los amigos",
    categoryAm: "Ընկերների հետ",
    questionEs: "¿Quién juega mejor, tú o tu hermano?",
    questionAm: "Ո՞վ է ավելի լավ խաղում՝ դու՞, թե՞ եղբայրդ։",
    answerEs: "Mi hermano juega mejor, pero yo corro más rápido.",
    answerAm: "Եղբայրս ավելի լավ է խաղում, բայց ես ավելի արագ եմ վազում։",
    grammarTag: "Comparativos (mejor, más rápido)",
    notes: "el hermano = եղբայր; mejor = ավելի լավ"
  },
  {
    id: 35,
    categoryNumber: 4,
    categoryEs: "Con los amigos",
    categoryAm: "Ընկերների հետ",
    questionEs: "¿Qué haces cuando pierdes un partido?",
    questionAm: "Ի՞նչ ես անում, երբ պարտվում ես խաղում։",
    answerEs: "Me pongo triste, pero intento mejorar.",
    answerAm: "Տխրում եմ, բայց փորձում եմ ավելի լավ խաղալ։",
    grammarTag: "Ponerse + Adjetivo (emociones)",
    notes: "perder = պարտվել; ponerse triste = տխրել"
  },
  {
    id: 36,
    categoryNumber: 4,
    categoryEs: "Con los amigos",
    categoryAm: "Ընկերների հետ",
    questionEs: "¿Te gusta ver partidos por la televisión?",
    questionAm: "Սիրո՞ւմ ես հեռուստացույցով ֆուտբոլային խաղեր դիտել։",
    answerEs: "Sí, normalmente los veo con mi padre.",
    answerAm: "Այո՛, սովորաբար հայրիկիս հետ եմ դիտում։",
    grammarTag: "Pronombres de objeto directo (los veo)",
    notes: "por la televisión = հեռուստացույցով; mi padre = հայրս"
  },
  {
    id: 37,
    categoryNumber: 4,
    categoryEs: "Con los amigos",
    categoryAm: "Ընկերների հետ",
    questionEs: "¿Con quién viste el último partido?",
    questionAm: "Ո՞ւմ հետ ես դիտել վերջին խաղը։",
    answerEs: "Lo vi con mis amigos.",
    answerAm: "Դիտել եմ ընկերներիս հետ։",
    grammarTag: "Pretérito Indefinido (ver -> vi, viste)",
    notes: "el último partido = վերջին խաղը"
  },
  {
    id: 38,
    categoryNumber: 4,
    categoryEs: "Con los amigos",
    categoryAm: "Ընկերների հետ",
    questionEs: "¿Qué jugador te gusta más?",
    questionAm: "Ո՞ր ֆուտբոլիստին ես ամենաշատը սիրում։",
    answerEs: "Me gusta mucho Cristiano Ronaldo.",
    answerAm: "Ինձ շատ է դուր գալիս Կրիշտիանու Ռոնալդուն։",
    grammarTag: "Gustar + Nombre propio",
    notes: "el jugador = ֆուտբոլիստ"
  },
  {
    id: 39,
    categoryNumber: 4,
    categoryEs: "Con los amigos",
    categoryAm: "Ընկերների հետ",
    questionEs: "¿Por qué te gusta Cristiano Ronaldo?",
    questionAm: "Ինչո՞ւ ես սիրում Կրիշտիանու Ռոնալդուին։",
    answerEs: "Porque marca muchos goles y trabaja mucho.",
    answerAm: "Որովհետև շատ գոլեր է խփում և շատ է աշխատում։",
    grammarTag: "Presente de indicativo (trabajar, marcar)",
    notes: "trabajar mucho = շատ աշխատել"
  },
  {
    id: 40,
    categoryNumber: 4,
    categoryEs: "Con los amigos",
    categoryAm: "Ընկերների հետ",
    questionEs: "¿Qué prefieres, jugar o ver fútbol?",
    questionAm: "Ի՞նչ ես նախընտրում՝ ֆուտբոլ խաղա՞լ, թե՞ դիտել։",
    answerEs: "Prefiero jugar porque es más divertido.",
    answerAm: "Նախընտրում եմ խաղալ, որովհետև ավելի զվարճալի է։",
    grammarTag: "Preferir (e -> ie)",
    notes: "divertido = զվարճալի, հետաքրքիր"
  },

  // 5. Problemas y situaciones — Ֆուտբոլային իրավիճակներ
  {
    id: 41,
    categoryNumber: 5,
    categoryEs: "Problemas y situaciones",
    categoryAm: "Ֆուտբոլային իրավիճակներ",
    questionEs: "Tu equipo gana por dos goles a uno. ¿Cuántos goles necesita el otro equipo para empatar?",
    questionAm: "Ձեր թիմը հաղթում է 2։1 հաշվով։ Քանի՞ գոլ է պետք մյուս թիմին՝ հավասարեցնելու համար։",
    answerEs: "Necesita marcar un gol.",
    answerAm: "Պետք է մեկ գոլ խփի։",
    grammarTag: "Vocabulario de resultado (empatar)",
    notes: "empatar = ոչ-ոքի անել / հավասարեցնել"
  },
  {
    id: 42,
    categoryNumber: 5,
    categoryEs: "Problemas y situaciones",
    categoryAm: "Ֆուտբոլային իրավիճակներ",
    questionEs: "El partido empieza a las cuatro y dura noventa minutos. ¿A qué hora termina, si no hay descanso?",
    questionAm: "Խաղը սկսվում է ժամը չորսին և տևում է 90 րոպե։ Ե՞րբ է ավարտվում, եթե ընդմիջում չկա։",
    answerEs: "Termina a las cinco y media.",
    answerAm: "Ավարտվում է ժամը հինգ անց կեսին։",
    grammarTag: "Tiempo y horas (y media)",
    notes: "el descanso = ընդմիջում; noventa minutos = 90 րոպե"
  },
  {
    id: 43,
    categoryNumber: 5,
    categoryEs: "Problemas y situaciones",
    categoryAm: "Ֆուտբոլային իրավիճակներ",
    questionEs: "Tu equipo tiene seis jugadores y llegan dos más. ¿Cuántos sois ahora?",
    questionAm: "Ձեր թիմում վեց խաղացող կա, ևս երկուսը գալիս են։ Հիմա քանի՞ հոգի եք։",
    answerEs: "Ahora somos ocho jugadores.",
    answerAm: "Հիմա ութ խաղացող ենք։",
    grammarTag: "Ser + Número (somos ocho)",
    notes: "seis + dos = ocho (6 + 2 = 8)"
  },
  {
    id: 44,
    categoryNumber: 5,
    categoryEs: "Problemas y situaciones",
    categoryAm: "Ֆուտբոլային իրավիճակներ",
    questionEs: "Un jugador marca tres goles y otro marca dos. ¿Cuántos goles marcan entre los dos?",
    questionAm: "Մի խաղացող երեք գոլ է խփում, մյուսը՝ երկու։ Միասին քանի՞ գոլ են խփում։",
    answerEs: "Marcan cinco goles.",
    answerAm: "Խփում են հինգ գոլ։",
    grammarTag: "Entre los dos (միասին)",
    notes: "tres + dos = cinco (3 + 2 = 5)"
  },
  {
    id: 45,
    categoryNumber: 5,
    categoryEs: "Problemas y situaciones",
    categoryAm: "Ֆուտբոլային իրավիճակներ",
    questionEs: "Tienes veinte euros y compras un balón por quince. ¿Cuánto dinero te queda?",
    questionAm: "Ունես 20 եվրո և գնում ես 15 եվրոյանոց գնդակ։ Որքա՞ն գումար է մնում։",
    answerEs: "Me quedan cinco euros.",
    answerAm: "Մնում է հինգ եվրո։",
    grammarTag: "Quedar + Dinero (me quedan)",
    notes: "veinte - quince = cinco (20 - 15 = 5)"
  },
  {
    id: 46,
    categoryNumber: 5,
    categoryEs: "Problemas y situaciones",
    categoryAm: "Ֆուտբոլային իրավիճակներ",
    questionEs: "¿Qué haces si un compañero se cae?",
    questionAm: "Ի՞նչ ես անում, եթե թիմակիցդ ընկնում է։",
    answerEs: "Me acerco y le pregunto si está bien.",
    answerAm: "Մոտենում եմ և հարցնում՝ լա՞վ է։",
    grammarTag: "Condicional real (Si + Presente)",
    notes: "caerse = ընկնել; acercarse = մոտենալ"
  },
  {
    id: 47,
    categoryNumber: 5,
    categoryEs: "Problemas y situaciones",
    categoryAm: "Ֆուտբոլային իրավիճակներ",
    questionEs: "¿Qué dices cuando tu amigo falla un gol?",
    questionAm: "Ի՞նչ ես ասում, երբ ընկերդ գոլ խփելու հնարավորությունը բաց է թողնում։",
    answerEs: "No pasa nada. ¡La próxima vez lo conseguirás!",
    answerAm: "Ոչինչ։ Հաջորդ անգամ կստացվի։",
    grammarTag: "Expresiones coloquiales de ánimo",
    notes: "no pasa nada = ոչինչ, ոչ մի խնդիր չկա; conseguir = հասնել արդյունքի"
  },
  {
    id: 48,
    categoryNumber: 5,
    categoryEs: "Problemas y situaciones",
    categoryAm: "Ֆուտբոլային իրավիճակներ",
    questionEs: "¿Qué haces si no estás de acuerdo con el árbitro?",
    questionAm: "Ի՞նչ ես անում, եթե համաձայն չես մրցավարի հետ։",
    answerEs: "Hablo con respeto y sigo jugando.",
    answerAm: "Հարգանքով խոսում եմ և շարունակում խաղալ։",
    grammarTag: "Seguir + Gerundio (sigo jugando)",
    notes: "el árbitro = մրցավար; con respeto = հարգանքով"
  },
  {
    id: 49,
    categoryNumber: 5,
    categoryEs: "Problemas y situaciones",
    categoryAm: "Ֆուտբոլային իրավիճակներ",
    questionEs: "¿Qué haces si tu equipo pierde tres partidos seguidos?",
    questionAm: "Ի՞նչ ես անում, եթե թիմդ երեք խաղ անընդմեջ պարտվում է։",
    answerEs: "Sigo entrenando y no me rindo.",
    answerAm: "Շարունակում եմ մարզվել և չեմ հանձնվում։",
    grammarTag: "Rendirse (no me rindo = չեմ հանձնվում)",
    notes: "seguidos = անընդմեջ; rendirse = հանձնվել"
  },
  {
    id: 50,
    categoryNumber: 5,
    categoryEs: "Problemas y situaciones",
    categoryAm: "Ֆուտբոլային իրավիճակներ",
    questionEs: "¿Qué dices después de ganar un partido importante?",
    questionAm: "Ի՞նչ ես ասում կարևոր խաղում հաղթելուց հետո։",
    answerEs: "¡Buen trabajo, equipo! ¡Hemos jugado muy bien!",
    answerAm: "Ապրե՛ք, թիմ։ Մենք շատ լավ խաղացինք։",
    grammarTag: "Pretérito Perfecto (hemos jugado)",
    notes: "¡Buen trabajo! = Լավ աշխատանք/ապրե՛ք"
  }
];

export const RETO_FINAL_DATA: ChallengeItem[] = [
  {
    id: 1,
    questionEs: "¿Dónde está tu balón?",
    questionAm: "Որտե՞ղ է քո գնդակը։",
    modelAnswerEs: "Está en mi mochila. / Está en el campo.",
    modelAnswerAm: "Այն իմ պայուսակում է։ / Դաշտում է։",
    hint: "Օգտագործիր 'Está en...'"
  },
  {
    id: 2,
    questionEs: "¿A qué hora empieza el entrenamiento?",
    questionAm: "Ժամը քանիսի՞ն է սկսվում մարզումը։",
    modelAnswerEs: "Empieza a las cinco de la tarde.",
    modelAnswerAm: "Սկսվում է երեկոյան ժամը հինգին։",
    hint: "Օգտագործիր 'Empieza a las...'"
  },
  {
    id: 3,
    questionEs: "¿En qué posición juegas?",
    questionAm: "Ո՞ր դիրքում ես խաղում։",
    modelAnswerEs: "Juego de delantero. / Juego de defensa.",
    modelAnswerAm: "Հարձակվող եմ խաղում։ / Պաշտպան եմ խաղում։",
    hint: "delantero (հարձակվող) կամ portero (դարպասապահ)"
  },
  {
    id: 4,
    questionEs: "¿Quién es el capitán de tu equipo?",
    questionAm: "Ո՞վ է ձեր թիմի ավագը։",
    modelAnswerEs: "El capitán es mi amigo Pablo.",
    modelAnswerAm: "Ավագը իմ ընկեր Պաբլոն է։",
    hint: "Օգտագործիր 'El capitán es...'"
  },
  {
    id: 5,
    questionEs: "¿Me pasas el balón, por favor?",
    questionAm: "Կփոխանցե՞ս ինձ գնդակը, խնդրում եմ։",
    modelAnswerEs: "¡Sí, toma! ¡Corre hacia la portería!",
    modelAnswerAm: "Այո՛, վերցրու։ Վազի՛ր դեպի դարպասը։",
    hint: "Արագ պատասխան՝ ¡Sí, toma!"
  },
  {
    id: 6,
    questionEs: "¿Cuántos goles habéis marcado?",
    questionAm: "Քանի՞ գոլ եք խփել։",
    modelAnswerEs: "Hemos marcado tres goles.",
    modelAnswerAm: "Մենք երեք գոլ ենք խփել։",
    hint: "Օգտագործիր 'Hemos marcado...'"
  },
  {
    id: 7,
    questionEs: "¿Has bebido suficiente agua?",
    questionAm: "Բավականաչափ ջուր խմե՞լ ես։",
    modelAnswerEs: "Sí, he bebido una botella de agua.",
    modelAnswerAm: "Այո՛, մեկ շիշ ջուր եմ խմել։",
    hint: "Օգտագործիր 'Sí, he bebido...'"
  },
  {
    id: 8,
    questionEs: "¿Por qué estás un poco cansado?",
    questionAm: "Ինչո՞ւ ես մի քիչ հոգնած։",
    modelAnswerEs: "Porque he corrido mucho durante el partido.",
    modelAnswerAm: "Որովհետև խաղի ընթացքում շատ եմ վազել։",
    hint: "Օգտագործիր 'Porque he corrido...'"
  },
  {
    id: 9,
    questionEs: "¿Quién está ganando el partido?",
    questionAm: "Ո՞վ է հաղթում խաղում։",
    modelAnswerEs: "Nuestro equipo está ganando dos a uno.",
    modelAnswerAm: "Մեր թիմը հաղթում է 2։1 հաշվով։",
    hint: "Օգտագործիր 'Nuestro equipo está ganando...'"
  },
  {
    id: 10,
    questionEs: "¿Jugamos al fútbol otra vez mañana?",
    questionAm: "Վաղը նորի՞ց ֆուտբոլ խաղանք։",
    modelAnswerEs: "¡Sí, claro! Después de clase en el campo.",
    modelAnswerAm: "Այո՛, իհարկե։ Դասերից հետո դաշտում։",
    hint: "Արտահայտություն՝ ¡Sí, claro!"
  }
];
