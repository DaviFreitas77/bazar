<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Colors extends Model
{
   protected $table = 'colors';
   protected $fillable = ['name','hexadecimal'];
   public $timestamps = false;
}
