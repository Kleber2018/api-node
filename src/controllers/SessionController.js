import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;


    const user = await User.findOne({ email: email,  password: password});
    
    if (!user) {
      return res.status(401).json();
    }

    const { id : _id, name, role} = user;
    
    return res.json({
      //1 parametro payload, 2 hash, 3 expiração
      token: jwt.sign({ _id, name, role }, authConfig.secret, {
        expiresIn: authConfig.expiresIn, 
      }),
    })
  }
}

export default new SessionController;
