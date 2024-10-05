import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUserLoginMutation } from "../../store/auth/authApiSlice";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import { setUserData } from "../../store/auth/authSlice";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useCustomNavigation();
  const dispatch = useDispatch();
  const [userLogin, { data: loginData, isLoading }] = useUserLoginMutation();

  useEffect(() => {
    if (loginData && !loginData.isAdmin) {
      localStorage.setItem("access_token", loginData.token);
      localStorage.setItem("user_id", loginData.userId);
      localStorage.setItem("name", loginData.name);
      dispatch(setUserData(loginData));
      navigate("/");
    }
    if (loginData && loginData.isAdmin) {
      localStorage.setItem("access_token", loginData.token);
      localStorage.setItem("user_id", loginData.userId);
      localStorage.setItem("name", loginData.name);
      dispatch(setUserData(loginData));
      navigate("/dashboard");
    }
  }, [loginData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    let payload = {
      email: email,
      password: password,
    };
    await userLogin(payload);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8 px-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">E-Kart</h2>
            </div>
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-gray-400">
              Start your website in seconds. Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-blue-500 hover:underline cusor-pointer"
              >
                Sign up
              </span>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-700 rounded bg-gray-800"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-400"
                >
                  Remember me
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in to your account
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-800">
        <img
          src="/images/shopping.jpg"
          alt="Login illustration"
          className="w-full h-[100%]"
        />
      </div>
    </div>
  );
}
