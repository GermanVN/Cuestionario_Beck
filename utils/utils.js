export const getQuestions = (count) => {
  const questions = [
    "Describe con qué frecuencia te sientes triste",
    "¿Hasta qué punto te has sentido desalentado/a en relación a tu futuro?",
    "Describe como te sientes frente al fracaso y con qué frecuencia sientes que fracasas",
    "¿Cómo ha variado tu nivel de placer en las actividades que regularmente disfrutas?",
    "¿Cómo describirías el nivel de culpabilidad que sientes?",
    "Describe si sientes que estas siendo castigado o que mereces ser castigado",
    "¿Qué nivel de confianza o disconformidad tienes acerca de ti mismo?",
    "Como describirías la frecuencia de critica hacia ti mismo",
    "Describe si has tenido pensamientos o deseos suicidas",
    "Describe si has experimentado cambios en la frecuencia o intensidad del llanto",
    "Describe si has notado un aumento en la agitación o inquietud que has experimentado",
    "Describe si has perdido interés en actividades o personas que solías disfrutar",
    "Describe el nivel de dificultad que has experimentado para tomar decisiones",
    "¿Cómo describirías el nivel de valor que te asignas a ti mismo? ",
    "Describe tu nivel de energía para hacer tus actividades",
    "Describe si has experimentado aumento o disminución en las horas que dedicas a dormir habitualmente",
    "¿Qué tan irritable te encuentras habitualmente?",
    "Describe si has experimentado cambios en tu apetito (ya sea aumento o disminución)",
    "Describe si tu capacidad de concentración ha variado recientemente",
    "¿Cómo describirías tu nivel de cansancio o fatiga?",
    "Describe si ha habido cambios en tu interés por el sexo",
  ];

  return questions[count];
};

export const getRateOnly = (response) => {
  let numbers = response.match(/(\d+(\.\d+)?)/g);

  if (numbers) {
  
    return parseInt(numbers[0]);
  }

};

export const getRateFromResponse = (response, rate, setRate, ignore) => {
  console.log("ignore", ignore)
  let total;
  let numbers = response.match(/(\d+(\.\d+)?)/g);

  if (numbers) {
    total = rate + parseInt(numbers[0]);
    
    if (ignore) {
    setRate(total);
    console.log("Sumo calificacion")
    }

    console.log("Calificacion")
    console.log(parseInt(numbers[0]))
    return parseInt(numbers[0]);
  }

  return "No me dio calificacion";
};

export const cleanBotAnswer = (response) => {
  let cleanResponse = "";

  const regex = /\b\d+\s*,/;

  const match = regex.test(response);

  if (match) {
    cleanResponse = response.split(",")[1];

    return cleanResponse;
  }

  return response;
};

