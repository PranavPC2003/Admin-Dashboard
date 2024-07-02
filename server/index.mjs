import express from 'express';
import 'dotenv/config';
import expressLayout from 'express-ejs-layouts';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors())

import connectDB from './config/mongoose.mjs';
connectDB();

import Teams from './models/teamss.mjs';
import UsersData from './models/userprofiles.mjs';
import Users from './models/user_auths.mjs';
import Activities from './models/activity.mjs';
import Orders from './models/orders.mjs'

app.use(express.static('public'));

app.use(express.json());
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 8000;

import bcrypt from 'bcrypt';


app.get('/api/users', async (req, res) => {
    try {
        const teams = await Teams.find();

        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const result = teams.slice(startIndex, endIndex)

        //console.log("Teams found:", teams);
        return res.json(result);

    } catch (error) {
        console.error("Error fetching teams:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/profile/aboutMe', async (req, res) => {
    try {
        const users = await UsersData.findOne();

        return res.json(users);
        

    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/signup', (req, res) => {
    let { username, email, password } = req.body;
    email = email.trim();
    password = password.trim();

    Users.find({ email }).then(result => {
        if (result.length) {
            res.json({
                status: "FAILED",
                message: "User already exists"
            })
        }
        else {
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds).then(hashedPassword => {
                const newUser = new Users({
                    username,
                    email,
                    password: hashedPassword,
                })
                newUser.save().then(result => {
                    res.json({
                        status: "SUCCESS",
                        message: "Signup successfully",
                    })
                })
                .catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "An error occured"
                    })
                })
                // console.log('hogya pura');
            })
            .catch(err => {
                res.json({
                    status: "FAILED",
                    message: "An error occured"
                })
            })
        }
    }).catch(err => {
        console.log(err);
        res.json({
            status: "FAILED",
            message: "An error occured"
        })
    })
});

app.post('/signin', (req, res) => {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    Users.find({email})
    .then(data => {
        if (data) {
            const hashedPassword = data[0].password;
            bcrypt.compare(password, hashedPassword).then(result => {
                if (result) {
                    const payload = {
                        username: data[0].username,
                        email: data[0].email,
                        course: data[0].course,
                        image_src: data[0].image_src
                    }
                    const token = jwt.sign(payload, "Sumimasen", { expiresIn: "10000000000000000000" });
                    return res.json({
                        status: "SUCCESS",
                        message: "SignIn Successful",
                        data: token
                    })
                } else {
                    res.json({
                        status: "FAILED",
                        message: "Invalid password entered"
                    })
                }
            })
            .catch(err=> {
                res.json({
                    status: "FAILED",
                    message: "An error occurred"
                })
            })
        } else {
            res.json({
                status: "FAILED",
                message: "Invalid Credentials"
            })
        }
    })
    .catch(err=> {
        res.json({
            status: "FAILED",
            message: "No email found"
        })
    })
});


app.get('/recent_activity', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const per_page = parseInt(req.query.per_page) || 5;
        const skip = (page - 1) * per_page;

        const activity = await Activities.find().skip(skip).limit(per_page);
        const totalItems = await Activities.countDocuments();

        return res.json({
            data: activity,
            totalPages: Math.ceil(totalItems / per_page),
        });

    } catch (error) {
        console.error("Error fetching activities:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/my_orders',async (req, res) =>{
    try {
        const page = parseInt(req.query.page) || 1;
        const per_page = parseInt(req.query.per_page) || 5;
        const skip = (page - 1) * per_page;
        const token = req.headers['userinfo'];
        const decodedToken = JSON.stringify(jwt.verify(token,"Sumimasen"))
        const course = JSON.parse(decodedToken).course;

        const orders = await Orders.find({ course: course}).skip(skip).limit(per_page);
        const totalItems = await Orders.countDocuments({ course: course });

        return res.json({
            data: orders,
            totalPages: Math.ceil(totalItems / per_page),
        });

    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

app.get('/user_orders',async (req, res) =>{
    try {
        const orders = await Orders.find({username: req.query.username});
        const users = await UsersData.find({username: req.query.username});
        
        return res.json({orders,users});

    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})


app.listen(PORT, () => {
    console.log('Running on Port ${PORT}');
});
