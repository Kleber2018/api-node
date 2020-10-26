import User from '../models/User';

class UserController {
  async store(req, res) {

    //checa se ja existe o email cadastrado
    const userExists = await User.findOne({email: req.body.email});

    const emailExists = req.body.email;

    if (!emailExists) {
      return res.status(400).json({ error: "Campos obrigatórios não preenchidos"});
    }

    if (userExists) {
      return res.status(409).json();
    }

    const userModel = new User(req.body).validateSync();

    if (userModel) {
      return res.status(400).json({ error: "Campos obrigatórios não preenchidos"});
    }

    const { id, nome, email, privilegios } = await User.create(req.body);

    //controle para sucesso faltou try catch

    return res.status(201).json();
  }

  async show(req, res) {
    const user = await User.findOne({_id:req.userId}, {password:0, __v:0});
    // const user = await User.findById(req.userId);

    //caso esteja logado com o token de um user excluído
    if (!user) {
      return res.status(401).json();
    } 

    // delete user(password);

    return res.json(user);
  }

  async update(req, res) {
    const { email } = req.body;

    const userModel = new User(req.body).validateSync();

    delete req.body.email;

    if (userModel) {
      return res.status(400).json({ error: "Campos obrigatórios não preenchidos"})
    }

    const user = await User.findById(req.userId);

    //caso esteja logado com o token de um user excluído
    if (!user) {
      return res.status(401).json();
    }

    // if (email !== user.email) {
    //   return res.status(401).json();
    // }

    try {
      await user.updateOne(req.body);
    } catch (error) {
      res.status(500).send(err)
    }

    return res.status(200).json();
  };

  async delete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.userId);
  
      if (!user) res.status(404).send("No item found")
        res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  }
};

export default new UserController;
