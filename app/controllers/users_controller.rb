class UsersController < ApplicationController

  def new
    @user= User.new
  end


  def create
   @user= User.new(user_params)
      if @user.save

        flash[:success] = 'Account created'
        start_session(@user)
      else
        flash[:notice] ='ERROR: Account was not created'
        render :new
      end
  end


  def show
    @user= User.find_by(id: params[:id])
    @inventions= Invention.all

    respond_to do |format|
     format.html { render :show }
     format.json {render json: @inventions}
   end
  end


  private

  def user_params
    params.require(:user).permit(:id, :name, :password, :inventor, :investor)
  end
end
