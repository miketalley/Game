class LevelPrefab < ActiveRecord::Base
  attr_accessible :name, :type, :radius, :width, :height, :fillStyle, :lineWidth, :strokeStyle
end
