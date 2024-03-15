# fed23-gridSock-9-spel
Repo för grupparbete i FED23, API Kurs. Grupp: gridSock 9

#### Deltagare i projektet: 

Simon Stenström
- Github: [@bucky-13](https://github.com/bucky-13)

Anna Karlsen
- Github: [@annkar73](https://github.com/annkar73)  

Johanna Prinz
- Github: [@JohannaPri](https://github.com/JohannaPri)  

Mustafa Mehdi
- Github: [@MustafaaMehdi](https://github.com/MustafaaMehdi)  

## Beskrivning av projektet:

Projektet vi har valt att bygga är ett multiplayer spel med chatt.  
Spelet går ut på att färglägga pixelerade bilder där varje användare automatiskt tilldelas en av de fyra färger som ingår i den aktuella bilden. Bilden/spelplanen slumpas från en databas, där det finns 5 olika bilder/spelplaner som kan genereras till sidan.  

## Hur man startar repot:
En gång när man laddar ner repot lokalt: gå in på cd server och kör npm install, gör samma på client 

Lägg in en .env i server mappen som innehåller:  
Ang nycklar till .env får ni fråga om dom till oss.

Starta servern genom att köra ‘nodemon start’ (eller 'nodemon run’) i terminalen i servermappen. 

Starta klienten genom att köra ‘npm run dev’ i terminalen i clientmappen. 

Vill man köra server lokalt får man ändra alla https://game-99blu.ondigitalocean.app till http://localhost:3001 i client eller vilken port man vill använda. Man får söka efter var ondigitalocean-länken finns 

Vill man köra egen databas (bör vara en SQL) så ändra bara värdena i .env till ens egna databas. Man kommer dock få lägga in egna spelplaner då. 

## Tech Stack:
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node JS](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Socket.Io](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Express JS](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![MYSQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Digital Ocean](https://img.shields.io/badge/Digital_Ocean-0080FF?style=for-the-badge&logo=DigitalOcean&logoColor=white)

## Screenshots:

##### LogIn page
<img width=350px src="documentation/login.jpg">

##### Header
<img width=350px src="documentation/nav.jpg">

##### Main Lobby
<img width=350px src="documentation/lobby.jpg">

##### GameRoom Lobby
<img width=350px src="documentation/animalslobby.jpg">

##### GameRoom Chat
<img width=350px src="documentation/chat.jpg">

##### Start Game Button
<img width=350px src="documentation/startgame.jpg">

##### Leave Room Button
<img width=350px src="documentation/leaveroom.jpg">

##### Game in Progress
<img width=350px src="documentation/duringgame.jpg">

##### Score
<img width=350px src="documentation/points.jpg">

##### Played Games
<img width=350px src="documentation/playedgames.jpg">