// app/(dashboard)/dashboard/page.tsx

export default function DashboardPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-4 text-gray-600">
                Welcome to the TU Pulse dashboard! Here you can manage your incidents,
                view analytics, and configure your settings.
            </p>
        </div>
    );
}