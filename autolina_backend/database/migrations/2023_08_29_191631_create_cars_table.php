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
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('make_id');
            $table->unsignedBigInteger('model_id');
            $table->float('price');
            $table->integer('km');
            $table->string('color');
            $table->integer('ps');
            $table->string('address');
            $table->string('manual_automatic');
            $table->timestamps();

            $table->foreign('make_id')->references('id')->on('makes');
            $table->foreign('model_id')->references('id')->on('models');

            $table->unsignedBigInteger('car_images_id')->nullable();
            $table->foreign('car_images_id')->references('id')->on('car_images');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cars');
    }
};
