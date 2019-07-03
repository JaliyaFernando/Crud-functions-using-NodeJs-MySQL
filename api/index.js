const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');
const BodyParser = require('body-parser');
const PORT = 4000;
const bcrypt = require('bcrypt');

app.use(cors());
app.use(BodyParser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'User'
});

mysqlConnection.connect((err) => {
    if(err){
        console.log('DB connection failed \n Error :' + JSON.stringify(err,undefined,2));
    }
    else{
        console.log('DB connection successfully connected')
    }
});

app.listen(PORT,()=> {
    console.log('Express server is running at port no : 4000')
});


//get all users
app.get('/users',(req,res) => {
    mysqlConnection.query('SELECT * FROM User',(err, rows)=> {
        if(err){
            console.log(err)
        }
        else {
            res.send(rows);
        }
    })
});

//get a user by id
app.get('/usersByID/:id',(req,res) => {
    mysqlConnection.query(
        'SELECT * FROM User WHERE UserID = ?',
        [req.params.id],
        (err, rows)=> {
            if(err){
                console.log(err)
            }
            else {
                res.send({user : rows});
            }
        })
});

//get a user by name
app.get('/usersByName/:name',(req,res) => {
    mysqlConnection.query(
        'SELECT * FROM User WHERE Name = ?',
        [req.params.name],
        (err, rows, fields)=> {
            if(err){
                console.log(err)
            }
            else {
                res.send({user : rows});
            }
        })
});

//delete user
app.delete('/users/:id',(req,res) => {
    mysqlConnection.query(
        'DELETE FROM User WHERE UserID = ?',
        [req.params.id],
        (err)=> {
            if(err){
                console.log(err)
            }
            else {
                res.send('Delete Successfully');
            }
        })
});

//insert user
app.post('/adduser',(req,res) => {
    if(req.body.Password !== req.body.confirm_password){
        return res.send( 'Error: Confirm Password is not matching!');
    }
    bcrypt.hash(req.body.Password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        } else {
            let bcryptPassword = hash;

            mysqlConnection.query(
                'INSERT INTO User (Name,Email,Password) VALUES (?,?,?)',
                [req.body.Name,req.body.Email,bcryptPassword],
                (err)=> {
                    if (err) {
                        console.log(err)
                    } else {
                        res.send('Successfully Registered');
                    }
                })
        }
    });
});

//update user
app.put('/updateuser/:id',(req,res) => {
    let verify = '';
    mysqlConnection.query(
        'SELECT Password FROM User WHERE UserID = ?',
        [req.params.id],
        (err, password)=> {
            if (err) {
                console.log(err);
            } else {
                bcrypt.compare(req.body.Password, password, function (err, res) {
                    if (res) {
                        verify = "true";
                    } else {
                        verify = "false";
                    }
                });
            }
        });
/*    if(verify !== "true"){
        return res.send( 'Error: Password is Incorrect!');
    }*/
    if(req.body.Password !== req.body.confirm_password){
        return res.send( 'Error: Confirm Password is not matching!');
    }
    bcrypt.hash(req.body.Password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        } else {
            let bcryptPassword = hash;

            mysqlConnection.query(
                'UPDATE User SET Name = ?,Email = ?,Password = ? WHERE UserID = ? ',
                [req.body.Name,req.body.Email,bcryptPassword,req.params.id],
                (err)=> {
                    if(err){
                        console.log(err)
                    }
                    else {
                        res.send('Successfully Updated');
                    }
                })
        }
    });

});