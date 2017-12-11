console.log('Java is working!')


var $mainGameConsole = $('#mainGameConsole')



function nukeEmAll(){

    var $allCreatures = $( ".badCreatures" )

    $allCreatures.each(function(index, creature) {
        $(creature).data('jsobj').nukeLife()
    })

}


function Creature(){
    this.health = 100
    
    this.reduceLife = function() {
        this.health -= 25
        console.log('Call Reduce Life -25%' + this.health)
        $(this.$domnode).text(this.health)
        if(this.health <= 0) {
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
    } //END Reduce Life
    

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
      animateDiv();        
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