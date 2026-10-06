<?php

namespace App\Http\Services;

class UploadService
{
    public function uploadImage($image, $folder)
    {
        $path = $image->store($folder, 'public');
        
        return response()->json([
            'url' => asset('storage/' . $path),
            'path' => $path
        ]);
    }
}
