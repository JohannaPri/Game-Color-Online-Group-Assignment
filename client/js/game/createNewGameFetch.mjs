import socket from "../../lib/socket.mjs";

export default function createNewGameFetch() {
    let roomId = localStorage.getItem('roomId');
    fetch(`https://game-99blu.ondigitalocean.app/randomGame/${roomId}`, {
        method: 'GET'
    })
        .then((res) => res.json()).then((data) => {
            let roomId = localStorage.getItem('roomId')
            socket.emit('createNewGame', data, roomId)
            socket.emit('gameHasStarted', roomId)
          })
}