<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // Reset cached roles & permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // ── Permissions ───────────────────────────────────────────

        $permissions = [
            // Branch
            'view branches',
            'create branches',
            'edit branches',
            'delete branches',

            // Users & Staff
            'view users',
            'create users',
            'edit users',
            'delete users',

            // Menu
            'view menu',
            'create menu',
            'edit menu',
            'delete menu',

            // Orders
            'view orders',
            'create orders',
            'edit orders',
            'delete orders',
            'update order status',

            // Payments
            'view payments',
            'process payments',
            'refund payments',

            // Discounts
            'view discounts',
            'apply discounts',
            'manage discounts',

            // Tables
            'view tables',
            'manage tables',

            // Reservations
            'view reservations',
            'create reservations',
            'manage reservations',

            // Inventory
            'view inventory',
            'manage inventory',

            // Purchase Orders
            'view purchase orders',
            'create purchase orders',
            'manage purchase orders',

            // Suppliers
            'view suppliers',
            'manage suppliers',

            // Recipes
            'view recipes',
            'manage recipes',

            // Delivery
            'view deliveries',
            'manage deliveries',
            'update delivery status',

            // Shifts
            'view shifts',
            'manage shifts',

            // Reports
            'view reports',

            // Feedback
            'view feedback',
            'submit feedback',

            // Customer-facing
            'place orders',
            'view own orders',
            'make reservations',
            'view own reservations',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // ── Roles & permissions ───────────────────────────────────

        // Super Admin — full access
        Role::firstOrCreate(['name' => 'super_admin'])
            ->syncPermissions($permissions);

        // Manager — branch-level management
        Role::firstOrCreate(['name' => 'manager'])
            ->syncPermissions([
                'view branches',

                'view users',
                'create users',
                'edit users',

                'view menu',
                'create menu',
                'edit menu',
                'delete menu',

                'view orders',
                'edit orders',
                'update order status',

                'view payments',
                'process payments',
                'refund payments',

                'view discounts',
                'apply discounts',
                'manage discounts',

                'view tables',
                'manage tables',

                'view reservations',
                'manage reservations',

                'view inventory',
                'manage inventory',

                'view purchase orders',
                'create purchase orders',
                'manage purchase orders',

                'view suppliers',
                'manage suppliers',

                'view recipes',
                'manage recipes',

                'view deliveries',
                'manage deliveries',

                'view shifts',
                'manage shifts',

                'view reports',

                'view feedback',
            ]);

        // Waiter — front of house
        Role::firstOrCreate(['name' => 'waiter'])
            ->syncPermissions([
                'view menu',

                'view orders',
                'create orders',
                'edit orders',
                'update order status',

                'view tables',
                'manage tables',

                'view reservations',
                'create reservations',

                'view discounts',
                'apply discounts',
            ]);

        // Cashier — payments & billing
        Role::firstOrCreate(['name' => 'cashier'])
            ->syncPermissions([
                'view menu',

                'view orders',

                'view payments',
                'process payments',
                'refund payments',

                'view discounts',
                'apply discounts',

                'view reports',
            ]);

        // Chef — kitchen management
        Role::firstOrCreate(['name' => 'chef'])
            ->syncPermissions([
                'view menu',

                'view orders',
                'update order status',

                'view recipes',
                'manage recipes',

                'view inventory',
            ]);

        // Kitchen Staff — view orders only
        Role::firstOrCreate(['name' => 'kitchen_staff'])
            ->syncPermissions([
                'view menu',

                'view orders',
                'update order status',
            ]);

        // Delivery Driver — own deliveries only
        Role::firstOrCreate(['name' => 'delivery_driver'])
            ->syncPermissions([
                'view orders',

                'view deliveries',
                'update delivery status',
            ]);

        // Customer — self-service
        Role::firstOrCreate(['name' => 'customer'])
            ->syncPermissions([
                'place orders',
                'view own orders',
                'make reservations',
                'view own reservations',
                'submit feedback',
            ]);
    }
}
