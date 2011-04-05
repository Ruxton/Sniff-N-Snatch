class AddCarrierWaveToImageModel < ActiveRecord::Migration
  def self.up
    add_column :images, :image_file, :string
  end

  def self.down
    remove_column :images, :image_file
  end
end
