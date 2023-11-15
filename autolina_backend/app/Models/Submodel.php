<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submodel extends Model
{
    use HasFactory;
    protected $table = 'submodel';
    protected $primaryKey = 'ID';

    public function getMakeNameAttribute() {
        return $this->model->Name;
    }
    public function cars()
    {
        return $this->hasMany(Car::class, 'submodel_id');
    }
    public function model(){
        return $this->belongsTo(Modell::class,'ModelID');
    }
//ADDED RECENTLY
    public function make()
{
    return $this->belongsTo(Make::class, 'make_id');
}

}
