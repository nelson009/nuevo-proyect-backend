const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt');

const UserMongoDb = require('../models/users/UsersMongoDb');

const User = new UserMongoDb();

//passport local strategy

const salt = () => bCrypt.genSaltSync(10);
const encrypt = (password) => bCrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bCrypt.compareSync(password, user.password);

passport.use('signup', new LocalStrategy({
    passReqToCallback: true,
},
(req, username, password, done) => {
    const userObject = {
        firstName: req.body.firstName,
        email: username,
        password: encrypt(password),
    };

    User.getByEmail(username)
        .then((user)=> {
            if (user) {
            console.log('User already exists');

            return done(null, false)
            }

            return User.createUser(userObject)
            .then((user) => {
                console.log('Registro de usuario exitoso!');
            //lo que hace passport es almacenar una propiedad user dentro de nuestro req
                return done(null, user);
            })
        })
        .catch((error)=> {
            console.log('Error registrandose >>>', error);
            return done(error);
        })   
}
));

//este caso es para el de login . Cuando el usuario ya esta registrado y se va a logear
passport.use('signin', new LocalStrategy((username, password, done) => {
    User.getByEmail(username)
        .then((user) => {

            if(!user) {
                console.log('Usuario no encontrado:',username);
                return done(null,false)
            };

            if (!isValidPassword(user, password)) {
                console.log('Invalid password');
                return done(null, false);
            };

            return done(null, user);
        })
        .catch((error) => {
            return done(error);
        })
}));

//Esto se ejecuta cuando de va a guardar un usuario en una sesion. Se le pasa el id para identificar ala sesion,usuario que se esta creando
//esto usuraio va estar encriptado
passport.serializeUser((user,done) => {
    console.log('Inside serializer');
    done(null, user._id);
});

//metodo para trernos los datos de ese usuario desemcriptado
passport.deserializeUser((id, done) => {
    console.log('Inside deserializer');
    User.getById(id)
        .then(user => {
            done(null, user);
        })
});

module.exports = passport;
