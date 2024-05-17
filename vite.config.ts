import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const vitePWA = VitePWA({
	registerType: 'autoUpdate',
	outDir: 'dist',
	filename: 'sw.js',
	manifest: {
		name: 'Sora Dice Tracker',
		short_name: 'SoraDice',
		description:
			'Sora Dice - трекер полезных привычек для повышения эффективности и саморазвития',
		theme_color: '#cbecf6',
		icons: [
			{
				src: '/icons/maskable_icon.png',
				sizes: '196x196',
				type: 'image/png',
				purpose: 'any maskable',
			},
			{
				src: '/icons/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/icons/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	},
})
export default defineConfig({
	plugins: [react(), TanStackRouterVite(), vitePWA],
	resolve: {
		alias: {
			'@': '/src',
		},
	},
})
