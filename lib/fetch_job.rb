class FetchJob < Struct.new( :inc_hash )
  def perform
    Image.where( :url_hash => inc_hash ).each do |image|
      Rails.logger.debug('Processing '+image.address)
      image.remote_image_file_url = image.address
      image.fetched = true
      image.save!
    end
  end
end