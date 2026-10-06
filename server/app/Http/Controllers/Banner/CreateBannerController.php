<?php

namespace App\Http\Controllers\Banner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Banner\StoreBannerRequest;
use App\Http\Services\UploadService;
use App\Models\BannerModel;

class CreateBannerController extends Controller
{

    public function __construct(private UploadService $uploadService)
    {
        $this->uploadService = $uploadService;
    }

    public function __invoke(StoreBannerRequest $request)
    {
        $data = $request->validated();

        
        $upload = $this->uploadService->uploadImage($data['image'], 'banners');


        $banner = new BannerModel();
        $banner->name = $data['name'];
        $banner->image = $upload->getData()->path;
        $banner->link = $data['link'] ?? null;
        $banner->status = $data['status'] ?? 1;
        $banner->save();


        return response()->json(['message' => 'Banner created successfully', 'banner' => $data], 201);
    }
}
