class FetchController < ApplicationController
  
  require 'lib/image_list'
  
  def index
    if !params[:url]
      render :json => { :status => 'error' }, :status => 404
    else
      url = params[:url]
      
      image_list = ImageList.new(url)
      images = image_list.get_images      
      images.map! do |href|
        
        image = Image.where( :address => href ).first
        logger.debug('searched..')
        if image.nil?
          image = Image.create( :address => href )
#          Delayed::Job.enqueue FetchJob.new(image.url_hash)
        end
        href = image_url(image.url_hash.to_s)
      end
      render :json => { :status => 'ok', :images => images }
    end
  end
  
end