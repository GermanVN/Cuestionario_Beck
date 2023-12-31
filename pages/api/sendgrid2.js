const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  console.log("GERMAN");
  console.log(process.env.SENDGRID_API_KEY);

  try {
    // console.log("REQ.BODY", req.body);
    await sendgrid.send({
      to: `${req.body.email}`, // Your email where you'll receive emails
      from: "414144125@iztacala.unam.mx", // your website email address here
      bcc: "Investigacion.chatIA@gmail.com",
      subject: `${req.body.subject}`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">
      
        <title>The HTML5 Herald</title>
        <meta name="description" content="The HTML5 Herald">
        <meta name="author" content="SitePoint">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      
        <link rel="stylesheet" href="css/styles.css?v=1.0">
      
      </head>
      
      <body>
        <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">              
              </div>
              <div class="container" style="margin-left: 20px;margin-right: 20px;">
              <h3>Informacion Personal </h3>
              <div>Nombre: ${req.body.name} </div>
              <div>Apeido: ${req.body.apeido} </div>
              <div>Email: ${req.body.email} </div>
              <div>Edad: ${req.body.age} </div>
              <div>Diagnostico Mental: ${req.body.mental} </div>
              <div>Enfermedad Cronica: ${req.body.cronica} </div>
              <div>Sexo: ${req.body.gender} </div>
              <div>Nivel de educacion: ${req.body.level} </div>
              <div>Ocupacion: ${req.body.ocupation} </div>
              <p></p>

              <div style="font-size: 13px;">
              <h3>Resultados</h3>
              <div>${req.body.resultado} </div>
              <p></p>

              <div style="font-size: 13px;">
              <h3>Siguientes Pasos</h3>
              <div style="color: red;">
              Favor de contestar los siguientes formularios preferentemente de manera inmediata. 
    
            </div>
            <div>
            Una vez que completes los cuestionarios en el siguiente link. Recibirás los resultados y recomendaciones de tus síntomas de depresión basada en tu interacción con nuestro chat de inteligencia artificial, mismos que serán validados por profesionales de la salud mental antes de ser entregados.
          </div>              
              <ul>
                <li><a href="https://forms.gle/dcaW82dTxiatpFqf7">Inventario de Depresión de Beck-II y Cuestionario de Salud del Paciente-9</a></li>
              </ul>
              <p></p>
              <br>
              </div>
          
              </div>
      </body>
      </html>`,
    });
  } catch (error) {
    console.log("Backend", error);
    console.log("JSON Stringify");
    console.log(JSON.stringify(error));
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;
