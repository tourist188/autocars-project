<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modell extends Model
{
    use HasFactory;
    
    protected $table = 'model';
    protected $primaryKey = 'ID';

    // Define the relationship with the Car model

    public function make(){
        return $this->belongsTo(Make::class,'MakeID');
    }

    public function submodels()
    {
        return $this->hasMany(Submodel::class,'ModelID');
    }
    
    public function cars()
    {
        return $this->hasMany(Car::class, 'model_id');
    }


     public static function getModelsByMake($makeName)
     {
         try {
             // Use whereHas to filter models by make name
             $models = Modell::whereHas('make', function ($query) use ($makeName) {
                 $query->where('Name', $makeName);
             })->get();
 
             return response()->json(['models' => $models]);
         } catch (\Exception $e) {
             return response()->json(['error' => 'Make not found or no models associated with it.'], 404);
         }
     }

}
