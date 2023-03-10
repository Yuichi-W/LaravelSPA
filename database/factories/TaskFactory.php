<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $user_id = $this->faker->numberBetween(1, 5);
        return [
            'title'   => $user_id . ':' . $this->faker->realText(rand(10, 30)),
            'is_done' => $this->faker->boolean(10),
            'user_id' => $user_id,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
