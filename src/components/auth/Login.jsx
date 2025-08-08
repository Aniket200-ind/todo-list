//! File: src/components/auth/Login.jsx

import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function Login() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Signed in successfully 🚀");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Sign-in failed", {
        description: error.message || "Please try again.",
      });
    }
  };

  return (
    <section className="flex justify-center sm:min-h-[80vh] sm:items-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-light-secondary-background dark:bg-dark-secondary-background p-8 md:p-10 rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-3xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              {/* Google Logo */}
              <div className="bg-light-accent/20 dark:bg-dark-accent/20 p-4 rounded-2xl">
                <img
                  src="/google-logo.svg"
                  alt="Google Logo"
                  className="w-8 h-8 md:w-10 md:h-10"
                />
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text mb-2">
              Welcome Back
            </h1>
            <p className="text-light-muted dark:text-dark-muted text-sm md:text-base">
              Sign in to unlock your dashboard
            </p>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            aria-label="Sign in with Google"
            type="button"
            className="w-full bg-light-accent dark:bg-dark-accent text-light-accent-text dark:text-dark-accent-text font-semibold py-3 md:py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-light-accent/30 dark:focus:ring-dark-accent/30 cursor-pointer"
          >
            <span className="flex items-center justify-center gap-3">
              <span className="text-lg">🔐</span>
              <span className="text-sm md:text-base">Sign in with Google</span>
            </span>
          </button>

          {/* Privacy Notice */}
          <div className="mt-6 pt-6 border-t border-light-muted/20 dark:border-dark-muted/20">
            <p className="text-xs md:text-sm text-light-muted dark:text-dark-muted text-center leading-relaxed">
              <span className="inline-block mb-1">🔒 Your privacy matters</span>
              <br />
              We only ask for basic info — your data stays private.
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-light-muted dark:text-dark-muted">
            By signing in, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </section>
  );
}
