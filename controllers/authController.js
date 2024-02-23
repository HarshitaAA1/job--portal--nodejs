import useModel from "../models/useModel.js"

export const registerController = async (req, res, next) => {


    const { name, email, password } = req.body
    // //validate
    if (!name) {
        next('name is required ')
    }
    if (!email) {
        next('email is required ')
    }

    if (!password) {
        next('password is required and greater than 6 character')

    }

    const existingUser = await useModel.findOne({ email })
    if (existingUser) {
        next('Email Already Register Please Login');

    }

    const user = await useModel.create({ name, email, password })

    //token
    const token = user.createJWT()

    res.status(201).send({

        success: true,
        message: "user created successfully",
        user: {
            name: user.name,
            lastName: user.lastname,
            email: user.email,
            location: user.location
        },
        token

    })





}

export const loginController = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        next('please provide all fields')
    }

    // find user by email
    const user = await useModel.findOne({ email }).select("+password")
    if (!user) {
        next('Invalid username or password')
    }
    //comparePassword

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        next('Invaild username and password')
    }

    user.password = undefined
    const token = user.createJWT()
    res.status(200).json({
        success: true,
        message: "login successfully",
        user,
        token,


    })

};