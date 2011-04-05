var urlwatcher = {
  
  setup: function() {
    this.addUrlListener();
    console.log('setup');
  },
  
  get: function(inUrl) {
    console.log('getting '+inUrl);
    $.ajax({
      url: 'http://imgr.local/fetch/?url='+encodeURI(inUrl),
      success: function(data){
        $('#progress').hide();
        urlwatcher.imageList(data)
      },
      error: function(data) {
        alert('There was an error.');
      }
    });
  },
  
  imageList: function(data) {
    target = $('ul#images');
    $.each(data, function() {
      img = $("<img/>");
      img.attr('src',this);
      li = $("<li/>").html(img);
      console.log('Added image - '+this);      
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
  
}

urlwatcher.setup();
