import { useState, useEffect } from "react";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import { useUserSignupMutation } from "../../store/auth/authApiSlice";
export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useCustomNavigation();
  const [userSignup, { data: signupData, isLoading }] = useUserSignupMutation();
  useEffect(() => {
    if (signupData) {
      navigate("/login");
    }
  }, [signupData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      name: username,
      email: email,
      password: password,
      phone: phoneNumber,
    };
    await userSignup(payload);
    // Handle signup logic here
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
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-gray-400">
              Create your account to get started. Already have an account?{" "}
              <span className="text-blue-500 hover:underline cursor-pointer">
                Log in
              </span>
              .
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your username/name"
              />
            </div>
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
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Phone Number"
              />
            </div>
            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-700 rounded bg-gray-800"
              />
              <label
                htmlFor="agree-terms"
                className="ml-2 block text-sm text-gray-400"
              >
                I agree to the terms and conditions
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-800">
        <img
          src="/images/shopping.jpg"
          alt="Signup illustration"
          className="w-full h-[100%]"
        />
      </div>
    </div>
  );
}
