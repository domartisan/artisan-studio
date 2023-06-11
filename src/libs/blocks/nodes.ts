import {
	sanitizeAttribute,
	generateFieldName,
	extractFirstContainerName
} from './utils'
import type * as cheerio from 'cheerio'

// define a type for the cheerio root
type CheerioRoot = ReturnType<typeof cheerio.load>

export function processInformerSections(
	$: CheerioRoot,
	validConvertBlocks: any
) {
	const informerSections = $('body').find('.informer-sections')
	informerSections.each(function (i, el) {
		$(this).attr({
			'cms-block': `x-page-${sanitizeAttribute(
				validConvertBlocks.pageName,
				'-'
			)}-blocks`,
			'cms-block-title': `${validConvertBlocks.pageName} Blocks`,
			'cms-block-inner-content': [],
			'cms-block-supports':
				'color.background,color.text,color.gradients,color.link,typography.fontSize,anchor,align,multiple=false'
		} as any)

		$(this)
			.children('div, section')
			.each(function (index: any, child: any) {
				const classes = $(child).attr('class') || ''
				const firstClass = extractFirstContainerName(classes)
				const tagName = $(child).prop('tagName')

				$(child).attr({
					'data-pg-collapsed': true,
					'cms-block': `x-section-block-${sanitizeAttribute(firstClass, '-')}`,
					'cms-block-title': `${index} section page`,
					'cms-block-keywords': `${validConvertBlocks.pageName}, ${tagName}`,
					'cms-block-supports':
						'color.background,color.text,color.gradients,color.link,typography.fontSize,anchor,align,multiple=false'
				} as any)
			})
	})
}

export function processContainerFluids(
	$: CheerioRoot,
	validConvertBlocks: any
) {
	const containerFluids = $('body')
		.find('.informer-sections')
		.find('.dp-container-fluid')
	containerFluids.each(function (i, el) {
		const containerIndex = i + 1
		const classes = $(this).attr('class') || ''
		const formattedClasses = extractFirstContainerName(classes)

		$(this).attr({
			'cms-block-title': `${containerIndex} Section Block`,
			'cms-block': `x-component-${formattedClasses}`,
			'cms-block-inner-content': [],
			'cms-block-keywords': `${validConvertBlocks.pageName}`,
			'cms-block-supports':
				'color.background,color.text,color.gradients,color.link,typography.fontSize,anchor,align,multiple=false'
		} as any)

		const fluidContainer = $(this).find('.dp-fluid-container')
		fluidContainer.attr({
			'cms-block': `x-component-wrapper`,
			'cms-block-inner-content': [],
			'cms-block-supports':
				'color.background,color.text,color.gradients,color.link,typography.fontSize,anchor,align,multiple=false'
		} as any)

		fluidContainer.children().each(function (j, child) {
			const childTagName = $(child).prop('tagName')
			const childClasses = $(child).attr('class') || ''
			const formattedChildClasses = extractFirstContainerName(childClasses)

			$(child).attr({
				'cms-block-title': `${containerIndex} ${formattedChildClasses}`,
				'cms-block': `x-component-${formattedChildClasses}-${childTagName}`,
				'cms-block-keywords': `${validConvertBlocks.pageName}`,
				'cms-block-supports':
					'color.background,color.text,color.gradients,color.link,typography.fontSize,anchor,align,multiple=false'
			})
		})
	})
}

export function processImgElements($: CheerioRoot) {
	const imgElements = $('body').find('img, figure, picture, svg')
	imgElements.each(function (i, el) {
		const parentBlock = $(this).parent().attr('cms-block')
		const fieldName = sanitizeAttribute(
			generateFieldName(parentBlock, $(this).prop('tagName').toLowerCase(), i),
			'_'
		)
		$(this).attr({
			'cms-block-field': fieldName.toLowerCase(),
			'cms-block-field-type': 'image',
			'cms-block-field-title': `Image for ${fieldName}`
		})
	})
}

export function processTextNodes($: CheerioRoot) {
	const textNodes = $('body').find(
		'h1, h2, h3, h4, h5, h6, p, span, li, td, th, dt, dd'
	)
	textNodes.each(function (i, el) {
		// Check if the current node has direct text content
		if ($(this).children().length === 0 && $(this).text().trim() !== '') {
			const parentBlock = $(this).parent().attr('cms-block')
			const fieldName = sanitizeAttribute(
				generateFieldName(
					parentBlock,
					$(this).prop('tagName').toLowerCase(),
					i
				),
				'_'
			)
			const isShortText = $(this).text().length < 50
			$(this).attr({
				'cms-block-field': fieldName.toLowerCase(),
				'cms-block-field-type': 'content',
				'cms-block-field-title': `${
					fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
				}`,
				'cms-block-field-control': isShortText ? 'input' : 'textarea'
			})
		}
	})
}

export function processLinkNodes($: CheerioRoot) {
	const linkNodes = $('body').find('a, button')
	linkNodes.each(function (i, el) {
		const parentBlock = $(this).parent().attr('cms-block')
		const fieldName = sanitizeAttribute(
			generateFieldName(parentBlock, $(this).prop('tagName').toLowerCase(), i),
			'_'
		)
		$(this).attr({
			'cms-block-field': fieldName.toLowerCase(),
			'cms-block-field-type': 'link',
			'cms-block-field-title': `Link for ${fieldName}`,
			'cms-block-field-2': `${fieldName}_label`,
			'cms-block-field-title-2': `${
				fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
			} Label`,
			'cms-block-field-type-2': 'content'
		})
	})
}
