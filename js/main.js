console.log('Java is working!')


var $mainGameConsole = $('#mainGameConsole')

var masterHealth = 100;
var $healthDisplay = $('<div>')
$healthDisplay.addClass('healthDisplay')
$mainGameConsole.append($healthDisplay) 

var $masterClockDisplay = $('<p>')
$masterClockDisplay.addClass('masterClockDisplay')
$lowerConsoleWindow = $('#lowerConsoleWindow')
$lowerConsoleWindow.append($masterClockDisplay) 


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
var $readyPlayerOneDiv = $('#readyPlayerOne')




function playerOneLoad(){
    $readyPlayerOneDiv.css("visibility","visible")
    $readyPlayerOneDiv.on('click', playerOneStart)
    currentPlayer = 'playerOne'
}

function playerOneStart(){
    $readyPlayerOneDiv.css("visibility","hidden")
    displayPoints()

    new Creature()
    
    startMasterClock()

}

function playerOneStop(){
    
    
    
    clearInterval() 
}


function playerTwoStart(){
    
    
        
    
    }


function displayPoints(){
    //displays points -- ALL PLAYERS
    
    

}

function startMasterClock(){
    var duration = 30
    var timer = duration, minutes, seconds;
    var i=0
    
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        

        console.log(minutes + ":" + seconds);
        $masterClockDisplay.text('Clock  ::' + seconds )

        if (--timer < 0) {
            timer = duration;
        }

        if (seconds === 0)
        {
            clearInterval() 
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
    
        $nuke.on('click', function(){
            nukeEmAll()
            $nuke.remove()
        })
        $mainGameConsole.append($nuke)

    }

    

function nukeEmAll(){

    var $allCreatures = $( ".badCreatures" )

    $allCreatures.each(function(index, creature) {
        $(creature).data('jsobj').nukeLife()
    })

}

function damageHuman(){
    masterHealth -= 1.5

    $healthDisplay.text('Health:   ' + masterHealth)
    console.log('MASTER Health  ' + masterHealth)

}


//=========================================================
//=========================================================
function Creature(){              // Main CREATURE SPAWN -------------------------
    this.health = 100
    
    this.reduceLife = function() {
        this.health -= 25
        console.log('Call Reduce Life -25%' + this.health)
        $(this.$domnode).text(this.health)
        if(this.health <= 0) {
            console.log('confirmed kill')
            if(currentPlayer === 'playerOne'){     //ADD Points for Kill
                $globalPlayerOnePoints = $globalPlayerOnePoints + 5
                console.log('points collected  ' + $globalPlayerOnePoints)
            } else if(currentPlayer === 'playerTwo'){
                $globalPlayerTwoPoints = $globalPlayerTwoPoints + 5
            }
            $(this.$domnode).remove()
        }
    } //END Reduce Life

    this.nukeLife = function() {
        this.health -= 75
        console.log('Call Reduce Life -75%' + this.health)
        $(this.$domnode).text(this.health)
        if(this.health <= 0) {
                $(this.$domnode).remove()
        }
    } //END Nuke Life
    

    console.log('SPAWN CREATURE')

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
    animateDiv()                                // >>>>>EXECUTE <<<<<<<< //

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
      animateDiv();  // call animate again
      damageHuman(); // damage human       
    });
    
};
function calcSpeed(prev, next) {
    
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    
    var greatest = x > y ? x : y;
    
    var speedModifier = 0.3;    //change this to set DIFFICULTY -- 0.5 is difficult

    var speed = Math.ceil(greatest/speedModifier);

    return speed;

}
/*-----------------------END  RADOMIZER -------------------*/



// test listeners:

$('body').on('click', '.badCreatures', function() {
    // any time you click on a creature div, be able to refer to its associated JS obj with
    // $(this).data('jsobj')
    var creatureObj = $(this).data('jsobj')
    console.log(creatureObj)
    creatureObj.reduceLife()
})

/*
$('body').on('dblclick', '.badCreatures', function() {
    var creatureObj = $(this).data('jsobj')
    creatureObj.reduceLife()
})   */