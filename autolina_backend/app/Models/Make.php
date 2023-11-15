<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Make extends Model
{
    use HasFactory;

    protected $table = 'make';
    protected $primaryKey = 'ID';

    // Define the relationship with the Car model
    public function models()
    {
        return $this->hasMany(Modell::class, 'MakeID');
    }

    public function cars()
    {
        return $this->hasMany(Car::class, 'make_id','ID');
    }

    public static function getModelsByMake($makeName)
    {
        try {
            $make = Make::with('models')->where('Name', $makeName)->firstOrFail();
            return response()->json(['models' => $make->models]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Make not found.'], 404);
        }
    }
    public static function getAllMakes(){
        try {
            $makes = Make::orderBy('Name', 'asc')->get();
            return response()->json(['makes' => $makes]);

        } 
            catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong.'], 500);
        }
    }
}
