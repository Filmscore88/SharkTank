class InventionInvestmentSerializer < ActiveModel::Serializer
  attributes :id, :amount, :user_id, :invention_id
  belongs_to :user
  belongs_to :invention
end
