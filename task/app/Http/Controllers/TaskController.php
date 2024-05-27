<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Log::info('user');
        return response()->json(request()->user()->tasks)->setStatusCode(200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'required|date',
        ]);

        return response()->json($request->user()->tasks()->create($request->all()))->setStatusCode(201);
    }

    /**
     * Show a single resource the specified resource.
     */
    public function show(Task $task)
    {
        return response()->json($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        //
        Gate::authorize('update', $task);

        $request->validate([
            'title' => 'string',
            'description' => 'string',
            'due_date' => 'date',
        ]);
        $task->update($request->all());
        return response()->json($task)->setStatusCode(200);
    }

    /**
     * Mark the task as completed.
     */
    public function completed(Request $request, Task $task)
    {
        //
        Gate::authorize('update', $task);

        $request->validate([
            'completed' => 'required|boolean',
        ]);

        Log::info($task);

        $task->update(["completed" => $request->completed]);

        return response()->json(["message" => "Updated Successfully", "task" => $task]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
        Gate::authorize('delete', $task);
        $task->delete();

        return response()->json($task, 204);
    }
}
