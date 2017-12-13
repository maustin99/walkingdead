console.log('Java is working!')


var $mainGameConsole = $('#mainGameConsole')

var masterHealth = 100;


var $masterClockDisplay = $('<p>')
$masterClockDisplay.addClass('masterClockDisplay')
$lowerConsoleWindow = $('#lowerConsoleWindow')
$lowerConsoleWindow.append($masterClockDisplay) 

var $dangerSign = $('<p>')
$dangerSign.addClass('dangerSign')
$healthBarShell = $('.healthBarShell')
$healthBarShell.append($dangerSign) 

var $firstAid = $('<div>')
$firstAid.addClass('firstAid')
setInterval(function(){     //fisrt aid timer
    displayFirstAid() 
}, 10000);


var $nuke = $('<div>')
$nuke.addClass('nukeDisplay')
setInterval(function(){     //nuke timer
    displayNuke() 
}, 15000);


var $globalPlayerOnePoints = 0
var $globalPlayerTwoPoints = 0
var currentPlayer = ''
var currentPlayerStatus = ''
var $readyPlayerOneDiv = $('#readyPlayerOne')
var $readyPlayerTwoDiv = $('#readyPlayerTwo')
var $youDiedDiv = $('#youDied')
var $youSurvivedDiv = $('#youSurvived')
var $endOfGameDiv = $('#endOfGame')
var $splashPage = $('#splashPage')

var creatureArray;
var createCreatureInterval;
var gateKeeper = 'open'


function resetGameBoard(){
   
    

}


function splashBegin(){
    $splashPage.on('click', playerOneLoad)
    $('.startAgain').on('click', playerOneLoad)
    $('.beginPLayer2').on('click', playerTwoLoad)
    $readyPlayerOneDiv.on('click', playerOneStart)
    $readyPlayerTwoDiv.on('click', playerTwoStart)
    $endOfGameDiv.on('click', '.startAgain' , playerOneLoad)
    
    $nuke.on('click', function(){
        nukeEmAll()
        $nuke.fadeOut()
    })
}


function playerOneLoad(){
 
    resetGameBoard()
    $globalPlayerOnePoints = 0
    $splashPage.fadeOut()
    $endOfGameDiv.fadeOut()
    $youDiedDiv.fadeOut()
    $readyPlayerOneDiv.fadeIn()
    currentPlayer = 'playerOne'
    currentPlayerStatus = 'alive'
    masterHealth = 100
   
    
    }//end function
  


function playerOneStart(){
   
    $readyPlayerOneDiv.fadeOut()
    
    
    creatureCreate()     // START GAME  <<<<<<<<<<<<<<<<<<<<<<<<<<<
    gateKeeper = 'open'
    //startMasterClock()     //START MASTER CLOCK
}


function playerOneDied(){
    currentPlayerStatus = 'dead'
    $youDiedDiv.fadeIn()
}



function playerTwoLoad(){
    
    resetGameBoard()
    $youDiedDiv.fadeOut()
    $readyPlayerTwoDiv.fadeIn()
    
    currentPlayer = 'playerTwo'
    currentPlayerStatus = 'alive'
    masterHealth = 100
    
}

function playerTwoStart(){
    masterHealth = 100
    $readyPlayerTwoDiv.fadeOut()
    creatureCreate()           // START GAME
    gateKeeper = 'open'
    //startMasterClock()     //START MASTER CLOCK
}

function playerTwoDied(){
    currentPlayerStatus = 'dead'
    $endOfGameDiv.fadeIn()
    
    
}


//=================================
//Initializes Points
function initializePoints(){
    

} //END function -------

//displays points -- ALL PLAYERS
var $playerOneNum = $('#playerOneNum')
$playerOneNum.html('0')

var $playerTwoNum = $('#playerTwoNum')
$playerTwoNum.html('0')
//=================================
    

function startMasterClock(){
    var duration = 30
    var timer = duration, minutes, seconds;
    var i=0
    
    var intervalID = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        

        console.log(minutes + ":" + seconds);
        $masterClockDisplay.text('Clock  ::' + seconds )

        if (--timer < 0) {
            timer = duration;
        }

        if (seconds === 15)
        {
            console.log('TIMES UP   Health:' + masterHealth + 'Score P1  ' + $globalPlayerOnePoints )
            clearInterval(intervalID) 
        }
    }, 1000);
} //END Master Clock -------------------


function displayFirstAid(){

    $firstAid.on('click', function(){
        masterHealth += 10
        $firstAid.remove()
    })
    $mainGameConsole.append($firstAid)
    //ADD to board randomly
    var num = (Math.random() * 800)
    $firstAid.css({
        top: 600,
        left: num+25,         
    })
}


function displayNuke(){
    $nuke.fadeIn()
}

    

function nukeEmAll(){

    var $allCreatures = $( ".badCreatures" )

    $allCreatures.each(function(index, creature) {
        $(creature).data('jsobj').nukeLife()
    })

}

function damageHuman(){             // MASTER HEALTH =====================
    masterHealth -= 1.5

    //$healthDisplay.text('Health:   ' + masterHealth)
    console.log('MASTER Health  ' + currentPlayer + '  ' + masterHealth)

    console.log('health bar  ' + masterHealth)
    //$('.healthBarValue').css('width', masterHealth + '%' )

    if(masterHealth <= 0) {
        $('.badCreatures').each(function(index, creature) {
            $(creature).data('jsobj').stopHurtingHuman()
            //$(creature).data('jsobj').die
        })
    }

    if( (masterHealth <= 0) && (currentPlayer === 'playerOne'))  {    //If die STOP Game
        console.log('player 1 died')
        if (gateKeeper === 'open'){
            playerOneDied()
            console.log('PLAYER ONE CALL TRIGGERED *******')
            gateKeeper = 'closed'
        }else { console.log('gate is CLOSED') }
        
    }else if ((masterHealth <= 0) && (currentPlayer === 'playerTwo')) {
        if (gateKeeper === 'open'){
              console.log('player 2 died')
              playerTwoDied()
              gateKeeper = 'closed'
        }else { console.log('gate is CLOSED')  }
    } 
    
    
    if(masterHealth <= 25){
        console.log('DANGERDANGERDANGERDANGERDANGERDANGER')
        //$dangersign = $('<div>').text(this.health)
        $('.dangerSign').text('DANGER')
        $('.dangerSign').animate({
            color: 'red', right: '250px', opacity: '1'

        } , 2000 )
    
    }else if(masterHealth > 25){
        $('.dangerSign').text('DANGER')
        $('.dangerSign').animate({
            right: '150px', opacity: '0'

        } , 2000 )
    }

}  //END MASTER Health


function creatureCreate(){
    creatureArray = []
    createCreatureInterval = setInterval(function(){     //create creature timer
        
        if( (currentPlayerStatus === 'alive') && (masterHealth >= 0)  ){
            creatureArray.push(new Creature())
        }
        

        if(creatureArray.length >= 30){
            clearInterval(createCreatureInterval)
            eraseCreatures()
        } else if(currentPlayerStatus === 'dead' || masterHealth <= 0){
            clearInterval(createCreatureInterval)
            eraseCreatures()
        }
    }, 3000);
}

function eraseCreatures(){
    $('.badCreatures').remove()
    var i = 0
    while ( i < creatureArray.length ){
        creatureArray[i].die()
        creatureArray[i] = null
        console.log('***STOP*** creature ERASE')
        i++
    }// end while

    creatureArray = []
    console.log('***STOP*** creature NULLed')
} //end function


//=========================================================
//=========================================================
function Creature(){              // Main CREATURE SPAWN -------------------------
    this.health = 100

    this.die = function() {
        this.$domnode.remove()
        this.stopHurtingHuman()
        delete this.$domnode
    }

    this.stopHurtingHuman = function() {
        clearInterval(this.internalDamageTheHuman)
    }
    
    this.reduceLife = function() {
        this.health -= 25
        console.log('Call Reduce Life -25%' + this.health)
        $(this.$domnode).text(this.health)
        if(this.health <= 0) {
            console.log('confirmed kill')
            if(currentPlayer === 'playerOne'){     //ADD Points for Kill
                $globalPlayerOnePoints = $globalPlayerOnePoints + 5
                $playerOneNum.html($globalPlayerOnePoints)
                console.log('points collected  ' + $globalPlayerOnePoints)
            } else if(currentPlayer === 'playerTwo'){
                $globalPlayerTwoPoints = $globalPlayerTwoPoints + 5
                $playerTwoNum.html($globalPlayerOnePoints)
            }
            this.die()
        }
    } //END Reduce Life

    this.nukeLife = function() {
        this.health -= 75
        console.log('Call Reduce Life -75%' + this.health)
        $(this.$domnode).text(this.health)
        if(this.health <= 0) {
            if(currentPlayer === 'playerOne'){     //ADD Points for Kill
                $globalPlayerOnePoints = $globalPlayerOnePoints + 5
                $playerOneNum.html($globalPlayerOnePoints)
                console.log('points collected  ' + $globalPlayerOnePoints)
            } else if(currentPlayer === 'playerTwo'){
                $globalPlayerTwoPoints = $globalPlayerTwoPoints + 5
                $playerOneNum.html($globalPlayerOnePoints)
            }
            this.die()
        } //END health
    } //END Nuke Life

    console.log('SPAWN CREATURE')

   
    this.internalDamageTheHuman = setInterval(function(){     //damage  timer
        damageHuman()
    }, 2200);

    
    

    // create a dom node (div) and be able to reference it from in here:
    this.$domnode = $('<div>').text(this.health)

    this.$domnode.data('jsobj', this)   //takes THIS (creature) calls is jsobj and saves it as DOMNODE
    this.$domnode.addClass('badCreatures')


    //ADD to board randomly
    var num = (Math.random() * 800) 
    this.$domnode.css({
        top: 300,
        left: num+25,
        
    })

    //--------------------


    $mainGameConsole.append(this.$domnode)      // >>>>>EXECUTE <<<<<<<< //     
                          
    animateDiv()                   // >>>>>EXECUTE <<<<<<<< //




              


    /*---------------------- ADD GROW Feature --------------
    $('.badCreatures').animate({ 
                        width: "300px",
                        height: "400px"
                         
                        }, 3000 , function() {
                            $( this ).after( console.log("Animation complete." )
                            )}
                        ); //END Animate 
    -------------------- END GROW Feature -----------------*/

}  //END createCreature ------------------
//=========================================================
//=========================================================



  /*-----------------------RADOMIZER -------------------*/
  function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    
    var nh = Math.floor(Math.random() * 200);
    var nw = Math.floor(Math.random() * 800);
    
    return [nh,nw];    
     
}
function animateDiv(){
    var newq = makeNewPosition();
    var oldq = $('.badCreatures').offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    
    $('.badCreatures').animate({ top: 200, 
                                left: newq[1] ,
                                width: "350px",
                                height: "450px"
                                }, speed, function(){
    
    if( masterHealth > 0){
        animateDiv()  // call animate again
    } else{
        console.log('creature animation has halted')
        


    } //END else
        
        
    }); //END Animate CSS
    
};  //END Animate DIV
function calcSpeed(prev, next) {
    
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    
    var greatest = x > y ? x : y;
    
    var speedModifier = 0.3;    //change this to set DIFFICULTY -- 0.5 is difficult

    var speed = Math.ceil(greatest/speedModifier);

    return speed;

}
/*-----------------------END  RADOMIZER -------------------*/



/*----------------------- MONSTER / PLAYER ARRAYS -------------------*/





/*-----------------------END  MONSTER / PLAYER ARRAYS -------------------*/




// test listeners:

$('body').on('click', '.badCreatures', function() {
    // any time you click on a creature div, be able to refer to its associated JS obj with
    // $(this).data('jsobj')

    var creatureObj = $(this).data('jsobj')
    
    creatureObj.reduceLife()
    console.log(creatureObj)
})

/*
$('body').on('dblclick', '.badCreatures', function() {
    var creatureObj = $(this).data('jsobj')
    creatureObj.reduceLife()
})   */