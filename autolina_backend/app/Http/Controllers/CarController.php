<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Car;

use App\Http\Resources\CarResource;


class CarController extends Controller{


    public function index()
    {
        try {
            $cars = Car::all();
            return response()->json($cars);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong.'], 500);
        }
    }
    
    public function show($id)
    {
        try {
            $car = Car::findOrFail($id);
            return response()->json($car);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Car not found.'], 404);
        }
    }
    
// FETCHING CARS

//RETURN ALL CARS
    public function getAllCars( $page, $sortingColumn,$sortingDirection, $minPrice , $maxPrice ){
        $data=Car::getAllCars( $page , $sortingColumn,$sortingDirection, $minPrice , $maxPrice );
        return response()->json($data);
    }

//Return all Car with a Specific Make
    public function getCarsByMake($makeName, $page  , $sortingColumn,$sortingDirection, $minPrice , $maxPrice ){
        $data=Car::getCarsByMake($makeName, $page ,$sortingColumn,$sortingDirection, $minPrice , $maxPrice);
        return response()->json($data);
    }
/// REUTNRN ALL CARS WITH MAKE AND MODEL
public function getCarsbyMakeModelandPrice($makeName, $modelName, $page,$sortingColumn,$sortingDirection, $minPrice , $maxPrice ){
    $data = Car::getCarsbyMakeModelandPrice($makeName, $modelName, $page, $sortingColumn,$sortingDirection,$minPrice, $maxPrice);
    return response()->json($data);
}







//// COUNTING CONTROLLER FUNCTIONS
public function countAllCars($minPrice = null, $maxPrice = null){
    $data=Car::countAllCars($minPrice,$maxPrice);
    return response()->json($data);
}

public function countMakeCars($make ,$minPrice = null, $maxPrice = null){
    $data=Car::countMakeCars($make,$minPrice,$maxPrice);
    return response()->json($data);
}

  
public function countCarsByMakeModelAndPrice($make,$model, $minPrice = null, $maxPrice = null){
    $data=Car::countCarsByMakeModelAndPrice($make,$model,$minPrice,$maxPrice);
    return response()->json($data);
}

    
 
    
    


}
