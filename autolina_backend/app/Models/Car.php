<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;

class Car extends Model
{
    use HasFactory;
    protected $table = 'car';
    protected $primaryKey = 'car_id';

    public function make()
    {
        return $this->belongsTo(Make::class, 'make_id');
    }

    public function model()
    {
        return $this->belongsTo(Modell::class, 'model_id');
    }

    public function submodel()
    {
        return $this->belongsTo(Submodel::class, 'submodel_id');
    }

    public function images()
    {
        return $this->hasMany(CarImage::class, 'car_id');
    }

    private static function applyPriceRange($query, $minPrice = null, $maxPrice = null)
    {
        if ($minPrice !== null || $maxPrice !== null) {
            $query->whereBetween('price', [$minPrice ?? 0, $maxPrice ?? PHP_INT_MAX]);
        }
        return $query;
    }

    public static function transformCar($car)
    {
        return [
            'car_id' => $car->car_id,
            'year' => $car->year,
            'km' => $car->km,
            'price' => $car->price,
            'horsepower' => $car->horsepower,
            'transmission' => $car->transmission,
            'fuel_type' => $car->fuel_type,
            'color' => $car->color,
            'make' => $car->submodel->model->make->Name,
            'model' => $car->submodel->model->Name,
            'submodel' => $car->submodel->Name,
            'urls' => $car->images->pluck('url')->toArray(),
        ];
    }

    public static function getAllCars($page, $sortingColumn, $sortingDirection, $minPrice = null, $maxPrice = null)
    {
        try {
            $perPage = 7; // Number of cars per page
            $query = Car::with(['images', 'make', 'model', 'submodel'])->select('car_id', 'year', 'km', 'price', 'horsepower', 'transmission', 'fuel_type', 'color', 'make_id', 'model_id', 'submodel_id');
            $query = self::applyPriceRange($query, $minPrice, $maxPrice);

            if ($sortingColumn && $sortingColumn != 'makemodel') {
                $query->orderBy($sortingColumn, $sortingDirection);
            }

            if ($sortingColumn == 'makemodel') {
                $query->join('submodel', function ($join) {
                    $join->on('car.submodel_id', '=', 'submodel.ID')
                        ->join('model', 'submodel.ModelID', '=', 'model.ID')
                        ->join('make', 'model.MakeID', '=', 'make.ID');
                })
                    ->orderBy('make.Name', $sortingDirection)
                    ->orderBy('model.Name', $sortingDirection)
                    ->orderBy('submodel.Name', $sortingDirection);
            }

            $cars = $query->paginate($perPage, ['*'], 'page', $page);

            $result = $cars->map(function ($car) {
                return self::transformCar($car);
            });

            $paginator = new LengthAwarePaginator(
                $result,
                $cars->total(),
                $cars->perPage(),
                $cars->currentPage(),
                ['path' => LengthAwarePaginator::resolveCurrentPath()]
            );

            return response()->json(['cars' => $paginator]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong.'], 500);
        }
    }

    public static function getCarsByMake($makeName, $page, $sortingColumn, $sortingDirection, $minPrice = null, $maxPrice = null)
    {
        try {
            $perPage = 7; // Number of cars per page
            $query = Car::with(['images', 'make', 'model', 'submodel'])
                ->select('car_id', 'year', 'km', 'price', 'horsepower', 'transmission', 'fuel_type', 'color', 'make_id', 'model_id', 'submodel_id')
                ->whereHas('make', function ($query) use ($makeName) {
                    $query->where('Name', $makeName);
                });

            $query = self::applyPriceRange($query, $minPrice, $maxPrice);

            if ($sortingColumn && $sortingColumn != 'makemodel') {
                $query->orderBy($sortingColumn, $sortingDirection);
            }

            if ($sortingColumn == 'makemodel') {
                $query->join('submodel', function ($join) {
                    $join->on('car.submodel_id', '=', 'submodel.ID')
                        ->join('model', 'submodel.ModelID', '=', 'model.ID')
                        ->join('make', 'model.MakeID', '=', 'make.ID');
                })
                    ->orderBy('make.Name', $sortingDirection)
                    ->orderBy('model.Name', $sortingDirection)
                    ->orderBy('submodel.Name', $sortingDirection);
            }

            $cars = $query->paginate($perPage, ['*'], 'page', $page);

            $result = $cars->map(function ($car) {
                return self::transformCar($car);
            });

            $paginator = new LengthAwarePaginator(
                $result,
                $cars->total(),
                $cars->perPage(),
                $cars->currentPage(),
                ['path' => LengthAwarePaginator::resolveCurrentPath()]
            );

            return response()->json(['cars' => $paginator]);
        } catch (\Exception $e) {
            return response()->json(['GET_CARS_BY_MAKE_error' => 'Something went wrong.'], 500);
        }
    }

    public static function getCarsbyMakeModelandPrice($makeName, $modelName, $page, $sortingColumn, $sortingDirection, $minPrice = null, $maxPrice = null)
    {
        try {
            $perPage = 7; // Number of cars per page
            $query = Car::with(['images', 'make', 'model', 'submodel'])
                ->select('car_id', 'year', 'km', 'price', 'horsepower', 'transmission', 'fuel_type', 'color', 'submodel_id')
                ->whereHas('make', function ($query) use ($makeName) {
                    $query->where('Name', $makeName);
                })
                ->whereHas('model', function ($query) use ($modelName) {
                    $query->where('Name', $modelName);
                });

            $query = self::applyPriceRange($query, $minPrice, $maxPrice);

            if ($sortingColumn && $sortingColumn != 'makemodel') {
                $query->orderBy($sortingColumn, $sortingDirection);
            }

            if ($sortingColumn == 'makemodel') {
                $query->join('submodel', function ($join) {
                    $join->on('car.submodel_id', '=', 'submodel.ID')
                        ->join('model', 'submodel.ModelID', '=', 'model.ID')
                        ->join('make', 'model.MakeID', '=', 'make.ID');
                })
                    ->orderBy('make.Name', $sortingDirection)
                    ->orderBy('model.Name', $sortingDirection)
                    ->orderBy('submodel.Name', $sortingDirection);
            }

            $cars = $query->paginate($perPage, ['*'], 'page', $page);

            $result = $cars->map(function ($car) {
                return self::transformCar($car);
            });

            $paginator = new LengthAwarePaginator(
                $result,
                $cars->total(),
                $cars->perPage(),
                $cars->currentPage(),
                ['path' => LengthAwarePaginator::resolveCurrentPath()]
            );

            return response()->json(['cars' => $paginator]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong.'], 500);
        }
    }

    public static function countCarsByMakeModelAndPrice($makeName, $modelName, $minPrice = null, $maxPrice = null)
    {
        try {
            $query = Car::whereHas('make', function ($query) use ($makeName) {
                $query->where('Name', $makeName);
            })->whereHas('model', function ($query) use ($modelName) {
                $query->where('Name', $modelName);
            });

            $query = self::applyPriceRange($query, $minPrice, $maxPrice);

            $carCount = $query->count();

            return response()->json(['car_count' => $carCount]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong.'], 500);
        }
    }

    public static function countMakeCars($make, $minPrice = null, $maxPrice = null)
    {
        try {
            $query = Car::whereHas('make', function ($query) use ($make) {
                $query->where('Name', $make);
            });

            $query = self::applyPriceRange($query, $minPrice, $maxPrice);

            $carCount = $query->count();

            return response()->json(['car_count' => $carCount]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong.'], 500);
        }
    }

    public static function countAllCars($minPrice = null, $maxPrice = null)
    {
        try {
            $query = Car::query();

            $query = self::applyPriceRange($query, $minPrice, $maxPrice);

            $carCount = $query->count();

            return $carCount;
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong.'], 500);
        }
    }
}
