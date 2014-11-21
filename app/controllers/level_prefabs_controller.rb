class LevelPrefabsController < ApplicationController
  # GET /level_prefabs
  # GET /level_prefabs.json
  def index
    @level_prefabs = LevelPrefab.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @level_prefabs }
    end
  end

  # GET /level_prefabs/1
  # GET /level_prefabs/1.json
  def show
    @level_prefab = LevelPrefab.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @level_prefab }
    end
  end

  # GET /level_prefabs/new
  # GET /level_prefabs/new.json
  def new
    @level_prefab = LevelPrefab.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @level_prefab }
    end
  end

  # GET /level_prefabs/1/edit
  def edit
    @level_prefab = LevelPrefab.find(params[:id])
  end

  # POST /level_prefabs
  # POST /level_prefabs.json
  def create
    @level_prefab = LevelPrefab.new(params[:level_prefab])

    respond_to do |format|
      if @level_prefab.save
        format.html { redirect_to @level_prefab, notice: 'Level prefab was successfully created.' }
        format.json { render json: @level_prefab, status: :created, location: @level_prefab }
      else
        format.html { render action: "new" }
        format.json { render json: @level_prefab.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /level_prefabs/1
  # PUT /level_prefabs/1.json
  def update
    @level_prefab = LevelPrefab.find(params[:id])

    respond_to do |format|
      if @level_prefab.update_attributes(params[:level_prefab])
        format.html { redirect_to @level_prefab, notice: 'Level prefab was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @level_prefab.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /level_prefabs/1
  # DELETE /level_prefabs/1.json
  def destroy
    @level_prefab = LevelPrefab.find(params[:id])
    @level_prefab.destroy

    respond_to do |format|
      format.html { redirect_to level_prefabs_url }
      format.json { head :no_content }
    end
  end
end
