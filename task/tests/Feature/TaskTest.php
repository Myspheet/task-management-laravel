<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Create a user and authenticate with Sanctum
        $this->user = User::factory()->create();
        Sanctum::actingAs($this->user, ['*']);
    }

    /** @test */
    public function it_can_list_tasks()
    {
        // Arrange
        Task::factory()->count(3)->create(['user_id' => $this->user->id]);

        // Act
        $response = $this->getJson('/api/tasks');

        // Assert
        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    /** @test */
    public function it_can_create_a_task()
    {
        // Arrange
        $taskData = [
            'title' => 'Test Task',
            'description' => 'Test Description',
            'due_date' => '2024-06-01',
        ];

        // Act
        $response = $this->postJson('/api/tasks', $taskData);

        // Assert
        $response->assertStatus(201)
            ->assertJsonFragment($taskData);
        $this->assertDatabaseHas('tasks', $taskData);
    }

    /** @test */
    public function it_can_show_a_task()
    {
        // Arrange
        $task = Task::factory()->create(['user_id' => $this->user->id]);

        // Act
        $response = $this->getJson("/api/tasks/{$task->id}");

        // Assert
        $response->assertStatus(200)
            ->assertJsonFragment([
                'title' => $task->title,
                'description' => $task->description,
            ]);
    }

    /** @test */
    public function it_can_update_a_task()
    {
        // Arrange
        $task = Task::factory()->create(['user_id' => $this->user->id]);
        $updatedData = [
            'title' => 'Updated Task',
            'description' => 'Updated Description',
        ];

        // Act
        $response = $this->putJson("/api/tasks/{$task->id}", $updatedData);

        // Assert
        $response->assertStatus(200)
            ->assertJsonFragment($updatedData);
        $this->assertDatabaseHas('tasks', $updatedData);
    }

    /** @test */
    public function it_can_delete_a_task()
    {
        // Arrange
        $task = Task::factory()->create(['user_id' => $this->user->id]);

        // Act
        $response = $this->deleteJson("/api/tasks/{$task->id}");

        // Assert
        $response->assertStatus(204);
        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

//    /** @test */
//    public function it_cannot_access_tasks_without_authentication()
//    {
//        // Arrange
//        Sanctum::actingAs();
//
//        // Act
//        $response = $this->getJson('/api/tasks');
//
//        // Assert
//        $response->assertStatus(401);
//    }
}
