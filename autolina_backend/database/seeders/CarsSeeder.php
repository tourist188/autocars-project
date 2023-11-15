<?php

namespace Database\Seeders;

use App\Models\Models;
use Illuminate\Database\Seeder;
use App\Models\Make;

use App\Models\Car;
use App\Models\CarImage;


class CarsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $makes = Make::factory(10)->create();

        foreach ($makes as $make) {
            $models = Models::factory(20)->create([
                'make_id' => $make->id,
            ]);

            foreach ($models as $model) {
                $cars = Car::factory(20)->create([
                    'make_id' => $make->id,
                    'model_id' => $model->id,
                ]);

                foreach ($cars as $car) {
                    $carImage = CarImage::factory()->create([
                        'car_id' => $car->id,
                        'image_path' => \Faker\Provider\Image::image(
                            '300x255',
                            false,
                            false,
                            'car',
                            $car->make->name . ' ' . $car->model->name
                        ),
                    ]);
                }
            }
        }
    }
}