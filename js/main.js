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
    $mainGameConsole.append(this.$domnode)
}  //END createCreature ------------------



// test listeners:

$('body').on('click', '.badCreatures', function() {
    // any time you click on a creature div, be able to refer to its associated JS obj with
    // $(this).data('jsobj')
    var creatureObj = $(this).data('jsobj')
    console.log(creatureObj)
})

$('body').on('dblclick', '.badCreatures', function() {
    var creatureObj = $(this).data('jsobj')
    creatureObj.reduceLife()
})