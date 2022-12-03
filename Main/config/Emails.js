import nodemailer from "nodemailer"



 const transporter = async(Nombre,Email,Asunto,Mensaje)=>{
  try{
    const testAccount = await nodemailer.createTestAccount();
    const trans = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.AdminGmail, // generated ethereal user
      pass: process.env.contrasena, // generated ethereal password
    },
  });



  const mailoptions = {
    from: process.env.AdminGmail, // sender address
    to: process.env.AdminGmail, // list of receivers
    subject: Asunto, // Subject line
    text: `
    ${Mensaje}
    Mensaje provisto por: ${Nombre}
    From: ${Email}     `, // plain text body
     // html body
  }

const send = await trans.sendMail(mailoptions,function(error, info){
if (error) {
  console.log(error);
} else {
  console.log('Email sent: ' + info.response);
}
});
  }
  catch(err){
    console.log(err)
  }
}
    export default transporter