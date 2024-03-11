
import createElement from "../../lib/createElement.mjs";
import socket from "../../lib/socket.mjs";
import joinRoom from "./joinRoom.mjs";

let gameSection = document.getElementById('gameSection');

export default function renderGameLobbies() {
    gameSection.innerText= ''

    let gameLobbyContainer = createElement('section', 'gameLobbyContainer', 'gameLobbyContainer', '');
    gameSection.appendChild(gameLobbyContainer);

    socket.emit('getRooms');

    socket.on('printRooms', (rooms) => {

        gameLobbyContainer.innerText = '';

        Object.keys(rooms).forEach(room => {
            const roomArticleHeader = createElement('h3', `${room}roomArticleHeader`, 'roomArticleHeader', `${room} - (${rooms[room].length}/4 in lobby)`);
            const roomArticle = createElement('article', `${room}`, 'roomArticle');

            const joinRoomBtn = createElement('button', `${room}`, 'joinRoomBtn', `Join ${room}`);
            const leaveRoomBtn = createElement('button', `leaveRoomBtn${room}`, 'leaveRoomBtn', `Leave ${room}`);

            if (rooms[room].length >= 2) {
                joinRoomBtn.setAttribute('disabled', '')
                joinRoomBtn.innerText = 'Lobby is full'
            }


            roomArticle.append(roomArticleHeader, joinRoomBtn);
            gameLobbyContainer.appendChild(roomArticle);

            joinRoomBtn.addEventListener('click', () => {
                roomArticleHeader.innerText =  `stan - (${room.length}/4 in lobby)`
                joinRoom(room, leaveRoomBtn, roomArticleHeader);
                localStorage.setItem('roomId', room)
                console.log(room);

                if (rooms[room].length >= 2) {
                    joinRoomBtn.setAttribute('disabled', '')
                    joinRoomBtn.innerText = 'Lobby is full'
                }


            });
            leaveRoomBtn.addEventListener('click', () => userLeavesRoom(room));

            
        });
    });

}

function userLeavesRoom(room) {
    console.log(room.length);
    let username = localStorage.getItem('username')
    let roomId = room; 
    localStorage.removeItem('roomId')
    socket.emit('leaveRoom', { username, roomId });
    renderGameLobbies()
}