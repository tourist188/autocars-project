<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cars_count_by_make_and_model_join', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('make_id');
            $table->unsignedBigInteger('model_id');
            $table->integer('make_count');
            $table->integer('model_count');
            $table->timestamps();

            $table->foreign('make_id')->references('id')->on('makes');
            $table->foreign('model_id')->references('id')->on('models');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cars_count_by_make_and_model_join');
    }
};
