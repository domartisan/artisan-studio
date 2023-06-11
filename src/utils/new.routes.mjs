import fs from 'node:fs/promises'
import path from 'node:path'

const generatePages = async () => {
	// Read the routes.json file
	const routesData = await fs.readFile('./routes.json', 'utf8')
	const MyRoutes = JSON.parse(routesData)
	const CleanRoutes = JSON.stringify(MyRoutes)
		.split('templates/')
		.join('')
		.split('html')
		.join('astro')
	const routes = JSON.parse(CleanRoutes)

	// Generate a page for each route
	for (const route of routes) {
		const routePath = path.join('./pages', route.PATH)
		const filePath = routePath.replace(/\.html$/, '.astro')

		// Read the HTML content from the HTML API directory
		const htmlFilePath = path.join(
			'./src/pages/api/v1/pattern',
			`${route.PATH}.html`
		)

		// Create the directory if it doesn't exist
		const dirPath = path.dirname(routePath)
		await fs.mkdir(dirPath, { recursive: true })

		// Check if the HTML file exists before reading it
		if (await fileExists(htmlFilePath)) {
			const htmlData = await fs.readFile(htmlFilePath, 'utf8')

			const template = `
      ---
      import Frame from "@/layouts/frame.astro";
      import EdgComponent from "@/components/Frame/EdgComponent.astro";
      import { readFile } from 'node:fs/promises';

      const path = ${JSON.stringify(route.PATH)};
      const htmlFilePath = \`./src/pages/api/v1/pattern\${path}.html\`;
      const html = await readFile(htmlFilePath, 'utf8');
      ---
      <Frame>
        <EdgComponent html={html} />
      </Frame>
      `

			// Save the content to the page file
			await fs.writeFile(filePath, template, 'utf8')
		}
	}

	console.log('Pages generated')
}

// Helper function to check if a file exists
const fileExists = async (filePath) => {
	try {
		await fs.access(filePath)
		return true
	} catch {
		return false
	}
}

generatePages().catch((error) => {
	console.error('Error:', error)
})
