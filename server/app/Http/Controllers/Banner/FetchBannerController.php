<?php

namespace App\Http\Controllers\Banner;

use App\Http\Controllers\Controller;
use App\Models\BannerModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FetchBannerController extends Controller
{
    public function __invoke(Request $request)
    {
        $banners = BannerModel::all()->map(function (BannerModel $banner) {
            $banner->image = url(Storage::url($banner->image));

            return $banner;
        });

        return response()->json(['banners' => $banners], 200);
    }
}
