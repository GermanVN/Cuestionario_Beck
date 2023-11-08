import { Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Divider from "../components/Divider";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Messages from "../components/Messages";
import { fetchResponse } from "../../utils/Fetch";
import {
  getQuestions,
  getRateFromResponse,
  getRateOnly,
} from "../../utils/utils";

let count = 0;
let answers = [];

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [rate, setRate] = useState(0);
  const [initial, setInitial] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const [personalData, setPersonalData] = useState({});
  const [completed, setCompleted] = useState(false);
  const [ignore, setIgnore] = useState(false)
  const [questionnaireInfo, setQuestionnaireInfo] = useState([]);

  useEffect(() => {

    document.title = "BlueSensAI";
    setPersonalData(props.userInfo);

    setTimeout(() => {

      const greetingMessage = `Hola ${props.userInfo.name} vamos a empezar con nuestra sesión`;
      const introMessage = `Te haré una serie de preguntas. Por favor lee con atención cada una de ellas cuidadosamente. Luego responde cada una de ellas con lo que mejor describa el modo de como te has sentido en <strong>las últimas dos semanas, incluyendo el día de hoy.</strong> <br><br><p>Escribe cualquier cosa para continuar</p>`;


      var utterance = new window.SpeechSynthesisUtterance();
      utterance.lang = "es-MX";
      utterance.volume = 4.0;
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      utterance.text = `Hola ${props.userInfo.name} vamos a empezar con nuestra sesión`;

      //speechSynthesis.speak(utterance);

      setMessages((old) => [
        ...old,
        {
          from: "computer",
          text: greetingMessage,
        },
      ]);
      setMessages((old) => [
        ...old,
        {
          from: "computer",
          text: introMessage,
        },
      ]);
    }, 2000);
  }, []);

  const handleFinish = () => {
    console.log("FIN");
    setMessages((old) => [
      ...old,
      {
        from: "computer",
        text: `Ya terminó nuestra sesión, gracias por contestar las preguntas. Para los siguientes pasos favor de consultar tu correo. Ya puedes cerrar esta ventana.`,
      },
    ]);
  };

  const sendEmailResults = async (rate, finalResponse) => {
    console.log("Personal Data");
    console.log(personalData);

    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({
        subject: `Reporte de respuestas chat -${personalData.name}`,
        email: personalData.email,
        name: personalData.name,
        apeido: personalData.apeido,
        age: personalData.edad,
        mental: personalData.mental,
        cronica: personalData.cronica,
        gender: personalData.sexo,
        level: personalData.nivel,
        ocupation: personalData.ocupacion,
        answers: answers,
        total: rate,
        resultado: finalResponse,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();
    if (error) {
      console.log(error);
      return;
    }
  };

  const transformFinalAnswer = (response, total) => {
    if (total === 0) {
      return response;
    } else if (total > 0 && total <= 13) {
      return (
        "De acuerdo con las respuestas que proporcionaste, tu puntaje obtenido basado en el inventario de depresión de Beck-II, no se identificaron síntomas relacionados con la depresión. Te dejo aquí unas recomendaciones preliminares:" +
        response
      );
    } else if (total >= 14 && total <= 19) {
      return (
        "De acuerdo con las respuestas que proporcionaste, tu puntaje obtenido basado en el inventario de depresión de Beck-II, se identificaron síntomas relacionados con la depresión. Te dejo aquí unas recomendaciones preliminares:" +
        response
      );
    } else if (total >= 20 && total <= 28) {
      return (
        "De acuerdo con las respuestas que proporcionaste, tu puntaje obtenido basado en el inventario de depresión de Beck-II, se identificaron síntomas relacionados con la depresión. Te dejo aquí unas recomendaciones preliminares:" +
        response
      );
    } else {
      return (
        "De acuerdo con las respuestas que proporcionaste, tu puntaje obtenido basado en el inventario de depresión de Beck-II, se identificaron síntomas relacionados con la depresión. Te dejo aquí unas recomendaciones preliminares:" +
        response
      );
    }
  };

  const sendEmailResultsPatient = async (rate, finalResponse) => {
    console.log("Personal Data");
    console.log(personalData);

    const res = await fetch("/api/sendgrid2", {
      body: JSON.stringify({
        subject: `Resultados preliminares y Siguientes pasos - Chat Generative AI-${personalData.name}`,
        email: personalData.email,
        name: personalData.name,
        apeido: personalData.apeido,
        age: personalData.edad,
        mental: personalData.mental,
        cronica: personalData.cronica,
        gender: personalData.sexo,
        level: personalData.nivel,
        ocupation: personalData.ocupacion,
        total: rate,
        resultado: finalResponse,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();
    if (error) {
      console.log(error);
      return;
    }
  };

  //Cuando el usuario mando su respuesta
  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;
    setMessages((old) => [...old, { from: "me", text: data }]);
    setInputMessage("");

    const response = await fetchResponse(data, count);
    console.log("GERMAN ", response);

    console.log("CONTADOR", count);

    const regex = /almatonta\d+/;

    // Cuando Termina el cuestionario
    if (count == 20 && getRateFromResponse(response, rate, setRate, ignore) !== "No me dio calificacion" && inputMessage.length > 10) {
      console.log("Resultado FInal");
      console.log(inputMessage);

      //let num = parseInt(inputMessage.replace(/\D/g, ""));
      //console.log("PROBANDO",num);
      let lastRate = getRateFromResponse(response, rate, setRate);

      setTimeout(() => {
        setMessages((old) => [
          ...old,
          {
            from: "computer",
            text: `Gracias ${props.userInfo?.name} por contestar todas las preguntas, estamos procesando tus respuestas, por favor espera. Toma en cuenta que los resultados que se te muestran aquí son preliminares y no reflejan una evaluación completa. Tus resultados finales, junto con unas recomendaciones de acuerdo a tus puntajes, se te compartirán por correo una vez que completes los otros cuestionarios a través del link que se te esta mandando al correo que proporcionaste.`,
          },
        ]);
      }, 2000);

      let finalResponse = await fetchResponse(
        data,
        "results",
        lastRate !== "No me dio calificacion" ? rate + lastRate : rate
        //num
      );

      //Add Tipo de depresion a la respuesta final
      finalResponse = transformFinalAnswer(
        finalResponse,
        lastRate !== "No me dio calificacion" ? rate + lastRate : rate
      );

      answers.push(`${count + 1} | ${data} | ${getRateOnly(response)}`);
      setQuestionnaireInfo(answers);
      console.log(answers);

      console.log("LLEGO AL FINAL");

      setTimeout(() => {
        if (!initial) {
          count = count + 1;
        }

        if (initial) {
          setInitial(false);
        }

        setMessages((old) => [
          ...old,
          { from: "computer", text: finalResponse },
        ]);
      }, 8000);

      setTimeout(() => {
        if (!initial) {
          count = count + 1;
        }

        if (initial) {
          setInitial(false);
        }

        setMessages((old) => [
          ...old,
          {
            from: "computer",
            text: `Te hemos mandado los resultados al email que ingresaste: ${props.userInfo?.email}.`,
          },
        ]);
      }, 12000);
      sendEmailResults(
        lastRate !== "No me dio calificacion" ? rate + lastRate : rate,
        //rate,
        finalResponse
      );
      sendEmailResultsPatient(
        lastRate !== "No me dio calificacion" ? rate + lastRate : rate,
        //rate,
        finalResponse
      );
      setCompleted(true);
    }


    else if (
      count == 20
    ) {
      console.log("NO TENGO CALIFICACION Casp = 20");
      setIgnore(true)
      setTimeout(() => {
        setMessages((old) => [
          ...old,
          {
            from: "computer",
            text: !initial
              ? "Por favor me puedes explicar un poco más? Trata de ser un poco más descriptivo, te voy a repetir la pregunta"
              : "Perfecto comenzemos con las siguientes preguntas",
          },
        ]);
      }, 2000);

      setTimeout(() => {
        if (!initial) {
        }

        if (initial) {
          setInitial(false);
        }

        setMessages((old) => [
          ...old,
          { from: "computer", text: getQuestions(count) },
        ]);
      }, 4000);
    }



    //Cuando todavia no termina el cuestionario y si le dio calificacion


    else if (
      count < 20 &&
      getRateFromResponse(response, rate, setRate, ignore) !== "No me dio calificacion" && inputMessage.length > 10
    ) {
      console.log("SI TENGO CALIFICACION CASO antes del 20");
      
      if (ignore)
      {
      
        answers.push(`${count + 1} | ${data} | ${getRateOnly(response)}`);
        console.log(answers);
    
       
      }
      setIgnore(true)
  

      setTimeout(() => {
        if (!initial) {
          count = count + 1;
        }

        if (initial) {
          setInitial(false);
        }

        setMessages((old) => [
          ...old,
          { from: "computer", text: getQuestions(count) },
        ]);
      }, 2000);
    }

    //Cuando todavia no termina el cuestionario y no le dio calificacion


   else  if (
      count < 20 &&
      getRateFromResponse(response, rate, setRate, ignore) === "No me dio calificacion" || inputMessage.length < 10
    ) {
      console.log("NO TENGO CALIFICACION Caso antes del 20");
      setIgnore(true)
      setTimeout(() => {
        setMessages((old) => [
          ...old,
          {
            from: "computer",
            text: !initial
              ? "Por favor me puedes explicar un poco más? Trata de ser un poco más descriptivo, te voy a repetir la pregunta"
              : "Perfecto comenzemos con las siguientes preguntas",
          },
        ]);
      }, 2000);

      setTimeout(() => {
        if (!initial) {
        }

        if (initial) {
          setInitial(false);
        }

        setMessages((old) => [
          ...old,
          { from: "computer", text: getQuestions(count) },
        ]);
      }, 4000);
    }


  };

  return (
    <Flex w="100%" h="100vh" justify="center" align="center">
      <Flex w={["100%", "100%", "40%"]} h="90%" flexDir="column">
        <Header name={props.userInfo?.name} apeido={props.userInfo?.apeido} />
        <Divider />
        <Messages messages={messages} />
        <Divider />
        <Footer
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={!completed ? handleSendMessage : handleFinish}
        />
      </Flex>
    </Flex>
  );
};

export default Chat;
