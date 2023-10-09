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
              Se le está invitando a participar de manera voluntaria en una
              evaluación psicológica para la detección de la depresión por medio
              de herramientas electrónicas, elaboradas por la estudiante en
              psicología Alma Elena Mejia Torres (contacto
              414144125@iztacala.unam.mx), supervisada por el Mtro. Alan Ernesto
              Barba Sánchez, profesor de la FES Iztacala UNAM en su función como
              Director de Tesis para obtener el grado de Psicóloga. Contacto:
              alan.barba@iztacala.unam.mx Procedimiento: El presente chat tiene
              como objetivo la evaluación de la depresión por medio del
              instrumento: Inventario de Depresión de Beck-II. El procedimiento
              consiste en llevar a cabo una evaluación psicológica por medio de
              preguntas guiadas por este chat, lo cual implica recabar datos
              sociodemográficos además de contestar las preguntas que el chat le
              arrojará. Al finalizar se le darán los resultados de su evaluación
              y se harán recomendaciones de acuerdo a sus resultados. El tiempo
              estimado será de 15 min aproximadamente. Criterios de inclusión:
              Persona mayor de 13 años de edad Posibles riesgos y molestias: No
              existe riesgo alguno para usted Privacidad y confidencialidad:
              Toda la información que usted nos proporcione será almacenada y
              tratada con carácter confidencial, con uso académico y el de su
              bienestar psicológico. Si bien las respuestas dadas implican
              riesgos a la confidencialidad, los asesores se comprometen a
              prevenir riesgos cibernéticos para el almacenamiento y manejo de
              la información que nos proporcione. Retiro: Su participación
              dentro de la evaluación psicológica es voluntaria y puede
              abandonar el proceso en cualquier momento bajo previo aviso. Le
              suplicamos comunicarse con su asesor, y confirmar su participación
              en el resto de los cuestionarios que se le proporcionarán al
              finalizar esta evaluación, utilizando el mismo nombre y correo
              electrónico. Costos: Este proceso no tendrá ningún costo para
              usted, y tampoco se le proporcionará remuneración económica.
              <br></br>
              <br></br>
              Al dar click en esta casilla acepta que ha leído el presente
              documento de consentimiento informado, ha comprendido las
              explicaciones en él facilitadas sobre el propósito de la
              evaluación psicológica. También se me ha informado sobre el
              procedimiento, así como la manera en que se le trataran los datos.
              Comprende que, en cualquier momento y sin necesidad de dar ninguna
              explicación, puede revocar el consentimiento que ahora presenta.
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
