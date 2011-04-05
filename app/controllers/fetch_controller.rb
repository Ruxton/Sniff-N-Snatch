class FetchController < ApplicationController
  
  require 'lib/image_list'
  require 'lib/fetch_job'
  
  def index
    if !params[:url]
      render :json => :error, :status => 404
    else
      url = params[:url]
      
      image_list = ImageList.new(url)
      images = image_list.get_images
      images.map! do |href|
        image = Image.where( :address => href ).first
        logger.debug('searched..')
        if image.nil?
          image = Image.create( :address => href )
          Delayed::Job.enqueue FetchJob.new(image.url_hash)
        end
        href = 'http://imgr.local/bucket/image_file/' + image.url_hash.to_s
      end
      render :json => images   
    end
  end
  
end