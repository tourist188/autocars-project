<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\MakeController;
use App\Http\Controllers\ModellController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//FETCHING CARS---SORTED, PAGINATED, PRICE RANGED---OK
Route::get('cars/page/{page}/sort/{sort}/direction/{direction}/{minPrice?}/{maxPrice?}', [CarController::class, 'getAllCars']);
Route::get('cars/make/{make}/model/{model}/page/{page}/sort/{sort}/direction/{direction}/{minPrice?}/{maxPrice?}', [CarController::class, 'getCarsbyMakeModelandPrice']); 
Route::get('cars/make/{make}/page/{page}/sort/{sort}/direction/{direction}/{minPrice?}/{maxPrice?}', [CarController::class, 'getCarsByMake']);




//COUNTING ROUTES---OK
Route::get('cars/count/make/{make}/model/{model}/{minPrice?}/{maxPrice?}', [CarController::class, 'countCarsByMakeModelAndPrice']);
Route::get('cars/count/make/{make}/{minPrice?}/{maxPrice?}', [CarController::class, 'countMakeCars']); //MAKE COUNT
Route::get('cars/count/all/{minPrice?}/{maxPrice?}', [CarController::class, 'countAllCars']);
                                                                                       

// FETCHING MAKES AND MODELS---OK
Route::get('makes', [MakeController::class, 'index']);  //  makes Sorted asc
Route::get('models/{make}', [ModellController::class, 'getModelsByMake']);  // models for a make ---asc order



