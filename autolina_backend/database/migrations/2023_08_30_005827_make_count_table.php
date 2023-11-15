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
        Schema::create('make_count', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('make_id');
            $table->integer('make_count');
            $table->timestamps();

            $table->foreign('make_id')->references('id')->on('makes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('make_count');
    }
};
