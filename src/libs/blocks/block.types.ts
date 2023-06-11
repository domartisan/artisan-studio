import { z } from 'zod'

// Define the schema for the webc object.
export const WebcSchema = z.object({
	head: z.string(),
	scripts: z.string(),
	header: z.string(),
	footer: z.string(),
	informer: z.string()
})

export const ConvertBlocksSchema = z.object({
	htmlDocument: z.string(),
	pageName: z.string(),
	route: z.string()
})

// infer ConvertBlockSchema type
export type ConvertBlockParams = z.infer<typeof ConvertBlocksSchema>
export type WebcParams = z.infer<typeof WebcSchema>
