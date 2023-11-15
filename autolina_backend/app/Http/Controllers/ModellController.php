<?php

namespace App\Http\Controllers;
use App\Models\Modell;
use Illuminate\Http\Request;

class ModellController extends Controller
{
    public function getModelsByMake($make){
        $data=Modell::getModelsByMake($make);
        return response()->json($data);
    }
}
