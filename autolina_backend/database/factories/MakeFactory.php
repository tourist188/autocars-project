<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\Factory;

class MakeFactory extends Factory
{
    protected $model = Make::class;

    public function definition()
    {
        return [
            'make' => $this->faker->company(),
        ];
    }
}
