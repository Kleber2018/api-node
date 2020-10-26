import User from '../models/User';

import generator from 'generate-password';

import nodemailer from 'nodemailer';

class PasswordController {
  async store(req, res) {

    const email = req.query.email;

    const userExists = await User.findOne({email: email});

    if (userExists){

      const filter = { email: email};

      var newPass = generator.generate({
        length: 6,
        numbers: true
      });

      const update = { password: newPass}

      let doc = await User.findOneAndUpdate(filter, update, {
        new: true,
        useFindAndModify: false
      });

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'd.e.v.email.use@gmail.com',
          pass: 'dev12345678email'
        }
      });
  
      var mailOptions = {
        from: 'd.e.v.email.use@gmail.com',
        to: email,
        subject: 'Recuperação de senha',
        text: `Sua nova senha é: ${newPass}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado');
        }
      });
    }
   
    return res.status(200).json();
  }
}

export default new PasswordController;