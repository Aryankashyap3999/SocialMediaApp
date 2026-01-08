export interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branded gradient */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 relative overflow-hidden">
        {/* Brand Logo */}
        <div className="absolute top-8 left-8">
          <h1 className="text-2xl font-bold text-white">Aptoodate</h1>
        </div>

        {/* Decorative circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-96 h-96">
            {/* Dotted circle paths */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
              {/* Outer arc */}
              <path
                d="M 50 200 Q 50 50 200 50"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                strokeDasharray="8 8"
              />
              {/* Middle arc */}
              <path
                d="M 100 280 Q 80 150 200 100 Q 320 80 350 200"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                strokeDasharray="8 8"
              />
              {/* Inner arc */}
              <path
                d="M 120 320 Q 100 200 200 150 Q 300 120 340 220"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
                strokeDasharray="8 8"
              />
            </svg>
            
            {/* Floating dots */}
            <div className="absolute top-8 left-20 w-3 h-3 bg-white/60 rounded-full"></div>
            <div className="absolute top-16 right-24 w-4 h-4 bg-white/80 rounded-full"></div>
            <div className="absolute top-32 left-8 w-3 h-3 bg-white/50 rounded-full"></div>
            <div className="absolute top-40 right-12 w-3 h-3 bg-white/70 rounded-full"></div>
            <div className="absolute bottom-32 left-16 w-4 h-4 bg-white/60 rounded-full"></div>
            <div className="absolute bottom-24 right-20 w-3 h-3 bg-white/50 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white/90 rounded-full"></div>
          </div>
        </div>

        {/* Tagline */}
        <div className="absolute bottom-12 left-0 right-0 text-center">
          <p className="text-white/90 text-lg font-medium">Secure. Simple. Seamless.</p>
        </div>
      </div>

      {/* Right Panel - Form Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-12 lg:px-16 bg-white">
        <div className="max-w-md mx-auto w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-600 mb-2">Aptoodate</h1>
            <p className="text-gray-600 text-sm">Secure. Simple. Seamless.</p>
          </div>

          {/* Form Content */}
          {children}

          {/* Footer Links */}
          <div className="mt-8 flex items-center justify-center gap-4 text-xs text-gray-500">
            <a href="/privacy" className="hover:text-gray-700 hover:underline">Privacy policy</a>
            <span>•</span>
            <a href="/terms" className="hover:text-gray-700 hover:underline">Terms</a>
          </div>

          {/* Security badge */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>256-bit SSL Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};