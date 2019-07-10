class InventionInvestmentSerializer < ActiveModel::Serializer
  attributes :id, :amount, :user_id
  belongs_to :user
  belongs_to :invention 
end
