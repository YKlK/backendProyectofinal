const IOSOCKET= (io)=>{

    io.on("connection",socket=>{
        console.log("alguien se conecto")
    
        io.emit("message","esto lo hago por los momos")
        socket.on('userCoordinates', (coords) => {
            console.log(coords);
            socket.broadcast.emit('newUserCoordinates', coords);
          });
    })

    
}

export default IOSOCKET