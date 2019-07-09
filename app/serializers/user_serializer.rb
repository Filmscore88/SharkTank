class UserSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :inventions
  has_many :invention_investments
end
