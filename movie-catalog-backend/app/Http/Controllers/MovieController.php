<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;
use Validator;

class MovieController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $movies = Movie::with('user')->get();
        return response()->json($movies);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'sinopsis' => 'required|string',
            'anio' => 'required|integer|min:1900|max:' . (date('Y') + 5),
            'imagen' => 'required|url'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $movie = Movie::create(array_merge(
            $validator->validated(),
            ['user_id' => auth()->id()]
        ));

        return response()->json($movie, 201);
    }

    public function show($id)
    {
        $movie = Movie::with('user')->find($id);
        
        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], 404);
        }

        return response()->json($movie);
    }

    public function update(Request $request, $id)
    {
        $movie = Movie::find($id);
        
        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], 404);
        }

        if ($movie->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

       $validator = Validator::make($request->all(), [
     'nombre' => 'required|string|max:255',
     'sinopsis' => 'required|string',
     'anio' => 'required|integer|min:1900|max:' . (date('Y') + 5), // Cambiado
     'imagen' => 'nullable|url'
     ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $movie->update($validator->validated());

        return response()->json($movie);
    }

    public function destroy($id)
    {
        $movie = Movie::find($id);
        
        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], 404);
        }

        if ($movie->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $movie->delete();

        return response()->json(['message' => 'Movie deleted successfully']);
    }
}