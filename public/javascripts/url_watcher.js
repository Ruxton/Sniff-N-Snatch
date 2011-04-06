var urlwatcher = {
  
  setup: function() {
    this.addUrlListener();
    this.nextClick();
    this.prevClick();
    console.log('setup');
  },
  
  get: function(inUrl) {
    console.log('getting '+inUrl);
    $.ajax({
      url: 'http://imgr.local/fetch/?url='+encodeURI(inUrl),
      success: function(data){
        $('#progress').hide();
        urlwatcher.imageList(data)
        $('ul#images li:first').show();
      },
      error: function(data) {
        alert('There was an error.');
      }
    });
  },
  
  imageList: function(data) {
    target = $('ul#images');
    target.children('li').remove();
    $.each(data, function() {
      img = $("<img/>");
      img.attr('src',this);
      img.attr('width','100');
      img.attr('height','100');
      li = $("<li/>").html(img);
      li.attr('style', 'display: none');
      target.append(li);
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
          $('#progress').show();
          urlwatcher.get(match)
        }
      }
    });
  },
  
  nextClick: function() {
    $('a.next').live('click', function() {
      urlwatcher.doNextClick();
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
      urlwatcher.doPrevClick();
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
