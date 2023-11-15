
<?php

use App\Models\Make;
use Illuminate\Database\Eloquent\Factories\Factory;

class ModelFactory extends Factory
{
    protected $model = Model::class;

    public function definition()
    {
        return [
            'make_id' => Make::factory(),
            'model' => $this->faker->carModel(),
        ];
    }
}
