const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt');
const logger = require('../logger/loggerConfig');

const UserMongoDb = require('../models/users/UsersMongoDb');

const User = new UserMongoDb();

//passport local strategy
const salt = async() => await bCrypt.genSalt(10);

const encrypt = async(password) => {
    const result = await bCrypt.hash(password,await salt());
   
    return result;
};
const isValidPassword = async(user, password) => {
    const result = await bCrypt.compare(password, user.password);

    return result;
};

passport.use('signup', new LocalStrategy({
    passReqToCallback: true,
},
    async(req, username, password, done) => {
        const userObject = {
            firstName: req.body.firstName,
            email: username,
            password: await encrypt(password),
            direccion: req.body.direccion,
            edad: req.body.edad,
            telefono: req.body.phone,
            foto: req.file.filename
        };

        User.getByEmail(username)
            .then((user) => {
                if (user) {
                    logger.info('User already exists');

                    return done(null, false)
                }

                return User.createUser(userObject)
                    .then((user) => {
                        logger.info(`Registro de usuario exitoso!`);
                        //lo que hace passport es almacenar una propiedad user dentro de nuestro req
                        return done(null, user);
                    })
            })
            .catch((error) => {
                logger.info(`Error registrandose >>> ${error}`);
                return done(error);
            })
    }
));

//este caso es para el de login . Cuando el usuario ya esta registrado y se va a logear
passport.use('signin', new LocalStrategy(async(username, password, done) => {
    try {
        const user =  await User.getByEmail(username)
     
        if(!user) {
            logger.info(`Usuario no encontrado: ${username}`);
            return done(null, false)
        }
        
        if(!await isValidPassword(user,password)) {
            logger.info('Invalid password');
            return done(null, false);
        }

        return done(null, user);  

    } catch (error) {
        return done(error)
    }}
));

//Esto se ejecuta cuando de va a guardar un usuario en una sesion. Se le pasa el id para identificar ala sesion,usuario que se esta creando
//esto usuraio va estar encriptado
passport.serializeUser((user, done) => {
    logger.info('Inside serializer');
    done(null, user._id);
});

//metodo para trernos los datos de ese usuario desemcriptado
passport.deserializeUser((id, done) => {
    logger.info('Inside deserializer');
    User.getById(id)
        .then(user => {
            done(null, user);
        })
});

module.exports = passport;
