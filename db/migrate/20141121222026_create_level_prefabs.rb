class CreateLevelPrefabs < ActiveRecord::Migration
  def change
    create_table :level_prefabs do |t|

      t.timestamps
    end
  end
end
