class ImageList
  require 'net/http'
  
  def initialize(url)
    @url = url
    @images = [ ]
    @base = ''
  end
  
  def get_images

    # parse the inputted URL through URI class
    uri = URI.parse(@url)
    
    # get HTML content form URI with Hpricot
    begin
      html = Hpricot(getasite(@url))
    rescue Exception => e
      return @images
    end
    
    @base = html.search("base")
    urls = html.search("img")
    urls.each do |tempUrl|    
      @images << tempUrl[:src]
    end
    
    @images = normalize_and_build_urls @images
    
    @images
  end
  
  protected
  
  def normalize_and_build_urls uri_hash
    return_arr = [ ]
    
    uri_hash.uniq!
    uri_hash.each do |uri|
      begin
        uri = uri.gsub('\\','/').strip
        tempuri = URI.parse(uri)
        if tempuri.host.nil? and @base.size > 0
          uri = @base.first[:href]+uri
        elsif tempuri.host.nil?
          uri = (@url + uri).to_s
        end
      rescue URI::InvalidURIError => e
#        logger.debug('[INVALID URI] ' + uri )
        if base.size > 0
          uri = @base.first[:href]+uri
#          logger.debug('[INVALID URI] Rescued, setting base ' + uri)
        else
          uri = 'http://' + @url.host + '/' + uri
#          logger.debug('[INVALID URI] Rescued, host nil ' + uri)
        end
      end
      
      uri = uri.gsub(' ','%20')
      
      header = headercheck(uri)
      if Integer(header['Content-Length']) > 6000
        return_arr << uri
      end
    end
    
    return_arr 
  end
  
	def headercheck urlIn
		url = URI.parse(urlIn)
		req = Net::HTTP::Head.new(url.request_uri)

		res = Net::HTTP.start(url.host, url.port) {|http|
			 http.request(req)
		}
		return res
	end
	
	def getasite urlIn
		url = URI.parse(urlIn)
		res = Net::HTTP.start(url.host, url.port) { |http|
			http.get(url.request_uri)
		}
		return res.body
	end
  
  
end