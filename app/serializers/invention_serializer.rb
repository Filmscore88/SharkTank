class InventionSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :user_id
  belongs_to :user
end
