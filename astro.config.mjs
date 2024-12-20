import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://derek.ph',
	integrations: [
		starlight({
			title: 'Derek\'s Docs',
			customCss: [
				"./src/styles/custom.css",
				"./src/styles/layout.css",
			],
			social: {
				blueSky: 'https://bsky.app/profile/derek.ph',
			},
			sidebar: [
				{
					label: 'Start Here',
					autogenerate: { directory: 'start-here' },
					// items: [
					// 	// Each item here is one entry in the navigation menu.
					// 	{ label: 'Example Guide', slug: 'guides/example' },
					// ],
				},
				{
					label: 'macOS',
					autogenerate: { directory: 'macOS' },
				},
				{
					label: 'Notes',
					autogenerate: { directory: 'notes' },
				},
				{
					label: 'Oracle',
					items: [
						{ 
							label: "WebLogic",
							items: [
								{ label: "Why WLST?", link: "/weblogic/why-wlst/" },
								{ label: "Application Continuity - Hands On", link: "/weblogic/application-continuity-hands-on/" },
								{ label: "Create Users", link: "/weblogic/create-users/" },
								{ label: "Silent Install", link: "/weblogic/weblogic-12c-silent-install/" },
							],
						},
						{
							label: "Service Bus",
							items: [
								{ label: "Increase JMS Adapter Max Capacity", link: "/service-bus/increase-jms-adapter-max-capacity/" },
								{ label: "Update OSB Data Source Connections", link: "/service-bus/osb-data-source-update/" },
								{ label: "Run Remote Diagnostic Agent on OSB", link: "/service-bus/remote-diagnostic-agent-osb/" },
							],
						},
					],
				},
				{
					label: 'Homelab',
					autogenerate: { directory: 'homelab' },
				},
				{
					label: 'Windows',
					autogenerate: { directory: 'windows' },
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


