<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDiningTableRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $tableId = $this->route('dining_table')?->id;

        return [
            'branch_id'    => ['sometimes', 'integer', 'exists:branches,id'],
            'table_number' => [
                'sometimes',
                'integer',
                'min:1',
                Rule::unique('dining_tables')
                    ->where('branch_id', $this->branch_id ?? $this->route('dining_table')?->branch_id)
                    ->ignore($tableId),
            ],
            'capacity'     => ['sometimes', 'integer', 'min:1', 'max:50'],
            'status'       => ['sometimes', Rule::in(['available', 'occupied', 'reserved', 'maintenance'])],
            'location'     => ['sometimes', 'nullable', 'string', 'max:255'],
            'qr_code'      => ['sometimes', 'nullable', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'table_number.unique' => 'This table number already exists in the selected branch.',
        ];
    }
}
