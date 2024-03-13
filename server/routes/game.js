let express = require('express');
let router = express.Router();

const { users, rooms, currentGameboardsUsed, activeGames } = require('../lib/serverDatabase');

let activeGamesSchema = {
    animals: {},
    fruits: {},
    random: {}
}


router.post('/finishGame/:roomId', (req, res, next) => {
    let roomId = req.params.roomId;
    let userTemp3 = 13;
    let userTemp4 = 4;

    let game = activeGames[roomId];

    req.app.locals.con.connect(function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Something went wrong" });
        }

        let gameData = {
            boardId: game.boardId,
            userId1: game.userId1,
            userId2: game.userId2,
            userId3: userTemp3, // CHANGE/remove?
            userId4: userTemp4, // CHANGE/remove?
            gridColumns: game.gridColumns,
            description: game.description,
            colors: JSON.stringify(game.colors), 
            grid: JSON.stringify(game.grid) 
        };
        console.log(gameData); // REMOVE

        let sqlInsert = `INSERT INTO finishedGames (boardId, userId1, userId2, userId3, userId4, gridColumns, description, colors, grid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        req.app.locals.con.query(sqlInsert, Object.values(gameData), function (err, result) {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "something went wrong inserting game" });
            }

            let finishedGameId = result.insertId;

            let sqlFindGame = `SELECT * from finishedGames WHERE gameId = ?`;
            req.app.locals.con.query(sqlFindGame, finishedGameId, function (err, result) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Error retreving game" });
                }

                res.json(result);
                console.log(result);
            });
        });
    });
});

// router.get('/finishGame/:roomId', (req, res, next) => {

//     let roomId = req.params.roomId;

//     let userTemp3 = 13;
//     let userTemp4 = 4;
//     console.log(roomId);

//     let game = activeGames[roomId]
//     // let colors = filterQuotes(activeGames[roomId].colors)

//     console.log(game);

//     req.app.locals.con.connect(function (err) {
//         if (err) {
//             console.log(err);
//         }
//         let sqlInsert = `INSERT INTO finishedGames (boardId, userId1, userId2, userId3, userId4, gridColumns, description, colors, grid) VALUES (${game.boardId}, ${game.userId1}, ${game.userId2}, ${userTemp3}, ${userTemp4}, ${game.gridColumns}, "${game.description}", "${game.colors}", "${game.grid}")`

//         // res.send(finishedGame)

//         // let sqlCount = `SELECT COUNT(*) as count FROM gameboards`;

//         req.app.locals.con.query(sqlInsert, function (err, result) {
//             if (err) {
//                 console.log(err);
//             }

//             let finishedGameId = result.insertId

//             let sqlFindGame = `SELECT * from finishedGames WHERE gameId="${finishedGameId}"`

//             req.app.locals.con.query(sqlFindGame, function (err, result) {

//                 res.json(result)

//              }) 
//         });
//     });
// });

router.get('/:roomId', (req, res, next) => {

    let roomId = req.params.roomId;

    console.log(roomId);
    req.app.locals.con.connect(function (err) {
        if (err) {
            console.log(err);
        }

        let sqlCount = `SELECT COUNT(*) as count FROM gameboards`;

        req.app.locals.con.query(sqlCount, function (err, result) {
            if (err) {
                console.log(err);
            }

            const count = result[0].count;
            // console.log(typeof result[0].count);

            // Generera ett slumpmässigt id
            let randomId = Math.floor(Math.random() * count) + 1;

            // Hämta den rad med det slumpmässiga idt från tabellen
            let sqlRandomRow = `SELECT * FROM gameboards WHERE boardId = ${randomId}`;

            req.app.locals.con.query(sqlRandomRow, function (err, result) {
                if (err) {
                    console.log(err);
                }
                      // Converts to normal arrays, use on colors and players
                let colors = result[0].colors.split(',')
                console.log(typeof colors);

        // First conversion of 2 dimensional array into one long array with strings
        let grid1dString = result[0].grid.split(',')
        // Changes the strings in the 2d array into numbers (int)
        let grid1dInt = grid1dString.map(function (str) {
            return parseInt(str);
        })

        // This is the final version of the 2 dimensional array
        let grid = [];
        // This is each row that gets inserted
        let gridColumns = [];

        // Loops over the entire grid array to turn it into a 2d array again
        for (let i = 0; i < grid1dInt.length; i++) {
            
            gridColumns.push(grid1dInt[i])

            // When each row have X amount of entries, it gets pushed to grid and empties so a new row can be created
            if (gridColumns.length >= result[0].gridColumns) {
                grid.push(gridColumns);
                gridColumns = [];
            }
      }

        let currentGameboard = {
            boardId: result[0].boardId,
            gridColumns: result[0].gridColumns,
            name: result[0].name,
            description: result[0].description,
            colors: colors,
            grid: grid
                };
        
        // Add logic here to make game room be the same as the game room the user sends the request from
      
                currentGameboardsUsed[roomId] = currentGameboard

                let gridCols = result[0].gridColumns
                let gridLength = currentGameboard.grid.length
           
                activeGamesSchema[roomId].grid = []
                // let gridColumns2 = []
                // for (let i = 0; i < gridCols; i++) {
                //     gridColumns2.push(5)
                // }
                for (let j = 0; j < gridLength; j++) {
                    let gridColumns2 = []

                    for (let i = 0; i < gridCols; i++) {
                    gridColumns2.push(5)
                    }

                    activeGamesSchema[roomId].grid.push(gridColumns2)
                }
                
                activeGames[roomId].boardId = result[0].boardId
                activeGames[roomId].colors = colors;
                activeGames[roomId].gridColumns = result[0].gridColumns;
                activeGames[roomId].description = result[0].description;
                activeGames[roomId].grid = activeGamesSchema[roomId].grid;

                // resets local variables 
                delete activeGamesSchema[roomId].grid


            res.json(currentGameboard);
            });  
        });
    });
});

// POST request for leter use (SAVE GAME)!

/*
router.post('/', (req, res, next) => {
    req.app.locals.con.connect(function (err) {
        if (err) {
            console.log(err);
        }
        let userName = req.body.userName;
        let firstSql = `SELECT * FROM users WHERE userName="${userName}"`
        // THIS CHECK IF USER ALREADY EXISTS, IF YES, SENDS BACK INFORMATION ABOU TUSER
        req.app.locals.con.query(firstSql, function (err, user) {
            if (err) {
                console.log(err);
            }
            if (user[0]) {
                res.json(user[0])
            } else {
                // IF USER DOESN'T EXIST, CREATES USER AND SENDS BACK CREATED USER INFORMATION
                let secondSql = `INSERT INTO users (userName) VALUES ("${userName}")`;
                req.app.locals.con.query(secondSql, function (err, result) {
                    if (err) {
                        console.log(err);
                    }

                    req.app.locals.con.query(firstSql, function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        res.json(result[0])
                    })
                })
            }
        })
    })
})
*/

module.exports = router;