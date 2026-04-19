<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Profile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // ── 1. Roles & permissions first (always) ─────────────────
        $this->call(RolePermissionSeeder::class);

        // ── 2. Super admin ────────────────────────────────────────
        $superAdmin = User::factory()->create([
            'username' => 'superadmin',
            'email'    => 'superadmin@restaurant.com',
            'password' => Hash::make('password'),
        ]);

        $superAdmin->assignRole('super_admin');

        Profile::create([
            'user_id'           => $superAdmin->id,
            'first_name'        => 'Super',
            'last_name'         => 'Admin',
            'phone'             => '09000000001',
            'position'          => 'System Administrator',
            'employment_type'   => 'full_time',
            'employment_status' => 'active',
            'hire_date'         => now(),
        ]);

        // ── 3. Manager ────────────────────────────────────────────
        $manager = User::factory()->create([
            'username' => 'manager',
            'email'    => 'manager@restaurant.com',
            'password' => Hash::make('password'),
        ]);

        $manager->assignRole('manager');

        Profile::create([
            'user_id'           => $manager->id,
            'first_name'        => 'Branch',
            'last_name'         => 'Manager',
            'phone'             => '09000000002',
            'position'          => 'Branch Manager',
            'employment_type'   => 'full_time',
            'employment_status' => 'active',
            'hire_date'         => now(),
        ]);

        // ── 4. Waiter ─────────────────────────────────────────────
        $waiter = User::factory()->create([
            'username' => 'waiter',
            'email'    => 'waiter@restaurant.com',
            'password' => Hash::make('password'),
        ]);

        $waiter->assignRole('waiter');

        Profile::create([
            'user_id'           => $waiter->id,
            'first_name'        => 'Juan',
            'last_name'         => 'Dela Cruz',
            'phone'             => '09000000003',
            'position'          => 'Waiter',
            'employment_type'   => 'full_time',
            'employment_status' => 'active',
            'shift'             => 'morning',
            'shift_start'       => '07:00',
            'shift_end'         => '15:00',
            'work_days'         => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            'hire_date'         => now(),
        ]);

        // ── 5. Cashier ────────────────────────────────────────────
        $cashier = User::factory()->create([
            'username' => 'cashier',
            'email'    => 'cashier@restaurant.com',
            'password' => Hash::make('password'),
        ]);

        $cashier->assignRole('cashier');

        Profile::create([
            'user_id'           => $cashier->id,
            'first_name'        => 'Maria',
            'last_name'         => 'Santos',
            'phone'             => '09000000004',
            'position'          => 'Cashier',
            'employment_type'   => 'full_time',
            'employment_status' => 'active',
            'shift'             => 'morning',
            'shift_start'       => '07:00',
            'shift_end'         => '15:00',
            'work_days'         => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            'hire_date'         => now(),
        ]);

        // ── 6. Chef ───────────────────────────────────────────────
        $chef = User::factory()->create([
            'username' => 'chef',
            'email'    => 'chef@restaurant.com',
            'password' => Hash::make('password'),
        ]);

        $chef->assignRole('chef');

        Profile::create([
            'user_id'           => $chef->id,
            'first_name'        => 'Carlo',
            'last_name'         => 'Reyes',
            'phone'             => '09000000005',
            'position'          => 'Head Chef',
            'employment_type'   => 'full_time',
            'employment_status' => 'active',
            'shift'             => 'morning',
            'shift_start'       => '06:00',
            'shift_end'         => '14:00',
            'work_days'         => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            'hire_date'         => now(),
        ]);

        // ── 7. Kitchen staff ──────────────────────────────────────
        $kitchen = User::factory()->create([
            'username' => 'kitchen',
            'email'    => 'kitchen@restaurant.com',
            'password' => Hash::make('password'),
        ]);

        $kitchen->assignRole('kitchen_staff');

        Profile::create([
            'user_id'           => $kitchen->id,
            'first_name'        => 'Pedro',
            'last_name'         => 'Lim',
            'phone'             => '09000000006',
            'position'          => 'Kitchen Staff',
            'employment_type'   => 'part_time',
            'employment_status' => 'active',
            'shift'             => 'afternoon',
            'shift_start'       => '14:00',
            'shift_end'         => '22:00',
            'work_days'         => ['Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            'hire_date'         => now(),
        ]);

        // ── 8. Delivery driver ────────────────────────────────────
        $driver = User::factory()->create([
            'username' => 'driver',
            'email'    => 'driver@restaurant.com',
            'password' => Hash::make('password'),
        ]);

        $driver->assignRole('delivery_driver');

        Profile::create([
            'user_id'           => $driver->id,
            'first_name'        => 'Ramon',
            'last_name'         => 'Cruz',
            'phone'             => '09000000007',
            'position'          => 'Delivery Driver',
            'employment_type'   => 'full_time',
            'employment_status' => 'active',
            'shift'             => 'afternoon',
            'shift_start'       => '11:00',
            'shift_end'         => '20:00',
            'work_days'         => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            'hire_date'         => now(),
        ]);

        // ── 9. Customer ───────────────────────────────────────────
        $customer = User::factory()->create([
            'username' => 'customer',
            'email'    => 'customer@restaurant.com',
            'password' => Hash::make('password'),
        ]);

        $customer->assignRole('customer');

        Profile::create([
            'user_id'              => $customer->id,
            'first_name'           => 'Ana',
            'last_name'            => 'Garcia',
            'phone'                => '09000000008',
            'dietary_restrictions' => 'No pork',
            'allergies'            => 'Shellfish',
        ]);
    }
}
