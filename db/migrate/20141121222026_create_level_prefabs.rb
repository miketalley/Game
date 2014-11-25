class CreateLevelPrefabs < ActiveRecord::Migration
  def change
    create_table :level_prefabs do |t|
		t.string :name, uniqueness: true
		t.string :type
		t.integer :radius
		t.integer :width
		t.integer :height
		t.string :fillStyle
		t.integer :lineWidth
		t.string :strokeStyle
	  	t.timestamps
    end
  end
end
