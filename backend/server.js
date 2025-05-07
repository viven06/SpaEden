require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const {sequelize}=require('./db');
const port = 8000;
const path= require('path');



app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const usersRouter=require('./routes/users');
const searchRouter=require('./routes/search_game');
const gamesRouter=require('./routes/gameInfo');
const listRouter=require('./routes/lists');

sequelize.sync()
    .then(()=>{
        console.log('Conexion a la BD y sincronizacion Completada');
    })
    .catch(err =>{
        console.error('Error al sincronizar la BD',err);
    });

app.use('/users',usersRouter);
app.use('/api',searchRouter);
app.use('/games',gamesRouter);
app.use('/lists',listRouter);

app.get('/pdf',(req,res)=>{
    const pdfPath=path.join(__dirname, 'public', 'MyGameLog.pdf');
    res.sendFile(pdfPath);
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});