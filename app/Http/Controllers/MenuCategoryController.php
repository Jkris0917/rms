<?php

namespace App\Http\Controllers;

use App\Models\MenuCategory;
use App\Http\Requests\StoreMenuCategoryRequest;
use App\Http\Requests\UpdateMenuCategoryRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class MenuCategoryController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');

        $categories = MenuCategory::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->orderBy('sort_order', 'asc')
            ->orderBy('name', 'asc')
            ->paginate(10);

        return response()->json($categories);
    }

    public function store(StoreMenuCategoryRequest $request)
    {
        try {
            $data = $request->validated();

            // Generate slug if not provided
            if (empty($data['slug'])) {
                $data['slug'] = Str::slug($data['name']);
            }

            // Handle image upload
            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('menu-categories', 'public');
                $data['image'] = $path;
            }

            // Set default values
            $data['is_active'] = $data['is_active'] ?? true;
            $data['sort_order'] = $data['sort_order'] ?? 0;

            $category = MenuCategory::create($data);

            return response()->json([
                'message' => 'Category created successfully',
                'data' => $category
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating category: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to create category: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show(MenuCategory $menuCategory)
    {
        return response()->json($menuCategory);
    }

    public function update(UpdateMenuCategoryRequest $request, MenuCategory $menuCategory)
    {
        try {
            $data = $request->validated();

            // Generate slug if not provided
            if (empty($data['slug'])) {
                $data['slug'] = Str::slug($data['name']);
            }

            // Handle image upload
            if ($request->hasFile('image')) {
                // Delete old image
                if ($menuCategory->image) {
                    Storage::disk('public')->delete($menuCategory->image);
                }
                $path = $request->file('image')->store('menu-categories', 'public');
                $data['image'] = $path;
            }

            // Remove _method from data if present
            unset($data['_method']);

            $menuCategory->update($data);

            return response()->json([
                'message' => 'Category updated successfully',
                'data' => $menuCategory
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating category: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to update category: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy(MenuCategory $menuCategory)
    {
        try {
            // Delete associated image
            if ($menuCategory->image) {
                Storage::disk('public')->delete($menuCategory->image);
            }

            $menuCategory->delete();

            return response()->json([
                'message' => 'Category deleted successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting category: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to delete category'
            ], 500);
        }
    }
}
