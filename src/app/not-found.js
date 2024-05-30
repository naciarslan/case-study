import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl font-semibold text-gray-600 mb-4">
          Page Not Found
        </p>
        <p className="text-gray-500">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link href="/admin">
          <span className="text-blue-500 mt-4 block cursor-pointer">
            Back to Home
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
