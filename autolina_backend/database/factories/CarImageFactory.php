<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\Factory;

class CarImageFactory extends Factory
{
    protected $model = CarImage::class;

    public function definition()
    {
        return [
            'car_id' => Car::factory(),
            'image_path' => $this->faker->imageUrl(300, 225, 'transport'), // Adjust dimensions and add a category
        ];
    }
    
}