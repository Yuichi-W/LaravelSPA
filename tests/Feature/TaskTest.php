<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
//モデルをインポート
use App\Models\Task;

class TaskTest extends TestCase
{
    use RefreshDatabase;
    /**
     * @test
     */
    public function 一覧取得テスト()
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

    /**
     * @test
     */
    public function 登録テスト()
    {
        // 登録するデータの作成
        $data = [
            'title' => 'テスト投稿'
        ];
        // storeメソッドはpostで受け取るためpostJsonとする
        // post第２引数にデータを指定する
        $response = $this->postJson('api/tasks', $data);

        $response->assertStatus(201);
    }

    /**
     * @test
     */
    public function 更新テスト()
    {
        // 更新対象データを登録　
        $task = Task::factory()->create();
        // 登録されたデータのtitleを書き換える
        $task->title = 'タイトルの書き換え';
        // 更新はpatchJsonを使用する
        // タスクのIDを追加と、送信データはタスクの情報のみなので$task->toArray()とする
        $response = $this->patchJson("api/tasks/{$task->id}", $task->toArray());

        $response
            ->assertOk()
            ->assertJsonFragment($task->toArray());
    }

    /**
     * @test
     */
    public function 削除テスト()
    {
        // 削除対象データを登録　
        $tasks = Task::factory()->count(10)->create();
        // 削除はPOSTデータにので第２引数入らない＆deleteJsonとする
        $response = $this->deleteJson("api/tasks/1");
        $response->assertOk();

        // 一覧取得しカウントの確認
        $respons = $this->getJson("api/tasks");
        // 引数に期待するカウントを指定
        $respons->assertJsonCount($tasks->count() - 1);

        // $response
        //     ->assertOk()
        //     ->assertJsonFragment($task->toArray());
    }

    /**
     * @test
     */
    public function タイトル空テスト()
    {
        // 登録するデータの作成
        $data = [
            'title' => ''
        ];
        $response = $this->postJson('api/tasks', $data);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'title' => 'validation.required'
            ]);
    }

    /**
     * @test
     */
    public function タイトル256テスト()
    {
        // 登録するデータの作成
        $data = [
            'title' => str_repeat('あ', 256)
        ];
        $response = $this->postJson('api/tasks', $data);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'title' => 'validation.max.string'
            ]);
    }
}
