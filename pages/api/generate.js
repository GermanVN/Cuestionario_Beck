import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const text = req.body.text || "";
  if (text.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a answer",
      },
    });
    return;
  }

  const question = req.body.question;

  const total = req.body.total;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(text, question, total),
      temperature: 0.6,
      max_tokens: 1000,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(text, question, total) {
  if (question === "results") {
    if (total === 0) {
      return `Dime que no tengo depresion y que estas muy contenta conmigo ${total} y no se necesitan recomendaciones porque tengo una vida plena`;
    } else if (total > 0 && total <= 13) {
      console.log(
        `Tu puntaje de ${total} en el inventario de Depresión de Beck-ii indica que tienes una depresion minima, dame recomendaciones para una depresion minima`
      );
      return `Dime que tengo una depresión minima con mi puntaje obtenido de ${total} de acuerdo al inventario de depresión de beck-ii y dame recomendaciones para mi depresión minima `;
    } else if (total >= 14 && total <= 19) {
      console.log(
        `Tu puntaje de ${total} en el inventario de Depresión de Beck-ii indica que tienes una depresion leve, dame recomendaciones para una depresion leve`
      );
      return `Dime que tengo una depresión leve con mi puntaje obtenido de ${total} de acuerdo al inventario de depresión de beck-ii y dame recomendaciones para mi depresión leve `;
    } else if (total >= 20 && total <= 28) {
      console.log(
        `Tu puntaje de ${total} en el inventario de Depresión de Beck-ii indica que tienes una depresion moderada, dame recomendaciones para una depresion moderada`
      );
      return `Dime que tengo una depresión moderada con mi puntaje obtenido de ${total} de acuerdo al inventario de depresión de beck-ii y dame recomendaciones para mi depresión moderada `;
    } else {
      console.log(
        `Tu puntaje de ${total} en el inventario de Depresión de Beck-ii indica que tienes una depresion grave, dame recomendaciones para una depresion grave`
      );
      return `Dime que tengo una depresión grave con mi puntaje obtenido de ${total} de acuerdo al inventario de depresión de beck-ii y dame recomendaciones para mi depresión grave `;
    }
    //return `Dime que significa el puntaje de ${total} en el inventario de Depresión de Beck-ii y dame recomendaciones para dicho puntaje, sin citar el tipo de tratamiento que debo de llevar `;
  }

  if (question === 0) {
    return `Califica mi nivel de tristeza del 0 al 3, donde el 0 significa que no estoy nada triste y 3 que no puedo más con mi tristeza. Responde a mi respuesta con empatía.
    user: No me siento triste
    system: 0, Me da gusto que te sientas bien
    user: Me siento triste gran parte del tiempo
    system: 1, Es normal que a veces nos sintamos tristes
    user: Me siento triste todo el tiempo
    system: 2, Lamento que te sientas así
    user: Me siento tan triste o soy tan infeliz que no puedo soportarlo más
    system: 3, Lamento mucho que te sientas así, el hacer este test puede ser el primer paso para que te sientas mejor
    user: ${text}
    system:`;
  }
  if (question === 1) {
    return `Califica mi nivel de pesimismo del 0 al 3, donde el 0 significa que no estoy desalentado respecto mi futuro y 3 que no hay esperanza para mi futuro. Responde a mi respuesta con empatía.
    user: No estoy desalentado respecto a mi futuro
    system: 0, Que bien, es bueno tener metas a futuro
    user: Me siento más desalentado respecto de mi futuro que lo que solía estarlo.
    system: 1, Lamento que te sientas así
    user: No espero que las cosas funcionen para mí
    system: 2, Lamento que te sientas así, es normal que en ocasiones las cosas no salgan como lo planeamos
    user: Siento que no hay esperanza para mi futuro y que solo puede empeorar
    system: 3, Siento mucho que te sientas así, es normal que en ocasiones las cosas no salgan como lo planeamos
    user: ${text}
    system:`;
  }
  if (question === 2) {
    return `Califica mi nivel de autoestima al enfrentar los fracasos del 0 al 3, donde el 0 significa que no me siento como un fracasado y 3 siento que como persona soy un fracaso total. Responde a mi respuesta con empatía.
    user: No me siento como un fracasado
    system: 0, Que bueno que te sientas bien, los fracasos son normales
    user: He fracaso más de lo que hubiera debido
    system: 1, Es normal que a veces no salgan las cosas como planeamos, es bueno enfocarnos en los aprendizajes de los fracasos
    user: Cuando miro hacia atrás veo muchos fracasos
    system: 2, Es normal que a veces no salgan las cosas como planeamos, es bueno enfocarnos en los aprendizajes de los fracasos
    user: Siento como persona soy un fracaso total
    system: 3, Lamento que te sientas así, Es normal que a veces no salgan las cosas como planeamos, es bueno enfocarnos en los aprendizajes de los fracasos
    user: ${text}
    system:`;
  }
  if (question === 3) {
    return `Califica mi nivel de pérdida de placer en la vida del 0 al 3, donde el 0 disfruto las cosas igual que siempre y 3 no puedo obtener ningún placer de las cosas que solía disfrutar. Responde a mi respuesta con empatía
    user: Obtengo tanto placer como siempre por las cosas que disfruto
    system: 0, Muy bien
    user: No disfruto tanto de las cosas como solía hacerlo
    system: 1, Lamento que te sientas así
    user: Obtengo muy poco placer de las cosas que solía disfrutar
    system: 2, Lamento que te sientas así
    user: No puedo obtener ningún placer de las cosas que solía disfrutar
    system: 3, Lamento mucho que te sientas así
    user: ${text}
    system:`;
  }
  if (question === 4) {
    return `Califica mi nivel de culpabilidad del 0 al 3, donde el 0 no me siento particularmente culpable y 3 me siento culpable todo el tiempo. Responde a mi respuesta con empatía.
    user: No me siento particularmente culpable
    system: 0, Muy bien, continuemos…
    user: Me siento culpable respecto de varias cosas que he hecho o que debería haber hecho
    system: 1, Es normal sentirse culpable de vez en cuando
    user: Me siento bastante culpable la mayor parte del tiempo
    system: 2, Lamento que te sientas así
    user: Me siento culpable todo el tiempo
    system: 3, Lamento mucho que te sientas así
    user: ${text}
    system:`;
  }
  if (question === 5) {
    return `Califica mi nivel de percepción frente al castigo del 0 al 3, donde el 0 no siento que este siendo castigado y 3 siento que estoy siendo castigado. Responde a mi respuesta con empatía.
    user: No siento que este siendo castigado
    system: 0, Muy bien, continuemos.. 
    user: Siento que tal vez pueda ser castigado
    system: 1, Lamento que te sientas así
    user: Espero ser castigado
    system: 2, Lamento que te sientas así
    user: Siento que estoy siendo castigado
    system: 3, Lamento que te sientas así
    user: ${text}
    system:`;
  }
  if (question === 6) {
    return `Califica mi nivel de nivel de disconformidad conmigo mismo del 0 al 3, donde el 0 siento acerca de mi lo mismo que siempre y 3 no me gusto a mí mismo. Responde a mi respuesta con empatía.
    user: Siento acerca de mi lo mismo que siempre
    system: 0, Es importante quererse a uno mismo
    user: He perdido la confianza en mí mismo
    system: 1, Lamento que te sientas así
    user: Estoy decepcionado conmigo mismo
    system: 2, Lamento que te sientas así
    user: No me gusto a mí mismo
    system: 3, Lamento que te sientas así
    user: ${text}
    system:`;
  }
  if (question === 7) {
    return `Califica mi nivel de autocrítica del 0 al 3, donde el 0 no me critico ni me culpo más de lo habitual y 3 me culpo a mi mismo por todo lo malo que sucede. Responde a mi respuesta con empatía.
    user: No me critico ni me culpo más de lo habitual
    system: 0, Muy bien, continuemos..
    user: Estoy más crítico conmigo mismo de lo que solía estarlo
    system: 1, Es normal en ocasiones cuestionarnos nuestras acciones
    user: Me crítico a mi mismo por todos mis errores
    system: 2, Lamento que te sientas así
    user: Me culpo a mi mismo por todo lo que sucede
    system: 3, Lamento que te sientas así
    user: ${text}
    system:`;
  }
  if (question === 8) {
    return `Califica mi nivel de pensamientos o deseos suicidas del 0 al 3, donde el 0 no tengo ningún pensamiento de matarme y 3 me mataría si tuviera la oportunidad de hacerlo. Responde a mi respuesta con empatía.
    user: No tengo ningún pensamiento de matarme
    system: 0, Muy bien, continuemos…
    user: He tenido pensamientos de matarme, pero no lo haría
    system: 1, Es normal que en ocasiones nos sintamos mal
    user: Querría matarme
    system: 2, Estoy aquí para ayudarte a salir adelante
    user: Me mataría si tuviera la oportunidad de hacerlo
    system: 3, Estoy aquí para ayudarte a salir adelante
    user: ${text}
    system:`;
  }
  if (question === 9) {
    return `Califica mi incremento de llanto del 0 al 3, donde el 0 no lloro más de lo que solía hacerlo y 3 siento ganas de llorar pero no puedo. Responde a mi respuesta con empatía.
    user: No lloro más de lo que solía hacerlo
    system: 0, Muy bien, continuemos
    user: Lloro más de lo que solía hacerlo
    system: 1, Es normal que nos sintamos tristes
    user: Lloro por cualquier pequeñez
    system: 2, Lamento que te sientas así
    user: Siento ganas de llorar pero no puedo hacerlo
    system: 3, Lamento que te sientas así
    user: ${text}
    system:`;
  }

  if (question === 10) {
    return `Califica mi nivel de agitación del 0 al 3, donde el 0 No estoy más inquieto o tenso que lo habitual y 3 Estoy tan inquieto o agitado que tengo que esar siempre en movimiento o haciendo algo. Responde a mi respuesta con empatía.
    user: No estoy más inquieto o tenso que lo habitual
    system: 0, Muy bien, continuemos
    user: Me siento más inquieto o tenso que lo habitual
    system: 1, Es normal que nos sintamos inquietos de repente
    user: Estoy tan inquieto o agitado que me es difícil quedarme quieto
    system: 2, Lamento que te sientas así
    user: Estoy tan inquieto o agitado que tengo que estar siempre en movimiento o haciendo algo
    system: 3, Lamento que te sientas así
    user: ${text}
    system:`;
  }

  if (question === 11) {
    return `Califica mi nivel de pérdida de interés del 0 al 3, donde el 0 No he perdido el interés en otras actividades o personas y 3 Me es difícil interesarme por algo. Responde a mi respuesta con empatía.
    user: No he perdido el interés en otras actividades o personas
    system: 0, Muy bien, continuemos
    user: Estoy menos interesado que antes en otras personas o cosas
    system: 1, Es normal que en ocasiones nos sintamos con menos interés
    user: He perdido casi todo el interés en otras personas o cosas
    system: 2, Lamento que te sientas así
    user: Me es difícil interesarme por algo
    system: 3, Lamento que te sientas así
    user: ${text}
    system:`;
  }

  if (question === 12) {
    return `Califica mi nivel de indecisión del 0 al 3, donde el 0 Tomo mis propias decisiones tan bien como siempre y 3 Tengo problemas para tomar cualquier decisión. Responde a mi respuesta con empatía.
    user: Tomo mis propias decisiones tan bien como siempre
    system: 0, Muy bien, continuemos
    user: Me resulta más difícil que de costumbre tomar decisiones
    system: 1, Es normal que en ocasiones nos sintamos indecisos
    user: Encuentro mucha más dificultad que antes para tomar decisiones
    system: 2, Lamento que te sientas así
    user: Tengo problemas para tomar cualquier decisión
    system: 3, Lamento que te sientas así
    user: ${text}
    system:`;
  }

  if (question === 13) {
    return `Califica mi nivel de desvalorización del 0 al 3, donde el 0 No siento que yo no sea valioso y 3 Siento que no valgo nada. Responde a mi respuesta con empatía.
    user: No siento que yo no sea valioso
    system: 0, Muy bien, continuemos
    user: No me considero a mi mismo tan valioso y útil como solía considerarme
    system: 1, Es normal que en ocasiones nos sintamos indecisos
    user: Me siento menos valioso cuando me comparo con otros
    system: 2, Lamento que te sientas así
    user: Siento que no valgo nada
    system: 3, Lamento que te sientas así
    user: ${text}
    system:`;
  }

  if (question === 14) {
    return `Califica mi nivel de pérdida de energía del 0 al 3, donde el 0 Tengo tanta energía como siempre y 3 No tengo energía suficiente para hacer nada. Responde a mi respuesta con empatía.
    user: Tengo tanta energía como siempre
    system: 0, Muy bien, continuemos
    user: Tengo menos energía que la que solía tener
    system: 1, Es normal que en ocasiones nos sintamos bajos en energía
    user: No tengo suficiente energía para hacer demasiado
    system: 2, Lamento que te sientas así
    user: No tengo energía suficiente para hacer nada
    system: 3, Lamento que te sientas así
    user: ${text}
    system:`;
  }

  if (question === 15) {
    return `Califica mi nivel de cambios en mis hábitos del sueño del 0 al 3, donde el 0 No he experimentado ningún cambio en mis hábitos de sueño y 3 duermo la mayor parte del día o me despierto 1-2 horas más temprano y no puedo volver a dormirme. Responde a mi respuesta con empatía.
    user: No he experimentado ningún cambio en mis hábitos de sueño
    system: 0, Muy bien, continuemos
    user: Duermo un poco más de lo habitual o Duermo un poco menos que lo habitual
    system: 1, Es normal que en ocasiones cambiemos un poco nuestros hábitos del sueño, pero hay que prestar interés si esto se vuelve regular
    user: Duermo mucho más que lo habitual o Duermo mucho menos que lo habitual
    system: 2, Lamento que te sientas así
    user: Duermo la mayor parte del día o Me despierto 1-2 horas más temprano y no puedo volver a dormirme
    system: 3, Lamento que te sientas así
    user: ${text}
    system:`;
  }

  if (question === 16) {
    return `Califica mi nivel de irritabilidad del 0 al 3, donde el 0 No estoy tan irritable que lo habitual y 3 Estoy irritable todo el tiempo. Responde a mi respuesta con empatía.
    user: No estoy tan irritable que lo habitual
    system: 0, Muy bien, continuemos
    user: Estoy más irritable que lo habitual
    system: 1, Es normal que en ocasiones nos sintamos irritables
    user: Estoy mucho mas irritable que lo habitual
    system: 2, Lamento que te sientas así
    user: Estoy irritable todo el tiempo
    system: 3, Lamento que te sientas así
    user: ${text}
    system:`;
  }

  if (question === 17) {
    return `Califica mi nivel de cambios en el apetito del 0 al 3, donde el 0 No he experimentado ningún cambio en mi apetito y 3 No tengo apetito en absoluto o quiero comer todo el día. Responde a mi respuesta con empatía.
    user: No he experimentado ningún cambio en mi apetito
    system: 0, Muy bien, continuemos
    user: Mi apetito es un poco menor que lo habitual o mi apetito es un poco mayor que lo habitual
    system: 1, Es normal que en ocasiones nos sintamos indecisos
    user: Mi apetito es mucho menor que antes o mi apetito es mucho mayor que lo habitual
    system: 2, Lamento que te sientas así
    user: No tengo apetito en absoluto o quiero comer todo el día
    system: 3, Lamento que te sientas así
    user: ${text}
    system:`;
  }

  if (question === 18) {
    return `Califica mi nivel de concentración del 0 al 3, donde el 0 Puedo concentrarme tan bien como de costumbre y 3 Encuentro que no puedo concentrarme en nada. Responde a mi respuesta con empatía.
    user: Puedo concentrarme tan bien como siempre
    system: 0, Muy bien, continuemos
    user: No puedo concentrarme tan bien como habitualmente
    system: 1, Es normal que en ocasiones nos sintamos indecisos
    user: Me es difícil mantener la mente en algo por mucho tiempo 
    system: 2, Lamento que te sientas así
    user: Encuentro que no puedo concentrarme en nada
    system: 3, Lamento que te sientas así
    user: ${text}
    system:`;
  }

  if (question === 19) {
    return `Califica mi nivel de cansancio o fatiga del 0 al 3, donde el 0 No estoy más cansado o fatigado que lo habitual y 3 Estoy demasiado fatigado o cansado para hacer la mayoría de las cosas que solía hacer. Responde a mi respuesta con empatía.
    user: No estoy más cansado o fatigado que lo habitual
    system: 0, Muy bien, continuemos
    user: Me fatigo o me canso más fácilmente que lo habitual
    system: 1, Es normal que en ocasiones nos sintamos cansados
    user: Estoy demasiado fatigado o cansado para hacer muchas de las cosas que solía hacer
    system: 2, Lamento que te sientas así
    user: Estoy demasiado fatigado o cansado para hacer la mayoría de las cosas que solía hacer
    system: 3, Lamento que te sientas así
    user: ${text}
    system:`;
  }

  if (question === 20) {
    return `Califica mi nivel de pérdida de interés en el sexo del 0 al 3, donde el 0 No he notado ningún cambio reciente en mi interés por el sexo y 3 He perdido completamente el interés en el sexo. Responde a mi respuesta con empatía.
    user: No he notado ningún cambio reciente en mi interés por el sexo
    system: 0, Muy bien, continuemos
    user: Estoy menos interesado en el sexo de lo que solía estarlo
    system: 1, Es normal que en ocasiones nos sintamos menos interesados en el sexo que de costumbre
    user: Estoy mucho menos interesado en el sexo
    system: 2, Lamento que te sientas así
    user: He perdido completamente el interés en el sexo
    system: 3, Lamento que te sientas así
    user: ${text}
    system:`;
  }
}
