<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMenuCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $categoryId = $this->route('menu_category');

        // Get the category ID properly
        if ($categoryId instanceof \App\Models\MenuCategory) {
            $categoryId = $categoryId->id;
        }

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('menu_categories', 'name')->ignore($categoryId)
            ],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('menu_categories', 'slug')->ignore($categoryId)
            ],
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Category name is required',
            'name.unique' => 'Category name already exists',
            'slug.unique' => 'Slug already exists',
            'image.image' => 'File must be an image',
            'image.max' => 'Image size must not exceed 2MB',
        ];
    }

    protected function prepareForValidation()
    {
        // Convert string 'true'/'false' to boolean
        if ($this->has('is_active')) {
            $isActive = $this->input('is_active');
            if (is_string($isActive)) {
                $this->merge([
                    'is_active' => filter_var($isActive, FILTER_VALIDATE_BOOLEAN)
                ]);
            }
        }

        // Convert sort_order to integer
        if ($this->has('sort_order')) {
            $this->merge([
                'sort_order' => (int) $this->input('sort_order')
            ]);
        }
    }
}
