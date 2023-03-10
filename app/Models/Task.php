<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    // 更新するカラムを指定
    protected $fillable = [
        'title',
        'is_done',
        'user_id',
    ];
    //カラムの型の指定
    protected $casts = [
        'is_done' => 'bool',
        'user_id' => 'int',
    ];
}
