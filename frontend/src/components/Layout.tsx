import { Outlet } from 'react-router';


const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
