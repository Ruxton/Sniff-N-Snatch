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
      @pismo = Pismo::Document.new(uri.to_s)      
      html = @pismo.html
    rescue Exception => e
      Rails.logger.debug('PISMO Error: '+e.to_s)
      return @images
    end
    
    @base = @pismo.doc.search("base")
    urls = @pismo.doc.search("img")
    
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
          if(@url[-1,1] != '/' && uri[1] != '/')
            @url = @url+'/'
          end
          uri = (@url + uri).to_s
        end
      rescue URI::InvalidURIError => e
        Rails.logger.debug('[INVALID URI] ' + uri )
        if base.size > 0
          uri = @base.first[:href]+uri
          Rails.logger.debug('[INVALID URI] Rescued, setting base ' + uri)
        else
          uri = 'http://' + @url.host + '/' + uri
          Rails.logger.debug('[INVALID URI] Rescued, host nil ' + uri)
        end
      end
      
      uri = uri.gsub(' ','%20')

      header = headercheck(uri)
      Rails.logger.debug('Should be empty: ' + header.inspect)
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