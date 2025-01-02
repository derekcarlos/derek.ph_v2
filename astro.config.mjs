import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://derek.ph',
	integrations: [
		starlight({
			title: 'Derek\'s Digital Garden',
			customCss: [
				"./src/styles/custom.css",
				"./src/styles/layout.css",
			],
			social: {
				blueSky: 'https://bsky.app/profile/derek.ph',
			},
			sidebar: [
				{
					label: "Start Here",
					items: [
						"start/here",
						"start/about",
						"start/now",
						"start/colophon"
					],
				},
				{
					label: "Patterns",
					items: [
						"patterns/oracle",
						"patterns/macOS",
						"patterns/windows",
						"patterns/linux",
					],
				},
				{
					label: "Notes",
					items: [
						"notes/start"
					],
				},
			],
			favicon: '/images/favicon.svg',
			head: [
				// Add ICO favicon fallback for Safari.
			    {
			      tag: 'link',
			      attrs: {
			        rel: 'icon',
        			href: '/images/favicon.ico',
        			sizes: '32x32',
			      },
			    },
			],
		}),
	],
});


