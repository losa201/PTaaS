
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __WS_TOKEN__: JSON.stringify(process.env.WS_TOKEN || ""),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React and dependencies
          vendor: ['react', 'react-dom', 'react-router-dom'],
          
          // UI Libraries - Radix UI components
          radix: [
            '@radix-ui/react-dialog', 
            '@radix-ui/react-select', 
            '@radix-ui/react-accordion',
            '@radix-ui/react-tabs',
            '@radix-ui/react-popover',
            '@radix-ui/react-dropdown-menu'
          ],
          
          // Animation and visual libraries
          ui: ['framer-motion', 'lucide-react'],
          
          // Charts and visualization
          charts: ['recharts'],
          
          // Form and validation
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          
          // Utilities and smaller libraries
          utils: ['clsx', 'tailwind-merge', 'date-fns', 'class-variance-authority'],
          
          // React Query
          query: ['@tanstack/react-query']
        },
      },
    },
    
    // Performance optimizations
    chunkSizeWarningLimit: 1600,
    sourcemap: mode === 'development',
    minify: mode === 'production' ? 'terser' : false,
    terserOptions: mode === 'production' ? {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    } : undefined,
    
    // Asset optimization
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
  },
  
  // CSS optimization
  css: {
    devSourcemap: mode === 'development',
    modules: {
      localsConvention: 'camelCase',
    },
  },
  
  // Ensure proper environment variable handling
  envPrefix: 'VITE_',
}));
