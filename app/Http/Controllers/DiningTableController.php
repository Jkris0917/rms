<?php

namespace App\Http\Controllers;

use App\Models\DiningTable;
use App\Http\Requests\StoreDiningTableRequest;
use App\Http\Requests\UpdateDiningTableRequest;
use App\Http\Resources\DiningTableResource;
use Illuminate\Http\Request;

class DiningTableController extends Controller
{
    /**
     * Display a paginated, searchable listing.
     */
    public function index(Request $request)
    {
        $tables = DiningTable::query()
            ->when(
                $request->search,
                fn($q, $s) =>
                $q->where('table_number', 'like', "%{$s}%")
                    ->orWhere('location', 'like', "%{$s}%")
            )
            ->when(
                $request->branch_id,
                fn($q, $id) =>
                $q->where('branch_id', $id)
            )
            ->orderBy('table_number')
            ->paginate(15)
            ->withQueryString();

        return DiningTableResource::collection($tables);
    }

    /**
     * Store a newly created table.
     */
    public function store(StoreDiningTableRequest $request)
    {
        $table = DiningTable::create($request->validated());

        return (new DiningTableResource($table))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display a single table.
     */
    public function show(DiningTable $table)
    {
        return new DiningTableResource($table->load('branch'));
    }

    /**
     * Update the specified table.
     */
    public function update(UpdateDiningTableRequest $request, DiningTable $diningTable)
    {
        $diningTable->update($request->validated());

        return new DiningTableResource($diningTable->fresh());
    }

    /**
     * Remove the specified table.
     */
    public function destroy(DiningTable $table)
    {
        $table->delete();

        return response()->json(['message' => 'Table deleted successfully.']);
    }
}
