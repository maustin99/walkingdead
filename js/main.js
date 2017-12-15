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
$mainGameConsole.append($firstAid)
setInterval(function(){     //fisrt aid timer
    displayFirstAid() 
}, 10000);


var $nuke = $('<div>')
$nuke.addClass('nukeDisplay')
$mainGameConsole.append($nuke)
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
var $outOfTimeP1Div = $('#outOfTimeP1')
var $outOfTimeP2Div = $('#outOfTimeP2')

var creatureArray;
var createCreatureInterval;
var gateKeeper = 'open'

var clockIntervalID;

function resetGameBoard(){
   
    

}



//initialize sound -----------------------------

var myMainMusic;
var myGunSound;
var myGrenadeSound;
var myGrowlOne;
var myGrowlTwo;
var firstAidSound;
var spaceAlarm;
var suspenseMusic;

 myMainMusic = new Audio("sound/walking_theme.mp3");
 myGunSound = new Audio("sound/machine_gun_short.mp3");
 myGrenadeSound = new Audio("sound/future_grenade.mp3");
 myGrowlOne = new Audio("sound/zombie_growl_005.mp3");
 myGrowlTwo = new Audio("sound/zombie_growl_007.mp3");
 firstAidSound = new Audio("sound/first_aid_sound.mp3");
 spaceAlarm = new Audio("sound/space alarm_112.mp3");
 suspenseMusic = new Audio("sound/suspense_music.mp3");

// END initialize sound ------------------------


function splashBegin(){

    myMainMusic.play();
    randomBackgroundPic()
    $splashPage.on('click', playerOneLoad)
    $('.startAgain').on('click', playerOneLoad)
    $('.beginPlayer2').on('click', playerTwoLoad)
    $readyPlayerOneDiv.on('click', playerOneStart)
    $readyPlayerTwoDiv.on('click', playerTwoStart)
    $endOfGameDiv.on('click', '.startAgain' , playerOneLoad)
    $outOfTimeP1Div.on('click', '.startAgain' , playerOneLoad)
    $outOfTimeP1Div.on('click', '.beginAgainP2' , playerTwoLoad)
    $outOfTimeP2Div.on('click', '.continueBtn' , playerTwoDied)
    
    
    $nuke.on('click', function(){
        nukeEmAll()
        myGrenadeSound.play()
        $nuke.fadeOut()
    })

    $firstAid.on('click', function(){
        masterHealth += 10
        firstAidSound.play()
        displayFirstAid()
    })
    

    $splashPage.fadeIn()
}  //END SPLASH --------


function playerOneLoad(){

    randomBackgroundPic()
    randomPlayerPic()
    resetGameBoard()
    masterHealth = 100
    dangerHealthDisplay()
    $globalPlayerOnePoints = 0
    $playerOneNum.html($globalPlayerOnePoints)
    $globalPlayerTwoPoints = 0
    $playerTwoNum.html($globalPlayerTwoPoints)
    $splashPage.fadeOut()
    $endOfGameDiv.fadeOut()
    $youDiedDiv.fadeOut()
    $outOfTimeP1Div.fadeOut()
    $readyPlayerOneDiv.fadeIn()
    currentPlayer = 'playerOne'
    currentPlayerStatus = 'alive'
    myGrowlOne.pause()
    myGrowlTwo.pause()
    suspenseMusic.pause()
    myMainMusic.pause()
    
   
    
    }//end function
  


function playerOneStart(){
   
    $readyPlayerOneDiv.fadeOut()
    suspenseMusic.play()

    currentPlayerHighlight()
    
    creatureCreate()     // START GAME  <<<<<<<<<<<<<<<<<<<<<<<<<<<
    gateKeeper = 'open'
    startMasterClock()     //START MASTER CLOCK
}


function playerOneDied(){
    currentPlayerStatus = 'dead'
    $youDiedDiv.fadeIn()

    spaceAlarm.pause()
}



function playerTwoLoad(){

    
    resetGameBoard()
    masterHealth = 100
    dangerHealthDisplay()
    $youDiedDiv.fadeOut()
    $outOfTimeP1Div.fadeOut()
    $readyPlayerTwoDiv.fadeIn()
    globalPlayerTwoPoints = 0
    currentPlayer = 'playerTwo'
    currentPlayerStatus = 'alive'
    
     currentPlayerHighlight()
     myGrowlOne.pause()
     myGrowlTwo.pause()
     suspenseMusic.pause()
}

function playerTwoStart(){
    masterHealth = 100
    $readyPlayerTwoDiv.fadeOut()
    creatureCreate()           // START GAME
    gateKeeper = 'open'
    startMasterClock()     //START MASTER CLOCK
    suspenseMusic.play()
}

function playerTwoDied(){
    currentPlayerStatus = 'dead'
    $outOfTimeP2Div.fadeOut()
    $endOfGameDiv.fadeIn()
    spaceAlarm.pause()

    if ($globalPlayerOnePoints > $globalPlayerTwoPoints){
        $('#winnerDeclare').html('Player One Wins!')
    }else if($globalPlayerOnePoints < $globalPlayerTwoPoints){
        $('#winnerDeclare').html('Player Two Wins!')
    }else if ($globalPlayerOnePoints === $globalPlayerTwoPoints){
        $('#winnerDeclare').html('You Both Survive!')
    }

    
} //END playerTwoDied

function outOfTimeP1(){
    currentPlayerStatus = 'dead'
    $outOfTimeP1Div.fadeIn()
    spaceAlarm.pause()
}

function outOfTimeP2(){
    currentPlayerStatus = 'dead'
    $outOfTimeP2Div.fadeIn()
    spaceAlarm.pause()
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
    
    clockIntervalID = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        

        console.log(minutes + ":" + seconds);
        $masterClockDisplay.text(seconds)

        if (--timer < 0) {
            timer = duration;
        }

        if (seconds <= 0)
        {
            stopTheClock() //stop the clock
            currentPlayerStatus = 'dead'

            console.log('TIMES UP   Health:' + masterHealth + 'Score P1  ' + $globalPlayerOnePoints )
            $('.badCreatures').each(function(index, creature) {
                $(creature).data('jsobj').stopHurtingHuman()
                $(creature).data('jsobj').die()
            }) 

            //eraseCreatures()

            console.log('outside of if, after erase')
            if( currentPlayer === 'playerOne' ){
                console.log('inside of if -- stop clock')
                outOfTimeP1()
            } else if(currentPlayer === 'playerTwo'){
                console.log('inside of if -- stop clock')
                outOfTimeP2()
            } else {
                console.log('stop clock fail to advance')
            }


        }  // END if at 15 sec
    }, 1000);
} //END Master Clock -------------------

function stopTheClock(){

    clearInterval(clockIntervalID)
    //stops master clock
}


function currentPlayerHighlight(){
    if(currentPlayer === 'playerOne'){
        $('#playerOneBoxScore').css({
            backgroundColor: 'rgba(14,25,159,0.5)'
        })
        $('#playerTwoBoxScore').css({
            backgroundColor: 'rgba(0,0,0,0.5)'
        })
    }else if (currentPlayer === 'playerTwo'){
        $('#playerOneBoxScore').css({
            backgroundColor: 'rgba(0,0,0,0.5)'
        })
        $('#playerTwoBoxScore').css({
            backgroundColor: 'rgba(117,12,12,0.5)'
        })
        
    }
} //END ------



var b = 0;
function displayFirstAid(){

    var num = (Math.random() * 800)

    if (b === 0){
        $firstAid.fadeIn( function() {
            b=1
                })
    } else if(b === 1){
        $firstAid.fadeOut( function() {
                b = 0
                
                $firstAid.css({
                    top: 600,
                    left: num+25,         
                })
            
            })
    }

    //ADD to board randomly
   
    
}

var a = 0;
function displayNuke(){
   
    if (a === 0){
        $nuke.fadeIn( function() {
            a=1
                })
    } else if(a === 1){
        $nuke.fadeOut( function() {
                a = 0
                })
    }

   


}

    

function nukeEmAll(){

    var $allCreatures = $( ".badCreatures" )

    $allCreatures.each(function(index, creature) {
        $(creature).data('jsobj').nukeLife()
    })

}

function damageHuman(){             // MASTER HEALTH =====================
    masterHealth -= 5

    dangerHealthDisplay()

    myGrowlTwo.play()
    
    //$healthDisplay.text('Health:   ' + masterHealth)
    console.log('MASTER Health  ' + currentPlayer + '  ' + masterHealth)


    if(masterHealth <= 0) {
        $('.badCreatures').each(function(index, creature) {
            $(creature).data('jsobj').stopHurtingHuman()
            //$(creature).data('jsobj').die
        })
    }

    if( (masterHealth <= 0) && (currentPlayer === 'playerOne'))  {    //If die STOP Game
        console.log('player 1 died')
        if (gateKeeper === 'open'){
            stopTheClock()
            playerOneDied()
            console.log('PLAYER ONE CALL TRIGGERED *******')
            gateKeeper = 'closed'
        }else { console.log('gate is CLOSED') }
        
    }else if ((masterHealth <= 0) && (currentPlayer === 'playerTwo')) {
        if (gateKeeper === 'open'){
              console.log('player 2 died')
              stopTheClock()
              playerTwoDied()
              gateKeeper = 'closed'
        }else { console.log('gate is CLOSED')  }
    } 
    
    
   
}  //END MASTER Health


function dangerHealthDisplay(){

    console.log('health bar display ' + masterHealth)
    $('.healthBarValue').css('width', masterHealth + '%' )  //ANIMATE health bar
    
    if(masterHealth <= 25){
        console.log('DANGERDANGERDANGERDANGERDANGERDANGER')
        //$dangersign = $('<div>').text(this.health)
        $('.dangerSign').html('DANGER')
        $('.dangerSign').animate({
              right: '250px', opacity: '1'

        } , 2000 )
        spaceAlarm.play()
    
    }else if(masterHealth >= 90){
        $('.dangerSign').html('DANGER')
        $('.dangerSign').animate({
            right: '150px', opacity: '0'

        } , 1000 )
        spaceAlarm.pause()
    }


} //END danger Health Display -----------------



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
    }, 2200);
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
        //$(this.$domnode).text(this.health)
        if(this.health <= 0) {
            console.log('confirmed kill')
            if(currentPlayer === 'playerOne'){     //ADD Points for Kill
                $globalPlayerOnePoints = $globalPlayerOnePoints + 5
                $playerOneNum.html($globalPlayerOnePoints)
                console.log('points collected  ' + $globalPlayerOnePoints)
            } else if(currentPlayer === 'playerTwo'){
                $globalPlayerTwoPoints = $globalPlayerTwoPoints + 5
                $playerTwoNum.html($globalPlayerTwoPoints)
            }
            this.die()
        }
    } //END Reduce Life

    this.nukeLife = function() {
        this.health -= 75
        console.log('Call Reduce Life -75%' + this.health)
        //$(this.$domnode).text(this.health)
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
    }, 1050);

    
    

    // create a dom node (div) and be able to reference it from in here:
    this.$domnode = $('<div>').text(this.health)

    $monsterPic = $monsterArray[Math.floor(Math.random() * $monsterArray.length)];
    //console.log('domnode***************', this.$domnode)
    $(this.$domnode).html( '<img src="'+$monsterPic.image+'">' )
    
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
    
    $('.badCreatures').animate({ top: 247, 
                                left: newq[1] ,
                                width: "350px",
                                height: "500px"
                                }, speed, function(){
    
    if( masterHealth > 0 || currentPlayerStatus != 'dead'){
        animateDiv()  // call animate again
        myGrowlOne.play()
    } else{
        console.log('creature animation has halted')
        myGrowlOne.pause()        


    } //END else
    }); //END Animate CSS

    $('.badCreatures > img').animate({ top: 200, 
        left: newq[1] ,
        width: "350px",
        height: "450px"
        }, speed )    //animate image img



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

var $monsterPic;
var $castPic;
var $castPic2;
var $backgroundPic;

var $monsterArray = [
    { name: 'Zombie1', image: './images/zombies/zombie_1.png' }, 
    { name: 'Zombie2', image: './images/zombies/zombie_2.png' },
    { name: 'Zombie3', image: './images/zombies/zombie_3.png' }, 
    { name: 'Zombie4', image: './images/zombies/zombie_4.png' }
  ];
  
  var $castArray = [
    { name: 'Cast1', image: './images/cast/rick.png' }, 
    { name: 'Cast1', image: './images/cast/Michonne.png' }, 
    { name: 'Cast1', image: './images/cast/daryl.png' }, 
    { name: 'Cast1', image: './images/cast/Carol.png' }, 
    { name: 'Cast1', image: './images/cast/carl.png' }, 
    { name: 'Cast1', image: './images/cast/maggie.png' }
  ];
  
function randomPlayerPic(){

    $castPic = $castArray[Math.floor(Math.random() * $castArray.length)];
    $castPic2 = $castArray[Math.floor(Math.random() * $castArray.length)];
    $('#player1Window').html('<img src="'+$castPic.image+'">')
    $('#player2Window').html('<img src="'+$castPic2.image+'">')
    

}

var $backgroundArray = [
    { name: 'Background', image: './images/WD_background_1400.jpg' }, 
    { name: 'Background', image: './images/WD_background_2_1400.jpg' }, 
    { name: 'Background', image: './images/WD_background_3_1400.jpg' }, 
    { name: 'Background', image: './images/WD_background_4_1400.jpg' }, 

  ];

  function randomBackgroundPic(){
    
        $backgroundPic = $backgroundArray[Math.floor(Math.random() * $backgroundArray.length)];
       
        console.log( 'background  '  + $backgroundPic.image)
        
        $("#mainGameWindow").css("backgroundImage", "url(" + $backgroundPic.image + ")");
        return $backgroundPic
    
    }


/*-----------------------END  MONSTER / PLAYER ARRAYS -------------------*/


//document.getElementById("mainGameWindow").style.cursor = './images/cursor_3_sm.png';

// test listeners:


$('body').on('click', '#mainGameWindow', function() {
    myGunSound.play()
})

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