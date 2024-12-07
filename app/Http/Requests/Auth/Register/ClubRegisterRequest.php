<?php

namespace App\Http\Requests\Auth\Register;

use Illuminate\Foundation\Http\FormRequest;

class ClubRegisterRequest extends FormRequest
{
    protected $fillable = [
        'name',
        'email',
        'cnpj',
        'trading_name',
        'state',
        'city',
        'phonenumber',
    ];
    
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:users,email'],
            'cnpj' => ['required', 'unique:clubs,cnpj', 'regex:/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/'],
            'trading_name' => ['required', 'unique:clubs,trading_name'],
            'state' => ['required'],
            'city' => ['required'],
            'phonenumber' => ['required', 'unique:clubs,phonenumber'],
        ];
    }
}
