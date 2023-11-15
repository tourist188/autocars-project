<?php

namespace App\Http\Controllers;
use App\Models\Make;
use Illuminate\Http\Request;

class MakeController extends Controller
{


    public function index()
    {
      $data=Make::getAllMakes();
      return response()->json($data);
    }

    public function getModelsByMake($make){
        $data=Make::getModelsByMake($make);
        return response()->json($data);
    }
}
