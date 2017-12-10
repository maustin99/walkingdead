console.log('Java is working!')


$mainGameConsole = $('#mainGameConsole')


function createCreature(){
    var $newCreature = $('<div>')
    $newCreature.addClass('badCreatures')


     //make the creature clickable
     $newPlanet.on('click', function(){
        console.log('you just clicked a planet')
        $newPlanet.animate({
            top: (Math.random() * 400),
            left: (Math.random() * 600),
            width:(Math.random() * 300),
            height:(Math.random() * 300)
        }, 1000) //end animate, time has been added

    }) //end 'on click' function



    $mainGameConsole.append($newCreature)
}