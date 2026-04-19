const roles = [
    {
        title: 'Super Admin',
        route: '/superadmin/dashboard',
        icon: '👑',
        description: 'Full system access across all branches. Manage users, roles, system settings, and view comprehensive analytics.',
        permissions: ['All branches', 'User management', 'System settings', 'Full analytics'],
        color: 'from-violet-500 to-purple-600',
        bg: 'bg-violet-50 dark:bg-violet-950/30',
        border: 'border-violet-200/60 dark:border-violet-800/30',
    },
    {
        title: 'Manager',
        route: '/manager/dashboard',
        icon: '🏢',
        description: 'Branch-level control over staff, menus, inventory, and daily operations. Approve purchase orders and review reports.',
        permissions: ['Branch operations', 'Staff oversight', 'Menu management', 'PO approval'],
        color: 'from-blue-500 to-indigo-600',
        bg: 'bg-blue-50 dark:bg-blue-950/30',
        border: 'border-blue-200/60 dark:border-blue-800/30',
    },
    {
        title: 'Cashier',
        route: '/cashier/dashboard',
        icon: '💳',
        description: 'Process payments, apply discounts, handle split bills, and manage daily cash summaries.',
        permissions: ['Process payments', 'Apply discounts', 'Cash reports', 'Order view'],
        color: 'from-emerald-500 to-teal-600',
        bg: 'bg-emerald-50 dark:bg-emerald-950/30',
        border: 'border-emerald-200/60 dark:border-emerald-800/30',
    },
    {
        title: 'Waiter',
        route: '/waiter/dashboard',
        icon: '🍽️',
        description: 'Take orders tableside, manage modifiers, update order status, and coordinate with the kitchen.',
        permissions: ['Take orders', 'Table management', 'Modifiers', 'Status updates'],
        color: 'from-orange-500 to-amber-600',
        bg: 'bg-orange-50 dark:bg-orange-950/30',
        border: 'border-orange-200/60 dark:border-orange-800/30',
    },
    {
        title: 'Chef / Kitchen Staff',
        route: '/chef/dashboard',
        icon: '👨‍🍳',
        description: 'View incoming orders on the kitchen display, update preparation status, and manage queue efficiently.',
        permissions: ['Kitchen display', 'Order queue', 'Status updates', 'Recipe view'],
        color: 'from-rose-500 to-red-600',
        bg: 'bg-rose-50 dark:bg-rose-950/30',
        border: 'border-rose-200/60 dark:border-rose-800/30',
    },
    {
        title: 'Delivery Driver',
        route: '/delivery_driver/dashboard',
        icon: '🛵',
        description: 'Receive delivery assignments, update delivery status in real-time, and track completed deliveries.',
        permissions: ['Delivery queue', 'Status tracking', 'Route info', 'History'],
        color: 'from-cyan-500 to-sky-600',
        bg: 'bg-cyan-50 dark:bg-cyan-950/30',
        border: 'border-cyan-200/60 dark:border-cyan-800/30',
    },
];

export default function RolesSection() {
    return (
        <section id="roles" className="py-24 bg-white dark:bg-zinc-900">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                        <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 tracking-wide uppercase">Role-Based Access</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
                        Every Role Gets<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                            Their Own View
                        </span>
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-lg">
                        Tailored dashboards for each team member. Everyone sees exactly what they need — nothing more, nothing less.
                    </p>
                </div>

                {/* Roles Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {roles.map((role) => (
                        <div
                            key={role.title}
                            className={`group relative rounded-2xl p-6 border ${role.bg} ${role.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="text-3xl mb-2">{role.icon}</div>
                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{role.title}</h3>
                                </div>
                                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                            </div>

                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{role.description}</p>

                            {/* Permissions Tags */}
                            <div className="flex flex-wrap gap-1.5">
                                {role.permissions.map((perm) => (
                                    <span
                                        key={perm}
                                        className="text-[11px] px-2.5 py-1 rounded-full bg-white/70 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-400 font-medium"
                                    >
                                        {perm}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Customer note */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-zinc-400 dark:text-zinc-500">
                        + <strong className="text-zinc-600 dark:text-zinc-400">Customer</strong> role for online ordering portal access
                    </p>
                </div>
            </div>
        </section>
    );
}
