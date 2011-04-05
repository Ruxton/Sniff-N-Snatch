class AddHashToImages < ActiveRecord::Migration
  def self.up
    add_column :images, :url_hash, :string
  end

  def self.down
    remove_column :images, :url_hash
  end
end
