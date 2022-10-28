const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../models');

const userController = {
    userRegister: async (req, res) => {
        const errors = validationResult(req);
       
        db.users.findOne({
            where:{
                email:req.body.email,
            },
        }).then(data=>{
            if(data){
                res.status(409).json({ msg: 'User already exists' });
            }else{
                const {
                    nombre, apellido, email, imagen, rol, password
                  } = req.body;
              
                  try {
                    db.users.create({
                      nombre, apellido, email, imagen, rol, password:bcrypt.hashSync(password,10)
                    }).then(async (user)=>{
                        res.status(200).json({
                            msg: 'usuario created successfully!',
                            user,
                        })
                    }).catch((err) => res.status(500).json({
                        msg: `Please contact the administrator, Error: ${err.message}`,
                    }));
              
                    
                  } catch (error) {
                    return res.status(400).json(
                      error.errors.map((err) => `msg: ${err.message}`)[0],
                    );
                  }
              
            }
        })
        
        },
    userList: (req, res) => {
        db.users.findAll()
            .then((result) => {
                const response = {
                    status: 200,
                    message: 'OK',
                    data: result,
                };
                res.json(response);
            })
            .catch((error) => {
                res.json(error);
            });
    },
    userEdit: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors:errors.array(),
            })
        }
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
            });
        } else {
            const {
                nombre, apellido, email, imagen, rol, password
            } = req.body;

            const user = db.users.findByPk(req.params.id);
            if (user !== '') {
                db.users.update(
                    {
                        nombre, 
                        apellido, 
                        email, 
                        imagen, 
                        rol, 
                        password:bcrypt.hashSync(password,10)
                    },
                    {
                        where: {
                            id: req.params.id,
                        },
                    },
                )
                    .then(() => {
                        const response = {
                            status: 200,
                            message: 'User updated successfully!',
                        };
                        res.json(response);
                    })
                    .catch((error) => {
                        res.json(error);
                    });
            } else {
                const response = {
                    status: 404,
                    message: 'User not found!',
                };
                res.json(response);
            }
        }
    },

    userDelete: async (req, res) => {
        const userId = Number(req.params.id);
        try {
            const user = await db.users.findOne({
                where: {
                    id: userId,
                },
            });

            if (user) {
                console.log('userToDel', user);
                await user.destroy();

                res.json({
                    msg: `The user with id: ${userId} has deleted`,
                });
            } else {
                res.status(404).json({
                    msg: `No users with id: ${userId}, were found !`,
                });
            }
        } catch (error) {
            return res.status(500).json({
                msg: 'Pelase contact the administrator',
            });
        }
    },
    // End User CRUD
    login: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        try {
            const user = await db.usersfindOne({
                where: {
                    email: req.body.email,
                },
            });
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    console.log('User Authenticated');
                    const token = await createToken(user.id);
                    res.status(200).json({
                        user,
                        token,
                    });
                } else {
                    res.status(401).json({
                        msg: 'The password is incorrect',
                    });
                }
            } else {
                res.status(404).json({
                    msg: 'User not found',
                });
            }
        } catch (error) {
            res.status(500).json({
                msg: 'Please contact the administrator',
            });
        }
    },
    getData: async (req, res) => {
        const { id } = req.user;
        try {
            if (id) {
                const user = await db.usersfindOne({
                    where: {
                        id,
                    },
                });

                const {
                    firstName, lastName, email, image, roleId,
                } = user;

                if (user) {
                    res.status(200).json({
                        msg: {
                            firstName,
                            lastName,
                            email,
                            image,
                            roleId,
                        },
                    });
                } else {
                    res.status(404).json({
                        msg: 'User and credentials does not match',
                    });
                }
            }
        } catch (error) {
            return res.status(500).json({
                
                msg: 'Please contact the administrator',
            });
        }
    },

    userInfo: (req, res) => {
        res.status(200).send(`Logged in with ${req.user.email} account. App Token : ${req.user.token}`);
    },
};

module.exports = userController;
