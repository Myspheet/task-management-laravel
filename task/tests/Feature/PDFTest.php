<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class PDFTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Create a user and authenticate with Sanctum
        $this->user = User::factory()->create();
        Sanctum::actingAs($this->user, ['*']);
    }

    /**
     * A basic feature test example.
     */
    public function test_it_can_generate_pdf(): void
    {
        Task::factory()->count(3)->create(['user_id' => $this->user->id]);
        $response = $this->getJson('/api/download/tasks');

        $response->assertStatus(200);

        $name = $this->user->name;

        $response->assertHeader('content-disposition', "attachment; filename=$name.pdf");

    }
}
