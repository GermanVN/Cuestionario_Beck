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
let answers = []



const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [rate, setRate] = useState(0);
  const [initial, setInitial] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const [personalData, setPersonalData] = useState({});
  const [questionnaireInfo, setQuestionnaireInfo] = useState([])

  useEffect(() => {

    setPersonalData(props.userInfo)

    setTimeout(() => {
      var utterance = new window.SpeechSynthesisUtterance();
      utterance.lang = "es-MX";
      utterance.volume = 4.0;
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      utterance.text = "Buenos días vamos a empezar con nuestra sesión";

      speechSynthesis.speak(utterance);

      setMessages((old) => [
        ...old,
        {
          from: "computer",
          text: "Buenos días vamos a empezar con nuestra sesión",
        },
      ]);
      setMessages((old) => [
        ...old,
        {
          from: "computer",
          text: "Si estas de acuerdo te haré unas preguntas para entender un poco más acerca de como te sientes, te recomiendo contestar con lo que mejor describa el modo de como te has sentido en los últimas dos semanas incluyendo el día de hoy",
        },
      ]);
    }, 2000);
  }, []);

  const sendEmailResults=async (rate, finalResponse)=> {

    console.log("Personal Data")
    console.log(personalData)
  
    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({
        subject: `Inventario de depresión de Beck -${personalData.name}`,
        email: personalData.email,
        name: personalData.name,
        age: personalData.edad,
        mental: personalData.mental,
        cronica: personalData.cronica,
        gender: personalData.sexo,
        level: personalData.nivel,
        ocupation: personalData.ocupacion,
        answers: answers,
        total: rate,
        resultado: finalResponse
  
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
   }


  //Cuando el usuario mando su respuesta
  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;
    setMessages((old) => [...old, { from: "me", text: data }]);
    setInputMessage("");

    const response = await fetchResponse(data, count);


    console.log("CONTADOR", count);

    const regex = /almatonta\d+/;
    

    // Cuando Termina el cuestionario
    if(count == 20 || regex.test(inputMessage)) {

      console.log("Resultado FInal")
      console.log(inputMessage)

      //Volver a poner las lineas de aabajo comentadas para que funcione bien
      let lastRate = getRateFromResponse(response, rate, setRate)

      setTimeout(() => {

        setMessages((old) => [
          ...old,
          { from: "computer", text: `Gracias ${props.userInfo?.name} por contestar todas las preguntas, estamos procesando sus respuestas para mostrate el resultado, por favor espere` },
        ]);
      }, 2000);

      let finalResponse = await fetchResponse(data, "results", lastRate !== "No me dio calificacion" ? rate + lastRate : rate);
      
      //let finalResponse = await fetchResponse(data, "results", inputMessage.split(/\D+/)[1]);

      answers.push(`${count+1} | ${data} | ${getRateOnly(response)}`)
      setQuestionnaireInfo(answers)
      console.log(answers)

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
          { from: "computer", text: finalResponse},
        ]);
      }, 4000);

      setTimeout(() => {
        if (!initial) {
          count = count + 1;
        }

        if (initial) {
          setInitial(false);
        }

        setMessages((old) => [
          ...old,
          { from: "computer", text: `Le mandaremos los resultados de este cuestionario a su email: ${props.userInfo?.email}`},
        ]);
      }, 8000);
      sendEmailResults(lastRate !== "No me dio calificacion" ? rate + lastRate : rate,  finalResponse)

    }

    //Cuando todavia no termina el cuestionario y si le dio calificacion

    if (
      count < 20 && getRateFromResponse(response, rate, setRate) !== "No me dio calificacion"
    ) {
      console.log("SI TENGO CALIFICACION");

      answers.push(`${count+1} | ${data} | ${getRateOnly(response)}`)
      console.log(answers)

      setTimeout(() => {
        //startSpeak(cleanBotAnswer(response))

        setMessages((old) => [
          ...old,
          { from: "computer", text: getRateOnly(response) },
        ]);
      }, 1000);

      setTimeout(() => {
        if (!initial) {
          count = count + 1;
        }

        if (initial) {
          setInitial(false);
        }

        setMessages((old) => [
          ...old,
          { from: "computer", text: getQuestions(count)},
        ]);
      }, 2000);
    }

    //Cuando todavia no termina el cuestionario y no le dio calificacion

    if (
      count < 20 && getRateFromResponse(response, rate, setRate) === "No me dio calificacion"
    ) {
      console.log("NO TENGO CALIFICACION");
      setTimeout(() => {
        setMessages((old) => [
          ...old,
          {
            from: "computer",
            text: !initial
              ? "Por favor me puedes explicar un poco más? te voy a repetir la pregunta"
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
        <Header name = {props.userInfo?.name}/>
        <Divider />
        <Messages messages={messages} />
        <Divider />
        <Footer
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </Flex>
    </Flex>
  );
};

export default Chat;
