class Site < ActiveRecord::Base
  before_save :build_hash
  
  validate :url_hash, :unique => true
  
  mount_uploader :html_file, HTMLUploader
  
  protected
  
  def build_hash
    self.url_hash = Digest::SHA256.hexdigest(self.address)
    self.valid?
    if self.errors.include?(:url_hash)
      build_hash
    end
  end  
  
end