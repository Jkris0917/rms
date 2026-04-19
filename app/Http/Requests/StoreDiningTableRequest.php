<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDiningTableRequest extends FormRequest
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
        return [
            'branch_id'    => ['required', 'integer', 'exists:branches,id'],
            'table_number' => [
                'required',
                'integer',
                'min:1',
                Rule::unique('dining_tables')->where('branch_id', $this->branch_id),
            ],
            'capacity'     => ['required', 'integer', 'min:1', 'max:50'],
            'status'       => ['required', Rule::in(['available', 'occupied', 'reserved', 'maintenance'])],
            'location'     => ['nullable', 'string', 'max:255'],
            'qr_code'      => ['nullable',  'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'table_number.unique' => 'This table number already exists in the selected branch.',
            'branch_id.exists'    => 'The selected branch does not exist.',
        ];
    }
}
