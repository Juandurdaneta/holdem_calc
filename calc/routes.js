const express = require('express');
const router = express.Router();
const odds_calc = require('poker-odds-calc')


router.post('/', (req,res)=>{
    

try{
    const players = req.body.players;
    const board = req.body.board;

    if(!players){
        res.send({
            status: 403,
            message: 'No players were added, check your input and try again.'
        })
    } else{

        const Table = new odds_calc.TexasHoldem();

        players.forEach(player => {
            let cards = player.split(/(..)/g).filter(s => s);
            console.log(cards)
            Table.addPlayer(cards)
        });

        // In case the user doesn't add a board to the body of the request

        if(board){ 
            const table_cards = board.split(/(..)/g).filter(s => s);
            Table.setBoard(table_cards)
        }


        const Result = Table.calculate();

        const results = []
        Result.getPlayers().forEach(player => {
            results.push(`${player.getName()} - ${player.getHand()} - Wins: ${player.getWinsPercentageString()} - Ties: ${player.getTiesPercentageString()}`);
        });
        

        res.send({
            status: 200,
            results: results
        });

    }
    

} catch(err){
    console.log(err)
    res.send({
        status: 403,
        message: 'Something went wrong, check your input and try again...',
        error_log: `${err.stack}`
    })
}



})

module.exports = router;