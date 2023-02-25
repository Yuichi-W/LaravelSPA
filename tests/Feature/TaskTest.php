<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
//モデルをインポート
use App\Models\Task;

class TaskTest extends TestCase
{
    use RefreshDatabase;
    /**
     * @test
     */
    public function 一覧取得()
    {
        //DBにテスト用にデータ10件を追加
        $tasks = Task::factory()->count(10)->create();
        // 取得するデータはJSONなのでgetJsonを使用
        $response = $this->getJson('api/tasks');
        // 取得データの確認
        // dd($response->json());

        //登録と取得のデータ数が同じであるかの確認
        $response
            ->assertOk()
            ->assertJsonCount($tasks->count());
    }
}
