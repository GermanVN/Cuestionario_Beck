import React, { useEffect, useState } from "react";

import Card from "./UI/Card/Card";
import classes from "./Login.module.css";
import Button from "./UI/Button/Button";

let isEmailValid = false;
let isNameValid = false;
let isApeidoValid = false;
let isMentalValid = false;
let isCronicaValid = false;
let isAgeValid = false;
let isCheckValid = false;

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredApeido, setEnteredApeido] = useState("");
  const [enteredMental, setEnteredMental] = useState("");
  const [enteredCronica, setEnteredCronica] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(false);
  const [apeidoIsValid, setApeidoIsValid] = useState(false);
  const [ageIsValid, setAgeIsValid] = useState(false);
  const [mentalIsValid, setMentalIsValid] = useState(false);
  const [cronicaIsValid, setCronicaIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [selectedGender, setSelectedGender] = useState("hombre");
  const [selectedNivel, setSelectedNivel] = useState("primaria");
  const [selectedOcupacion, setSelectedOcupacion] = useState("estudiante");
  const [isCheckedValid, setIsCheckedValid] = useState(false);

  const handleSelectGender = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleSelectNivel = (event) => {
    setSelectedNivel(event.target.value);
  };

  const handleSelectOcupacion = (event) => {
    setSelectedOcupacion(event.target.value);
  };

  const emailChangeHandler = (event) => {
    isEmailValid = enteredEmail.includes("@");
    setEnteredEmail(event.target.value);
  };

  const ageChangeHandler = (event) => {
    isAgeValid =
      parseInt(enteredAge.trim()) > 13 && parseInt(enteredAge.trim()) < 80;
    setEnteredAge(event.target.value);
  };

  const nameChangeHandler = (event) => {
    isNameValid = enteredName.trim().length > 2;
    setEnteredName(event.target.value);
  };

  const apeidoChangeHandler = (event) => {
    isApeidoValid = enteredApeido.trim().length > 4;
    setEnteredApeido(event.target.value);
  };

  const mentalChangeHandler = (event) => {
    isMentalValid = enteredMental.trim().length > 3;
    setEnteredMental(event.target.value);
  };

  const cronicaChangeHandler = (event) => {
    isCronicaValid = enteredCronica.trim().length > 3;
    setEnteredCronica(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    isCheckValid = event.target.checked;

    setIsChecked(event.target.checked);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
    isEmailValid = true;
  };

  const validateNamedHandler = () => {
    setNameIsValid(enteredName.trim().length > 3);
    isNameValid = true;
  };

  const validateApeidodHandler = () => {
    setApeidoIsValid(enteredApeido.trim().length > 4);
    isApeidoValid = true;
  };

  const validateMentalHandler = () => {
    setMentalIsValid(enteredMental.trim().length > 3);
    isMentalValid = true;
  };

  const validateCronicaHandler = () => {
    setCronicaIsValid(enteredCronica.trim().length > 3);
    isCronicaValid = true;
  };

  const validateAgeHandler = () => {
    setAgeIsValid(
      parseInt(enteredAge.trim()) > 13 && parseInt(enteredAge.trim()) < 90
    );
    isAgeValid = true;
  };

  const validateChecker = () => {
    setIsCheckedValid(isChecked);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onValueChange(true);
    props.getLoginInformation({
      email: enteredEmail,
      name: enteredName,
      apeido: enteredApeido,
      edad: enteredAge,
      mental: enteredMental,
      cronica: enteredCronica,
      sexo: selectedGender,
      educacion: selectedNivel,
      ocupacion: selectedOcupacion,
      nivel: selectedNivel,
    });

    console.log("values");
    console.log(enteredEmail);
    console.log(enteredName);
    console.log(enteredAge);
    console.log(selectedGender);
  };

  return (
    <div
      style={{
        paddingTop: "0px",
      }}
    >
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <div
            className={`${classes.control} ${
              emailIsValid === false ? classes.invalid : ""
            }`}
          >
            <label
              style={{
                fontSize: "14px",
              }}
              htmlFor="email"
            >
              E-Mail
            </label>
            <input
              style={{
                fontSize: "14px",
              }}
              type="email"
              id="email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
          </div>
          <div
            className={`${classes.control} ${
              nameIsValid === false ? classes.invalid : ""
            }`}
          >
            <label
              style={{
                fontSize: "14px",
              }}
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              type="name"
              style={{
                fontSize: "14px",
              }}
              id="name"
              value={enteredName}
              onChange={nameChangeHandler}
              onBlur={validateNamedHandler}
            />
          </div>
          <div
            className={`${classes.control} ${
              apeidoIsValid === false ? classes.invalid : ""
            }`}
          >
            <label
              style={{
                fontSize: "14px",
              }}
              htmlFor="apeido"
            >
              Apellido
            </label>
            <input
              style={{
                fontSize: "14px",
              }}
              type="apeido"
              id="apeido"
              value={enteredApeido}
              onChange={apeidoChangeHandler}
              onBlur={validateApeidodHandler}
            />
          </div>
          <div
            className={`${classes.control} ${
              ageIsValid === false ? classes.invalid : ""
            }`}
          >
            <label
              style={{
                fontSize: "14px",
              }}
              htmlFor="name"
            >
              Edad
            </label>
            <input
              type="name"
              style={{
                fontSize: "14px",
              }}
              id="edad"
              value={enteredAge}
              onChange={ageChangeHandler}
              onBlur={validateAgeHandler}
            />
          </div>
          <div
            className={`${classes.control} ${
              mentalIsValid === false ? classes.invalid : ""
            }`}
          >
            <label
              style={{
                fontSize: "14px",
              }}
              htmlFor="mental"
            >
              ¿Tiene algún diagnóstico mental o neurológico? Favor de
              especificar
            </label>
            <input
              type="mental"
              style={{
                fontSize: "14px",
              }}
              id="mental"
              value={enteredMental}
              onChange={mentalChangeHandler}
              onBlur={validateMentalHandler}
              width={"100%"}
            />
          </div>
          <div
            className={`${classes.control} ${
              cronicaIsValid === false ? classes.invalid : ""
            }`}
          >
            <label
              style={{
                fontSize: "14px",
              }}
              htmlFor="cronica"
            >
              ¿Tiene alguna enfermedad crónica? Favor de especificar
            </label>
            <input
              style={{
                fontSize: "14px",
              }}
              type="cronica"
              id="cronica"
              value={enteredCronica}
              onChange={cronicaChangeHandler}
              onBlur={validateCronicaHandler}
            />
          </div>
          <div
            className={`${classes.controls} ${
              passwordIsValid === false ? classes.invalid : ""
            }`}
          >
            <label
              style={{
                fontSize: "14px",
              }}
              htmlFor="cars"
            >
              Sexo:
            </label>
            <select
              style={{
                fontSize: "14px",
              }}
              name="gender"
              id="gender"
              value={selectedGender}
              onChange={handleSelectGender}
            >
              <option
                style={{
                  fontSize: "14px",
                }}
                value="hombre"
              >
                Masculino
              </option>
              <option
                style={{
                  fontSize: "14px",
                }}
                value="mujer"
              >
                Femenino
              </option>
            </select>
          </div>
          <div
            className={`${classes.controls} ${
              passwordIsValid === false ? classes.invalid : ""
            }`}
          >
            <label
              style={{
                fontSize: "14px",
              }}
              htmlFor="cars"
            >
              Nivel de educación:
            </label>
            <select
              style={{
                fontSize: "14px",
              }}
              name="nivel"
              id="nivel"
              value={selectedNivel}
              onChange={handleSelectNivel}
            >
              <option value="primaria">Primaria</option>
              <option value="secundaria">Secundaria</option>
              <option value="bachillerato">Bachillerato</option>
              <option value="universidad">Universidad</option>
              <option value="posgrado">Posgrado</option>
            </select>
          </div>
          <div
            className={`${classes.controls} ${
              passwordIsValid === false ? classes.invalid : ""
            }`}
          >
            <label
              style={{
                fontSize: "14px",
              }}
              htmlFor="cars"
            >
              Ocupación:
            </label>
            <select
              style={{
                fontSize: "14px",
              }}
              name="ocupacion"
              id="ocupacion"
              value={selectedOcupacion}
              onChange={handleSelectOcupacion}
            >
              <option value="empleado">Empleado</option>
              <option value="amadecasa">Ama de casa</option>
              <option value="estudiante">Estudiante</option>
              <option value="autonomo">Trabajador autónomo</option>
              <option value="empresario">Empresario</option>
              <option value="jubilado">Jubilado</option>
              <option value="desempleado">Desempleado</option>
              <option value="freelancer">Freelancer</option>
            </select>
          </div>

          <div className={classes.actions}>
            {console.log(
              isEmailValid && isNameValid && isAgeValid && isCheckValid
            )}
            <div   style={{
              fontSize: "14px"
            }} className={classes.scroll}>
              Se le está invitando a participar de manera voluntaria en una evaluación psicológica para la detección de la depresión por medio de herramientas digitalizadas, elaboradas por la estudiante en psicología Alma Elena Mejia Torres (contacto 414144125@iztacala.unam.mx), supervisada por el Mtro. Alan Ernesto Barba Sánchez (Contacto: alan.barba@iztacala.unam.mx), profesor de la FES Iztacala UNAM.
              <br></br>
              <br></br>
              Procedimiento: El presente chat tiene como objetivo la recopilación de respuestas de una versión del instrumento "Inventario de Depresión de Beck-II" basado en Inteligencia Artifical para evaluar las propiedades psicométricas de dicho instrumento.
              <br></br>
              <br></br>
              El procedimiento consiste en llevar a cabo una recopilación de un autoinforme de respuestas relacionadas con síntomas que suelen presentarse en personas con depresión, por medio de preguntas guiadas en este chat. Esto implica recabar datos sociodemográficos además de contestar las preguntas que el chat le arrojará y posteriormente contestar otros dos cuestionarios dentro de un formulario que le serán enviados automáticamente a su correo electrónico proporcionado al finalizar este chat, y los deberá de contestar preferentemente de manera inmediata.
              <br></br>
              <br></br>
              Al finalizar automáticamente le arrojará retroalimentación con recomendaciones, mismos que serán enviados a su correo electrónico proporcionado. Una vez que se obtengan los resultados del formulario se le enviarán los resultados obtenidos y algunas recomendaciones de acuerdo a sus respuestas.
              <br></br>
              <br></br>
              El tiempo estimado para este chat será de 20 min aproximadamente. Y el tiempo para contestar los formularios será de otros 15 minutos.
              <br></br>
              <br></br>
              Criterios de inclusión: Personas de 18 años en adelante y menores de 65 años.
              <br></br>
              <br></br>
              Posibles riesgos y molestias: No existe riesgo alguno para usted
              <br></br>
              <br></br>
              Privacidad y confidencialidad: Toda la información que usted nos proporcione será almacenada y tratada con carácter confidencial. Los datos recopilados se utilizarán únicamente con el propósito de investigación en propiedades psicométricas del Inventario de Depresión de Beck-II. En todos los casos los datos que nos proporciones, se mantendrán de manera anónima para proteger la privacidad de los participantes.
              <br></br>
              <br></br>
              Todos los datos proporcionados se mantendrán en un entorno seguro y se protegerán con medidas de seguridad adecuadas para prevenir el acceso no autorizado.
              <br></br>
              <br></br>
              Retiro: Su participación dentro de la evaluación psicológica es voluntaria y puede abandonar el proceso en cualquier momento bajo previo aviso sin ninguna repercusión.
              <br></br>
              <br></br>
              En caso de dudas ponerse en contacto por los medios proporcionados aquí. (crear nuevo)
              <br></br>
              <br></br>
              Costos: Este proceso no tendrá ningún costo para usted, y tampoco se le proporcionará remuneración económica.
              <br></br>
              <br></br>
              Al dar click en esta casilla acepta que ha leído el presente consentimiento informado, ha comprendido las explicaciones en él facilitadas sobre el propósito de la investigación. También se le ha informado sobre el procedimiento, así como la manera en que se trataran sus resultados y datos personales. Comprende que, en cualquier momento y sin necesidad de dar ninguna explicación, puede revocar el consentimiento que ahora presenta.
            </div>
            <div
              style={{
                paddingTop: "10px",
              }}
            >
              <label style={{ border: isCheckValid ? "" : "1px solid red" }}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  onBlur={validateChecker}
                />
                Acepto las condiciones
              </label>
            </div>

            <br></br>

            <Button
              type="submit"
              className={classes.btn}
              disabled={
                !(
                  isEmailValid &&
                  isNameValid &&
                  isAgeValid &&
                  isCheckValid &&
                  isMentalValid &&
                  isCronicaValid &&
                  isApeidoValid
                )
              }
            >
              Comenzar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
