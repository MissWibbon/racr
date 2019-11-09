const db = require("../models");
var jwt = require('jsonwebtoken');
const createHash = require('crypto').createHash
//encr password
function hash(str) {
  const hash = createHash('sha256')
  hash.update(str)
  return hash.digest('hex')
}

module.exports = {
    findAll: function(req, res) {
        db.User
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        const hashpw = hash(password.trim());
        password = hashpw;
        db.User
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        let {email, password, firstName ,
            lastName, userName, city, state,
            country, age,  image } = req.body;
        const hashpw = hash(password.trim());
        password = hashpw;
        db.User
            .create({email, password, firstName ,
                lastName, userName, city, state,
                country, age,  image })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        db.User
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.User
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    login: function (req, res) {
        const { email, password } = req.body;
        const hashpw = hash(password.trim());
        console.log(hashpw)
        db.User
          .findOne({ email: email })
          .then(dbModel => {
    
            console.log(dbModel)
            console.log(dbModel.password)
    
            if (hashpw === dbModel.password) {
              let token = jwt.sign(dbModel.email, 'racr');
              res.cookie('token', token).json(dbModel);
    
            } else {
              res.send({ message: 'incorrect name or password' })
            }
          })
          .catch(err => res.status(422).json(err));
      },
};