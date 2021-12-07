let express = require("express");
let socket = require("socket.io") ;

let app = express() ; // initalizig server

app.use(express.static("public"));
let port = 5000 ;

let server = app.listen(port ,() => {

    console.log("listening to server" + port);

})

let io = socket(server) ;

io.on("connection" , () => {
    console.log("made socket connection");
})