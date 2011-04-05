class AddFetchedFlagToImages < ActiveRecord::Migration
  def self.up
    add_column :images, :fetched, :boolean, :default => false
  end

  def self.down
    remove_column :images, :fetched
  end
end
