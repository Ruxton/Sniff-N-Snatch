var urlwatcher = {
  
  images: [ ],
  
  setup: function() {
    this.addUrlListener();
    this.nextClick();
    this.prevClick();
    console.log('setup');
  },
  
  
  
  get: function(inUrl) {
    console.log('getting '+inUrl);
    $('#link_information').show();    
    urlwatcher.images = [ ];
    $.ajax({
      url: 'http://imgr.local/fetch/?url='+encodeURI(inUrl),
      success: function(data){        
        $('#progress').hide();
        console.log(data.metadata);
        urlwatcher.linkInfo(data.metadata);
        urlwatcher.imageList(data.images);
        urlwatcher.imageSwitch();
//        $('ul#images li:first').show();
      },
      error: function(data) {
        alert('There was an error.');
      }
    });
  },
  
  imageSwitch: function() {
    target = $('#images #imageone img');
    curIndex = parseInt(target.attr('data-index'));
    arrLen = (urlwatcher.images.length)-1;
    
    if( curIndex == -1 || curIndex == arrLen ) {
      console.log('First');
      console.log(urlwatcher.images[0]);
            
      target.attr('src',urlwatcher.images[0]);
      target.attr('data-index',0);
      
      console.log('Set Index: 0');              
    }
    else
    {
      console.log('Third');
      console.log(urlwatcher.images[curIndex+1]);
      target.attr('src', urlwatcher.images[curIndex+1] );
      target.attr('data-index', curIndex+1);        
      console.log('Set Index: '+(curIndex+1));        
    }
    
    
  },
  
  linkInfo: function(data) {
    $('#link_information h4').text(data.title);
    $('#link_information p.summary').text(data.url);
    $('#link_information p.description').text(data.description);
  },
  
  imageList: function(data) {    
    $.each(data, function(imgsrc) {
      urlwatcher.images.push(data[imgsrc]);
    });    
  },
  
  addUrlListener: function() {
    console.log('loaded');
    $('#_input_box').live('keypress', function(e) {
      if(e.charCode == 32)
      {
        val = this.value;
        URLMATCH = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
        urlPos = val.search(URLMATCH);
        if(urlPos != -1)
        { 
          match = val.slice(urlPos);
          match = $.trim(match);
          $('#progress').show();
          urlwatcher.get(match)
        }
      }
    });
  },
  
  nextClick: function() {
    $('a.next').live('click', function() {
      urlwatcher.imageSwitch();
      return false;
    });
  },
  
  doNextClick: function() {
    next = $('ul#images li:visible').next('li:hidden');
    if(next.length) {
      $('ul#images li:visible:first').hide();
    }
    else {
      $('ul#images li:visible:first').hide();      
      next = $('ul#images li:first');
    }
    
    next.show();    
  },
  
  prevClick: function() {
    $('a.prev').live('click', function() {
      urlwatcher.imageSwitch();
      return false;    
    });
  },
  
  doPrevClick: function() {
    prev = $('ul#images li:visible').prev('li:hidden');
    if(prev.length) {
      $('ul#images li:visible:first').hide();
    }
    else
    {
      $('ul#images li:visible:first').hide();      
      prev = $('ul#images li:last');
    }
    prev.show();    
  },
  
}

urlwatcher.setup();
