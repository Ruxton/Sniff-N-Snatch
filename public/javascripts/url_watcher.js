var urlwatcher = {
  
  images: [ ],
  
  setup: function() {
    this.addUrlListener();
    this.nextClick();
    this.prevClick();    
  },
  
  
  
  get: function(inUrl) {
    $('#link_information').show();    
    urlwatcher.images = [ ];
    hostname=window.location.hostname;
    
    $.ajax({
      url: 'http://'+hostname+'/fetch/?url='+encodeURI(inUrl),
      success: function(data){        
        $('#progress').hide();
        urlwatcher.linkInfo(data.metadata);
        urlwatcher.imageList(data.images);
        urlwatcher.imageSwitch();
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
    target.show();    
    if(arrLen > 0) {
      $('#buttons').show();
    }
    
    if( curIndex == -1 || curIndex == arrLen || curIndex > arrLen ) {
      target.attr('src',urlwatcher.images[0]);
      target.attr('data-index',0);
    }
    else
    {
      target.attr('src', urlwatcher.images[curIndex+1] );
      target.attr('data-index', curIndex+1);        
    }
     
  },
  
  linkInfo: function(data) {
    $('#link_information h4').text(data.title);
    $('#link_information h4').inlineEdit({buttons: ''});
    $('#link_information p.summary').text(data.url);
    $('#link_information p.description').text(data.description);
    $('#link_information p.description').inlineEdit({control: 'textarea', buttons: ''});
  },
  
  imageList: function(data) {    
    $.each(data, function(imgsrc) {
      urlwatcher.images.push(data[imgsrc]);
    });    
  },
  
  addUrlListener: function() {
    $('#_input_box').live('keypress', function(e) {
      if(e.charCode == 32)
      {
        val = this.value;
//      URLMATCH = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
//      urlPos = val.search(URLMATCH);

        geturl = new RegExp(
          "(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))"
          ,"g"
        );
        
        urls = val.match(geturl);        

        if(urls.length > 0) {
          $('#progress').show();
          urlwatcher.get(urls[0]);
        }
        
        // if(urlPos != -1)
        // { 
        //   match = val.slice(urlPos);
        //   match = $.trim(match);
        //   $('#progress').show();
        //   if(match.indexOf('http') == -1)
        //   {
        //     match = 'http://'+match
        //   }
        //   urlwatcher.get(match)
        // }
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