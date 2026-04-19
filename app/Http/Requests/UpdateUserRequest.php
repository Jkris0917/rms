<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
        $userId = $this->route('user');

        return [
            // ── Account ──────────────────────────────────────────────
            'username' => ['sometimes', 'required', 'string', 'max:50', Rule::unique('users', 'username')->ignore($userId)],
            'email'    => ['sometimes', 'required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($userId)],
            'password' => ['nullable', 'confirmed', Password::min(8)->mixedCase()->numbers()],
            'role'     => ['sometimes', 'required', 'string', 'exists:roles,name'],

            // ── Profile — basic ───────────────────────────────────────
            'first_name'  => ['sometimes', 'required', 'string', 'max:100'],
            'middle_name' => ['nullable', 'string', 'max:100'],
            'last_name'   => ['sometimes', 'required', 'string', 'max:100'],
            'phone'       => ['sometimes', 'required', 'string', 'max:20'],
            'gender'      => ['sometimes', 'required', 'in:male,female,other'],
            'address'     => ['nullable', 'string', 'max:500'],
            'date_of_birth' => ['nullable', 'date', 'before:today'],
            'avatar'      => ['nullable', 'string'],

            // ── Emergency contact ─────────────────────────────────────
            'emergency_contact_name'         => ['nullable', 'string', 'max:150'],
            'emergency_contact_phone'        => ['nullable', 'string', 'max:20'],
            'emergency_contact_relationship' => ['nullable', 'string', 'max:100'],

            // ── Employment ────────────────────────────────────────────
            'position'          => ['nullable', 'string', 'max:100'],
            'hire_date'         => ['nullable', 'date'],
            'salary'            => ['nullable', 'numeric', 'min:0'],
            'employment_type'   => ['nullable', 'in:full_time,part_time,contractual'],
            'employee_id'       => ['nullable', 'string', 'max:50'],
            'employment_status' => ['nullable', 'in:active,inactive,on_leave'],

            // ── Schedule ──────────────────────────────────────────────
            'shift'       => ['nullable', 'in:morning,afternoon,night'],
            'work_days'   => ['nullable', 'array'],
            'work_days.*' => ['string', 'in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday'],
            'shift_start' => ['nullable', 'date_format:H:i'],
            'shift_end'   => ['nullable', 'date_format:H:i'],

            // ── Social ────────────────────────────────────────────────
            'facebook'  => ['nullable', 'url'],
            'instagram' => ['nullable', 'url'],
            'twitter'   => ['nullable', 'url'],

            // ── Customer fields ───────────────────────────────────────
            'dietary_restrictions' => ['nullable', 'string'],
            'allergies'            => ['nullable', 'string'],
            'notes'                => ['nullable', 'string'],
        ];
    }
}
