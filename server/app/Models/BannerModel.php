<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BannerModel extends Model
{
    protected $table = 'banners';
    protected $fillable = ["name", "image", "link", "status"];

    public $timestamps = false;
}
