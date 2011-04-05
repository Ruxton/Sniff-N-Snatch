class ImagesController < ApplicationController

  def show
    if !params[:id]
      render :text => 'blah'
    else
      @image = Image.find_by_url_hash(params[:id])
      
      redirect_to @image.image_file.url
    end
  end
  
  def chargeup
    Image.where( :fetched => false ).each do |image|
      image.remote_image_file_url = image.address
      image.fetched = true
      image.save!
    end
    render :text => 'done'
  end
  
  protected


  def grabit urlIn
  	url = URI.parse(urlIn)
  	res = Net::HTTP.start(url.host, url.port) { |http|
  		http.get(url.request_uri)
  	}
  	return res.body    
  end

end