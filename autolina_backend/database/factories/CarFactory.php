

<?php
use App\Models\Models;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Car;
use App\Models\Make;


class CarFactory extends Factory
{
    protected $model = Car::class;

    public function definition()
    {
        return [
            'make_id' => Make::factory(),
            'model_id' => Models::factory(),
            'price' => $this->faker->randomFloat(2, 1000, 100000),
            'km' => $this->faker->randomNumber(4),
            'color' => $this->faker->color(),
            'ps' => $this->faker->randomNumber(3),
            'address' => $this->faker->address(),
            'manual_automatic' => $this->faker->randomElement(['manual', 'automatic']),
        ];
    }
    
}