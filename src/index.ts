import app from './app';
app.listen(app.get('port'),()=>{
    console.log(`Server listening at port ${app.get('port')}`);
})