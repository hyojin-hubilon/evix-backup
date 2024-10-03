import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'
import packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 3000,
		proxy: {
			'/api':'https://dev.evix-dct.com/',
		},
	},
	plugins: [react()],
	build: {
		minify: 'terser',
		terserOptions: {
		  compress: {
			drop_console: true,
			drop_debugger: true
		  }
		}
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL("./src", import.meta.url)),
			'@assets': fileURLToPath(new URL("./src/assets", import.meta.url)),
			'@components': fileURLToPath(new URL("./src/components", import.meta.url)),
			'@layout': fileURLToPath(new URL("./src/layout", import.meta.url)),
			'@pages': fileURLToPath(new URL("./src/pages", import.meta.url)),
			'@types': fileURLToPath(new URL("./src/types", import.meta.url)),
			'@store': fileURLToPath(new URL("./src/store", import.meta.url)), 
			'@utils': fileURLToPath(new URL("./src/utils", import.meta.url)), 
			'@apis': fileURLToPath(new URL("./src/apis", import.meta.url)),
			'@api': fileURLToPath(new URL("./src/api", import.meta.url)),
			'@i18n': fileURLToPath(new URL("./src/i18n", import.meta.url)),
			'@context': fileURLToPath(new URL("./src/context", import.meta.url)),
		}
	},
	//전역사용 CSS
	css : {
        preprocessorOptions :{
            scss : {
                additionalData: `@import "./src/styles/main.scss";`,
            }
        }
    },
	define : {
		"import.meta.env.PACKAGE_VERSION" : JSON.stringify(packageJson.version)
	}
})
