import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../config/auth';

export default async (req, res, next) => {
  //token é passado junto ao header na variavel authorization
  const authHeader = req.headers['Authorization'] || req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json()
  };

  try {

    //decodifica o token usando a chave secreta "authConfig.secret"
    //extraindo o que tinha sido passado no payload do token, nesse caso o "id"
    //e o name
    const decoded = await promisify(jwt.verify)(authHeader, authConfig.secret);

    //retorna o id do usuario na req, facilitando na hora de editar por exemplo
    //ja que não será preciso informar o id posteriormente
    req.userId = decoded._id;
    req.userName = decoded.name;
    req.role = decoded.role;
    
    return next();

  } catch (error) {
    return res.status(401).json();
  }
};