<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    protected $table = "tb_password_resets";
    protected $fillable = ['email_user','token_password_reset'];
    public $timestamps = false;
}
