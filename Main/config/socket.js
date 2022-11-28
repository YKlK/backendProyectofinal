const IOSOCKET= (io)=>{

    io.on("connection",socket=>{
        console.log("alguien se conecto")
        // socket.on("joinRoom",stream=>{
        //     socket.join(stream)           
        // })
        
        socket.on('userCoordinates', (coords,room) => {
            try{
            if(!room){
            console.log(coords);
            socket.broadcast.emit('newUserCoordinates', coords);
            }
            else{
                socket.join(room)
                console.log(coords,room);
            socket.broadcast.emit('newUserCoordinates', coords);
            } }
            catch(err){
                console.log(err)
            }
        });
    })

    io.on("disconnect", socket=>{
        console.log("alguien se desconecto")
    })
    
}

export default IOSOCKET