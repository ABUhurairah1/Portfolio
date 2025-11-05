import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Suppress source map warnings for missing .map files
    {
      name: 'suppress-sourcemap-warnings',
      enforce: 'pre',
      configureServer(server) {
        // Intercept source map requests and return 404 silently
        server.middlewares.use((req, res, next) => {
          if (req.url?.endsWith('.map')) {
            res.statusCode = 404
            res.end()
            return
          }
          next()
        })
        
        // Suppress source map warnings in logger
        const originalWarn = server.config.logger.warn.bind(server.config.logger)
        const originalError = server.config.logger.error.bind(server.config.logger)
        
        server.config.logger.warn = (msg, options) => {
          if (typeof msg === 'string' && 
              (msg.includes('Failed to load source map') || 
               msg.includes('sourceMappingURL'))) {
            return // Suppress source map warnings
          }
          originalWarn(msg, options)
        }
        
        server.config.logger.error = (msg, options) => {
          if (typeof msg === 'string' && 
              (msg.includes('Failed to load source map') || 
               (msg.includes('.map') && msg.includes('ENOENT')))) {
            return // Suppress source map errors
          }
          originalError(msg, options)
        }
      },
      transform(code, id) {
        // Remove source map references from CSS files
        if (id.endsWith('.css') && code.includes('sourceMappingURL')) {
          return code.replace(/\/\*# sourceMappingURL=.*?\*\/\s*$/gm, '')
        }
        // Remove source map references from JS files
        if (id.match(/\.(js|mjs)$/) && code.includes('sourceMappingURL')) {
          return code.replace(/\/\/# sourceMappingURL=.*$/gm, '')
        }
      }
    }
  ],
  build: {
    sourcemap: false,
  },
  css: {
    devSourcemap: false
  },
  // Reduce console noise - these source map warnings are harmless
  // They occur because some CSS/JS assets reference .map files that don't exist
  logLevel: 'warn',
  server: {
    // Suppress source map related errors
    fs: {
      strict: false
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      // Ignore source map references in dependencies
      sourcemap: false
    }
  }
})
