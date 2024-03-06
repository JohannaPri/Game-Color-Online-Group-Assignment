module.exports = (io, socket, rooms) => { 

    socket.on('leaveRoom', ({username, roomId}) => {

        if (rooms[roomId].includes(username)) { 
            rooms[roomId] = rooms[roomId].filter(user => user !== username); 
            socket.leave(roomId);
            console.log(`${username} has left room ${roomId}`);
            io.emit('updateRooms', rooms);
            io.emit('updateRoom', rooms[roomId]);

        } else {
            console.log(`${username} is not in room ${roomId}`);

        }
        console.log(rooms[roomId]);
    
    });
};