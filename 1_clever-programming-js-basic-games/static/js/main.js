function ageInDays(){
    var birthYear = prompt('What is the year you born');
    var ageInDays = (2020-birthYear)*360;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('Your age in days is '+ ageInDays+ ' days');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}

function generator_cat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "http://thecatapi.com/api/images/get?formate=src&type=gif&size=small";
    div.appendChild(image);

}


function rpsGame(yourChoice){
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    results = decideWinner(humanChoice,botChoice);
    message = finalMessage(results);//{'message':'message','color':'color'}
    rpsFrontEnd(yourChoice.id, botChoice, message)
}

function randToRpsInt(){
    return Math.floor(Math.random()*3)
}

function numberToChoice(number){
    return ['rock','paper','scissors'][number]
}

function decideWinner(yourChoice, botChoice){
    var rpsDatabase = {
        'rock' : {'scissors': 1, 'rock':0.5, 'paper':0},
        'paper' : {'rock': 1, 'paper':0.5, 'scissors':0},
        'scissors' : {'paper': 1, 'scissors':0.5, 'rock':0},
    };

    var yourScore = rpsDatabase[yourChoice][botChoice]
    var computerScore = rpsDatabase[botChoice][yourChoice]

    return [yourScore, computerScore];
    
}

function finalMessage([yourScore, computerScore]){
    if (yourScore === 0){
        return {'message': 'Your lose', 'color': 'red'}
    }else if (yourScore === 0.5){
        return {'message': 'Tied', 'color' : 'yellow'}
    }else{ 
        return {'message': 'Your Win', 'color' : 'green'}
        
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase = {
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src,
    }
    //removing all the images
    document.getElementById('rock').remove()
    document.getElementById('paper').remove()
    document.getElementById('scissors').remove()

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(0,0,255, 0.7)'>"
    messageDiv.innerHTML = "<h1 style='color:" + finalMessage['color'] +"; font-size: 60px; padding:30px; '>" + finalMessage['message'] + "</p>";
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(144,238,144 ,1 )'>"
    
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}
//youtu.be/Qqx_wzMmFeA?t=14364


// challange 4: change all the color sof the buttons
var all_button = document.getElementsByTagName('button');

var copyAllButtons = [];
for (let i=0; i< all_button.length; i++){
    copyAllButtons.push(all_button[i].classList[1])
}
function buttonColorChange(buttonThingy){
    if (buttonThingy.value === 'red'){
        buttonRed();
    }else if (buttonThingy.value === 'green'){
        buttonGreen();
    }else if (buttonThingy.value === 'reset'){
        buttonColorReset();
    }else if (buttonThingy.value == 'random'){
        randomColor();
    }
}

function buttonRed(){
    for (let i=0; i<all_button.length; i++){
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add('btn-danger');
    }
}

function buttonGreen(){
    for (let i=0; i<all_button.length; i++){
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add('btn-success');
    }
}

function buttonColorReset(){
    for (let i=0; i<all_button.length; i++){
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add(copyAllButtons[i]);
    }
}

function randomColor(){
    var choices =['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']
    for (let i=0; i<all_button.length; i++){
        var randomNumber = Math.floor(Math.random() * 4);
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add(choices[randomNumber]);
    }
}

// challage 5: Black Jack
let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score':0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score':0},
    'cards': ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardMap': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':[1,11]},
    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
    'isStand':false,
    'turnOver':false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']
const hitSound = new Audio('static/sounds/swish.m4a')
const winSound = new Audio('static/sounds/cash.mp3')
const lossSound = new Audio('static/sounds/aaw.mp3')

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit(){
    if (blackjackGame['isStand'] === false){
        let card = randomCard()
        showCard(card, YOU);
        updateScore(card, YOU)
        showScore(YOU);
    }
    
}

function randomCard(){
    let rendomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][rendomIndex]
}

function updateScore(card, activePlayer){
    if (card === 'A'){
        if (activePlayer['score'] + blackjackGame['cardMap'][card][1] <= 21){
            activePlayer['score']+= blackjackGame['cardMap'][card][0];
        }else{
            activePlayer['score']+= blackjackGame['cardMap'][card][1]
        }
    }else{
        activePlayer['score'] += blackjackGame['cardMap'][card];
    }
}

function showScore(activePlayer){
    if (activePlayer['score'] <= 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST!!";
        document.querySelector(activePlayer['scoreSpan']).style.color = "red";
    }
}


function showCard(card, activePlayer){
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal(){
    if (blackjackGame['turnOver'] === true){
        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        for(let i=0; i<yourImages.length; i++){
            yourImages[i].remove();
        }
        

        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        for(let i=0; i<dealerImages.length; i++){
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = '0';
        document.querySelector('#dealer-blackjack-result').textContent = '0';
        
        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

        document.querySelector('blackjack-result').textContent = "Let's Play" ;
        document.querySelector('blackjack-result').style.color = 'black';
        blackjackGame['turnOver'] = true;
    }

}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic(){
    blackjackGame['isStand'] = true;

    while (DEALER['score']<16 && blackjackGame['isStand']== true){
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    blackjackGame['turnOver'] = true;
    let winner = computeWinner();
    showResult(winner);

}

// deciding the winner
function computeWinner(){
    let winner;
    if (YOU['score'] <= 21){
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            winner = YOU;
            blackjackGame['wins']++;
        } else if (YOU['score'] < DEALER['score']){
            winner = DEALER;
            blackjackGame['losses']++;
        } else if ( YOU['score'] === DEALER['score'] ){
            //draw
            blackjackGame['draws']++;
        }
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21){
        winner = DEALER;
        blackjackGame['losses']++;
    } else if (YOU['score'] > 21 && DEALER['score'] > 21){
        //draw
        blackjackGame['draws']++;
    }
    console.log("Winner is", winner)
    return winner;

}

function showResult(winner){
    let message, messageColor;
    if (blackjackGame['turnOver'] === true){
        if (winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You Win!';
            messageColor ='green';
            winSound.play();
        } else if (winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You Lost!';
            messageColor ='red';
            lossSound.play();
        } else {
            document.querySelector('#drews').textContent = blackjackGame['draws'];
            message = 'Draw';
            messageColor = 'black';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}
