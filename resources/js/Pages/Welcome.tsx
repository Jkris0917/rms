import CTASection from '@/Components/landing/CTASection';
import FeaturesSection from '@/Components/landing/FeaturesSection';
import Footer from '@/Components/landing/Footer';
import HeroSection from '@/Components/landing/HeroSection';
import Navbar from '@/Components/landing/Navbar';
import RolesSection from '@/Components/landing/RolesSection';
import StatsSection from '@/Components/landing/StatsSection';
import TestimonialsSection from '@/Components/landing/TestimonialsSection';
import { Head } from '@inertiajs/react';


interface WelcomeProps {
    auth: {
        user?: {
            roles?: string[];
            name?: string;
        };
    };
}

const getDashboardRoute = (user: any): string => {
    if (!user || !user.roles) return '/dashboard';
    const roles = Array.isArray(user.roles) ? user.roles : [];
    if (roles.includes('super_admin')) return '/superadmin/dashboard';
    if (roles.includes('manager')) return '/manager/dashboard';
    if (roles.includes('cashier')) return '/cashier/dashboard';
    if (roles.includes('waiter')) return '/waiter/dashboard';
    if (roles.includes('chef')) return '/chef/dashboard';
    if (roles.includes('kitchen_staff')) return '/kitchen_staff/dashboard';
    if (roles.includes('delivery_driver')) return '/delivery_driver/dashboard';
    if (roles.includes('customer')) return '/customer/dashboard';
    return '/dashboard';
};

export default function Welcome({ auth }: WelcomeProps) {
    const currentUser = auth?.user ?? null;
    const isLoggedIn = Boolean(currentUser);
    const dashboardRoute = getDashboardRoute(currentUser);

    return (
        <>
            <Head title="RestoHub — Restaurant Management Platform" />

            <div className="font-sans antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
                <Navbar auth={auth} />

                <main>
                    <HeroSection isLoggedIn={isLoggedIn} dashboardRoute={dashboardRoute} />
                    <StatsSection />
                    <FeaturesSection />
                    <RolesSection />
                    <TestimonialsSection />
                    <CTASection isLoggedIn={isLoggedIn} dashboardRoute={dashboardRoute} />
                </main>

                <Footer />
            </div>
        </>
    );
}
