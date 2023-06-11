import * as cheerio from 'cheerio'

export default function ImageMigration(PageBlocks, endpoint) {
	const $ = cheerio.load(PageBlocks)

	const attributesToReplace = ['src', 'srcset']

	attributesToReplace.forEach((attr) => {
		$(`[${attr}]`).each((_, el) => {
			const element = $(el)
			const attrValue = element.attr(attr)
			if (attrValue && !attrValue.startsWith('http')) {
				element.attr(attr, endpoint + attrValue)
			}
		})
	})

	const body = $('body').html()

	return body
}
