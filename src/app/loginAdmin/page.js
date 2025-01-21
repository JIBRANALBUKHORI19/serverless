import { login } from './actions';

export default function LoginPage({ searchParams }) {
  const message = searchParams.message;
  console.log(message);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
        <div className="flex flex-col items-center">
          <img
            src="https://res.cloudinary.com/dwmy3owh8/image/upload/v1734459517/logo_aja_wtwiwu.png" // Ubah sesuai path logo Anda
            alt="Logo"
            className="w-20 h-20 mb-4"
          />
          <h2 className="text-center text-3xl font-bold text-green-800">LOGIN</h2>
        </div>

        {searchParams?.message && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-md text-center">
            {searchParams.message}
          </div>
        )}

        <form className="space-y-6" action={login}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-4 rounded-xl hover:from-green-600 hover:to-green-800 transition duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
