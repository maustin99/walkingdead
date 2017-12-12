
    console.log( "ready!" );

  var amt = 100;

  function attack(event){
    
      
      console.log('health bar  ' + masterHealth + '   ' + amt)
      $('.healthBarValue').css('width', masterHealth + '%' )

  }

  attack();
  
  function fullHealth(event){
    $('.reset').on('click', function(){  
      amt = 100;
      $('.healthBarValue').css('width', '100%');
    })
  }
  
  fullHealth();


