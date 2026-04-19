<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // Basic info
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('phone', 20)->nullable();
            $table->string('avatar')->nullable();
            $table->string('address')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();

            // Emergency contact (both staff & customers)
            $table->string('emergency_contact_name')->nullable();
            $table->string('emergency_contact_phone', 20)->nullable();
            $table->string('emergency_contact_relationship')->nullable();

            // Employment info (staff only — null for customers)
            $table->string('position')->nullable();
            $table->date('hire_date')->nullable();
            $table->decimal('salary', 10, 2)->nullable();
            $table->enum('employment_type', ['full_time', 'part_time', 'contractual', 'probationary'])->nullable();
            $table->string('employee_id')->unique()->nullable();
            $table->enum('employment_status', ['active', 'inactive', 'terminated', 'resigned'])->nullable()->default('active');

            // Schedule / shift info (staff only — null for customers)
            $table->enum('shift', ['morning', 'afternoon', 'evening', 'graveyard'])->nullable();
            $table->json('work_days')->nullable(); // e.g. ["Mon","Tue","Wed"]
            $table->time('shift_start')->nullable();
            $table->time('shift_end')->nullable();

            // Social media links (both)
            $table->string('facebook')->nullable();
            $table->string('instagram')->nullable();
            $table->string('twitter')->nullable();

            // Customer-specific
            $table->text('dietary_restrictions')->nullable();
            $table->text('allergies')->nullable();
            $table->text('notes')->nullable(); // staff notes about the customer

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
