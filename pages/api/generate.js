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
      return `Dime que no presento sintomas de depresion de acuerdo a tus respuestas, basado en el inventario de Depresion de Beck-ii, y dame recomendaciones para manetener un buen estado de animo`;
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
    return `Califica mi nivel de tristeza del 0 al 3, donde el 0 significa que no estoy nada triste o que estoy feliz y 3 que no puedo más con mi tristeza o que estoy muy triste o que soy muy infeliz.
    user: No me siento triste, estoy feliz.
    system: 0,
    user: Me siento triste, me siento triste frecuentemente
    system: 1,
    user: Me siento triste todo el tiempo y no puedo evitarlo, me siento triste muy frecuentemente
    system: 2,
    user: Me siento tan triste o soy tan infeliz que no puedo soportarlo más o significa una gran carga emocional, me siento triste siempre
    system: 3,
    user: ${text}
    system:`;
  }
  if (question === 1) {
    return `Califica mi nivel de pesimismo del 0 al 3, donde el 0 significa que no estoy desalentado o desanimado respecto mi futuro y 3 que no hay esperanza para mi futuro o que mi futuro es castastrófico.
    user: No estoy desalentado o desanimado respecto a mi futuro, Me siento optimista respecto a mi futuro
    system: 0,
    user: Me siento más desalentado respecto de mi futuro que lo que solía estarlo, me siento poco optimista
    system: 1,
    user: No espero que las cosas funcionen para mí, no espero que vaya a salir de ésta situación.
    system: 2,
    user: Siento que no hay esperanza para mi futuro y que solo puede empeorar, siento que mi futuro es catastrófico,
    system: 3,
    user: ${text}
    system:`;
  }
  if (question === 2) {
    return `Califica mi nivel de autoestima al enfrentar los fracasos del 0 al 3, donde el 0 significa que no me siento como un fracasado o me siento una persona exitosa, productiva y 3 siento que como persona soy un fracaso total o que no soy para nada una persona exitosa, productiva.
    user: No me siento como un fracasado, me siento una persona exitosa o productiva.
    system: 0,
    user: He fracaso más de lo que hubiera debido, he tenido fracasos frecuentes.
    system: 1,
    user: Cuando miro hacia atrás veo muchos fracasos, he tenido fracasos muy frecuentemente.
    system: 2,
    user: Siento como persona soy un fracaso total, tengo fracasos siempre, siempre soy un fracasado.
    system: 3,
    user: ${text}
    system:`;
  }
  if (question === 3) {
    return `Califica mi nivel de pérdida de placer en la vida del 0 al 3, donde el 0 disfruto las cosas igual que siempre u obtengo tanta satisfacción de las cosas como siempre y 3 no puedo obtener ningún placer de las cosas que solía disfrutar o estoy insatisfecho y aburrido con todo.
    user: Obtengo tanto placer como siempre por las cosas que disfruto, obtengo tanta satisfacción de las cosas como siempre
    system: 0,
    user: No disfruto tanto de las cosas como solía hacerlo
    system: 1,
    user: Obtengo muy poco placer de las cosas que solía disfrutar
    system: 2,
    user: No puedo obtener ningún placer de las cosas que solía disfrutar, ya no obtengo nada de satisfacción o placer por las cosas que disfrutaba, o estoy insatisfecho y aburrido con todo
    system: 3,
    user: ${text}
    system:`;
  }
  if (question === 4) {
    return `Califica mi nivel de culpabilidad del 0 al 3, donde el 0 no me siento particularmente culpable o para nada me siento culpable y 3 me siento culpable todo el tiempo.
    user: No me siento particularmente culpable, para nada me siento culpable
    system: 0,
    user: Me siento culpable respecto de varias cosas que he hecho o que debería haber hecho, me siento culpable frecuentemente.
    system: 1,
    user: Me siento bastante culpable la mayor parte del tiempo, me siento culpable muy frecuentemente.
    system: 2,
    user: Me siento culpable todo el tiempo, todo el tiempo me siento culpable, por cualquier cosa me siento culpable.
    system: 3,
    user: ${text}
    system:`;
  }
  if (question === 5) {
    return `Califica mi nivel de percepción frente al castigo del 0 al 3, donde el 0 no siento que este siendo castigado y 3 siento que estoy siendo castigado.
    user: No siento que este siendo castigado, no creo que deba ser castigado.
    system: 0,
    user: Siento que tal vez pueda ser castigado, siento que podría ser castigado.
    system: 1,
    user: Espero ser castigado, me gustaría ser castigado.
    system: 2,
    user: Siento que estoy siendo castigado
    system: 3,
    user: ${text}
    system:`;
  }
  if (question === 6) {
    return `Califica mi nivel de nivel de disconformidad o decepción conmigo mismo del 0 al 3, donde el 0 siento acerca de mi lo mismo que siempre, no tengo ninguna disconformidad o decepción de mí mismo, me siento feliz con quién soy, me acepto tal cual soy.
    y 3 no me gusto a mí mismo.
    user: Siento acerca de mi lo mismo que siempre, no tengo ninguna disconformidad o decepción de mí mismo, siento lo mismo que antes sobre mí mismo, no me siento decepcionado o disconforme conmigo mismo, me quiero tal cual soy.
     
    system: 0,
    user: He perdido la confianza en mí mismo
    system: 1,
    user: Estoy decepcionado conmigo mismo, estoy decepcionado o disconforme conmigo mismo,me doy vergüenza a mí mismo.
     
    system: 2,
    user: No me gusto a mí mismo, no me gusto, me odio, no me quiero a mí mismo.
    system: 3,
    user: ${text}
    system:`;
  }
  if (question === 7) {
    return `Califica mi nivel de autocrítica del 0 al 3, donde el 0 no me critico ni me culpo más de lo habitual y 3 me culpo a mi mismo por todo lo malo que sucede.
    user: No me critico ni me culpo más de lo habitual, no me critico o me culpo más que antes, no me considero peor que cualquier otra persona.
    system: 0,
    user: Estoy más crítico conmigo mismo de lo que solía estarlo, soy más crítico conmigo mismo de lo que solía ser,
    system: 1,
    user: Me crítico a mí mismo por todos mis errores, critico todos mis defectos, me critico muy frecuentemente por todos mis errores, me culpo muy frecuentemente por todos mis errores.
    system: 2,
    user: Me culpo a mí mismo por todo lo que sucede, me culpo por todo lo malo que sucede, me culpo siempre por todo lo malo que sucede.
    system: 3,
    user: ${text}
    system:`;
  }
  if (question === 8) {
    return `Califica mi nivel de pensamientos o deseos suicidas del 0 al 3, donde el 0 no tengo ningún pensamiento de matarme y 3 me mataría si tuviera la oportunidad de hacerlo.
    user: No tengo ningún pensamiento de matarme, no tengo ningún pensamiento de suicidio.
    system: 0,
    user: He tenido pensamientos de matarme, pero no lo haría, tengo pensamientos de suicidio, pero no los llevaría a cabo, tengo pensamientos ocasionales de matarme pero no lo llevaría a cabo.
    system: 1,
    user: Querría matarme, me gustaría suicidarme, tengo la idea de suicidarme
    system: 2,
    user: Me mataría si tuviera la oportunidad de hacerlo, tengo un plan para suicidarme.
    system: 3,
    user: ${text}
    system:`;
  }
  if (question === 9) {
    return `Califica mi incremento de llanto del 0 al 3, donde el 0 no lloro más de lo que solía hacerlo y 3 siento ganas de llorar pero no puedo.
    user: No lloro más de lo que solía hacerlo, no lloro más que antes
    system: 0,
    user: Lloro más de lo que solía hacerlo, ahora lloro más que antes, lloro frecuentemente
    system: 1,
    user: Lloro por cualquier pequeñez, lloro muy frecuentemente
    system: 2,
    user: Siento ganas de llorar pero no puedo hacerlo, estoy tan mal que, ya no puedo ni llorar
    system: 3,
    user: ${text}
    system:`;
  }

  if (question === 10) {
    return `Califica mi nivel de agitación o irritación del 0 al 3, donde el 0 No estoy más inquieto o tenso que lo habitual y 3 Estoy tan inquieto o agitado que tengo que esar siempre en movimiento o haciendo algo.
    user: No estoy más inquieto o tenso que lo habitual, no me irritan las cosas más que antes
    system: 0,
    user: Me siento más inquieto o tenso que lo habitual, actualmente me irritan las cosas ligeramente más que antes
    system: 1,
    user: Estoy tan inquieto o agitado que me es difícil quedarme quieto, estoy bastante molesto o irritado buena parte del tiempo, estoy molesto o irritado muy frecuentemente.
    system: 2,
    user: Estoy tan inquieto o agitado que tengo que estar siempre en movimiento o haciendo algo, estoy bastante molesto o irritado siempre o todo los días.
    system: 3,
    user: ${text}
    system:`;
  }

  if (question === 11) {
    return `Califica mi nivel de pérdida de interés del 0 al 3, donde el 0 No he perdido el interés en otras actividades o personas y 3 Me es difícil interesarme por algo.
    user: No he perdido el interés en otras actividades o personas, no he perdido el interés en los demás, me encuentro interesado en otras actividades, personas o cosas.
    system: 0,
    user: Estoy menos interesado que antes en otras personas o cosas, he perdido un poco de interés en otras actividades, personas o cosas.
    system: 1,
    user: He perdido casi todo el interés en otras personas o cosas, he perdido en gran medida el interés por los demás, he perdido el interés en otras actividades, personas o cosas
    system: 2,
    user: Me es difícil interesarme por algo, he perdido todo el interés en otras actividades, personas o cosas, no me interesa ninguna actividade, persona ni cosa.
    system: 3,
    user: ${text}
    system:`;
  }

  if (question === 12) {
    return `Califica mi nivel de indecisión del 0 al 3, donde el 0 Tomo mis propias decisiones tan bien como siempre y 3 Tengo problemas para tomar cualquier decisión.
    user: Tomo mis propias decisiones tan bien como siempre
    system: 0,
    user: Me resulta más difícil que de costumbre tomar decisiones
    system: 1,
    user: Encuentro mucha más dificultad que antes para tomar decisiones
    system: 2,
    user: Tengo problemas para tomar cualquier decisión
    system: 3,
    user: ${text}
    system:`;
  }

  if (question === 13) {
    return `Califica mi nivel de desvalorización del 0 al 3, donde el 0 No siento que yo no sea valioso y 3 Siento que no valgo nada.
    user: No siento que yo no sea valioso
    system: 0,
    user: No me considero a mi mismo tan valioso y útil como solía considerarme
    system: 1,
    user: Me siento menos valioso cuando me comparo con otros
    system: 2,
    user: Siento que no valgo nada
    system: 3,
    user: ${text}
    system:`;
  }

  if (question === 14) {
    return `Califica mi nivel de pérdida de energía del 0 al 3, donde el 0 Tengo tanta energía como siempre y 3 No tengo energía suficiente para hacer nada.
    user: Tengo tanta energía como siempre
    system: 0,
    user: Tengo menos energía que la que solía tener
    system: 1,
    user: No tengo suficiente energía para hacer demasiado
    system: 2,
    user: No tengo energía suficiente para hacer nada
    system: 3,
    user: ${text}
    system:`;
  }

  if (question === 15) {
    return `Califica mi nivel de cambios en mis hábitos del sueño del 0 al 3, donde el 0 No he experimentado ningún cambio en mis hábitos de sueño y 3 duermo la mayor parte del día o me despierto 1-2 horas más temprano y no puedo volver a dormirme.
    user: No he experimentado ningún cambio en mis hábitos de sueño
    system: 0,
    user: Duermo un poco más de lo habitual
    system: 1,
    user: Duermo un poco menos que lo habitual
    system: 1,
    user: Duermo mucho más que lo habitual o Duermo mucho menos que lo habitual
    system: 2,
    user: Duermo la mayor parte del día o Me despierto 1-2 horas más temprano y no puedo volver a dormirme
    system: 3,
    user: ${text}
    system:`;
  }

  if (question === 16) {
    return `Califica mi nivel de irritabilidad del 0 al 3, donde el 0 No estoy tan irritable que lo habitual y 3 Estoy irritable todo el tiempo.
    user: No estoy tan irritable que lo habitual
    system: 0,
    user: Estoy más irritable que lo habitual
    system: 1,
    user: Estoy mucho mas irritable que lo habitual
    system: 2,
    user: Estoy irritable todo el tiempo
    system: 3,
    user: ${text}
    system:`;
  }

  if (question === 17) {
    return `Califica mi nivel de cambios en el apetito del 0 al 3, donde el 0 No he experimentado ningún cambio en mi apetito y 3 No tengo apetito en absoluto o quiero comer todo el día.
    user: No he experimentado ningún cambio en mi apetito
    system: 0,
    user: Mi apetito es un poco menor que lo habitual o mi apetito es un poco mayor que lo habitual
    system: 1,
    user: Mi apetito es mucho menor que antes o mi apetito es mucho mayor que lo habitual
    system: 2,
    user: No tengo apetito en absoluto o quiero comer todo el día
    system: 3,
    user: ${text}
    system:`;
  }

  if (question === 18) {
    return `Califica mi nivel de concentración del 0 al 3, donde el 0 Puedo concentrarme tan bien como de costumbre y 3 Encuentro que no puedo concentrarme en nada.
    user: Puedo concentrarme tan bien como siempre
    system: 0,
    user: No puedo concentrarme tan bien como habitualmente
    system: 1,
    user: Me es difícil mantener la mente en algo por mucho tiempo
    system: 2,
    user: Encuentro que no puedo concentrarme en nada
    system: 3,
    user: ${text}
    system:`;
  }

  if (question === 19) {
    return `Califica mi nivel de cansancio o fatiga del 0 al 3, donde el 0 No estoy más cansado o fatigado que lo habitual y 3 Estoy demasiado fatigado o cansado para hacer la mayoría de las cosas que solía hacer.
    user: No estoy más cansado o fatigado que lo habitual
    system: 0,
    user: Me fatigo o me canso más fácilmente que lo habitual
    system: 1,
    user: Estoy demasiado fatigado o cansado para hacer muchas de las cosas que solía hacer
    system: 2,
    user: Estoy demasiado fatigado o cansado para hacer la mayoría de las cosas que solía hacer
    system: 3,
    user: ${text}
    system:`;
  }

  if (question === 20) {
    return `Califica mi nivel de pérdida de interés en el sexo del 0 al 3, donde el 0 No he notado ningún cambio reciente en mi interés por el sexo y 3 He perdido completamente el interés en el sexo.
    user: No he notado ningún cambio reciente en mi interés por el sexo
    system: 0,
    user: Estoy menos interesado en el sexo de lo que solía estarlo
    system: 1,
    user: Estoy mucho menos interesado en el sexo
    system: 2,
    user: He perdido completamente el interés en el sexo
    system: 3,
    user: ${text}
    system:`;
  }
}

