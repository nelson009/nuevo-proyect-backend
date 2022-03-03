const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/',(req,res) => {
    res.redirect('/login');
});

router.get('/login',(req,res)=>{
    console.log('SESSION ESTADO',req.session?.nombre)
    if(!req.session?.nombre){

       return res.sendFile( path.resolve(__dirname, '../../public/login.html'));
    }
    res.render("home", { usuario:req.session });
});

router.get('/logout',(req,res) => {
    const { nombre } = req.session;

    if(nombre) {
        req.session.destroy((error) => {
            if (error) {
                return res.status(500).json({error});
            }
            return res.render('logout', { nombre });
        })
    } else {
        res.redirect('/');
    }
});

router.post("/login", (req,res) => {
    req.session.nombre = req.body.nombreLogin;
    req.session.save((err) => {
        if (err) return console.log(err);
        res.redirect('/login');
    })
});

module.exports = router;