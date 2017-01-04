
  
  function incLoader() {
  
    var t = 0;
    
    var x = setInterval( function() {
      
      t++;
      $('.loader span').text( t+ '%' );
      if(t==100) { 
        clearInterval(x);
        
      };
      
    },100); 
      
    
      
      
  };
  
  incLoader() 
  