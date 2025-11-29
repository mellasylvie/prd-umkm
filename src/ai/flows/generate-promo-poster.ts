'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating promotional posters with a relevant message for UMKM owners.
 *
 * - generatePromoPoster - A function that generates a promotional poster with a relevant message.
 * - GeneratePromoPosterInput - The input type for the generatePromoPoster function.
 * - GeneratePromoPosterOutput - The return type for the generatePromoPoster function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePromoPosterInputSchema = z.object({
  productName: z.string().describe('The name of the product to promote.'),
  productDescription: z.string().describe('A description of the product.'),
  businessName: z.string().describe('The name of the UMKM business.'),
  businessCategory: z.string().describe('The category of the UMKM business (e.g., F&B, Fashion, Jasa).'),
  productPhotoDataUri: z
    .string()
    .describe(
      "A photo of the product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GeneratePromoPosterInput = z.infer<typeof GeneratePromoPosterInputSchema>;

const GeneratePromoPosterOutputSchema = z.object({
  posterText: z.string().describe('The promotional text for the poster.'),
  posterImageDataUri: z.string().describe('The image data URI of the generated promotional poster.'),
});
export type GeneratePromoPosterOutput = z.infer<typeof GeneratePromoPosterOutputSchema>;

export async function generatePromoPoster(input: GeneratePromoPosterInput): Promise<GeneratePromoPosterOutput> {
  return generatePromoPosterFlow(input);
}

const generatePromoTextPrompt = ai.definePrompt({
  name: 'generatePromoTextPrompt',
  input: {schema: GeneratePromoPosterInputSchema},
  output: {schema: z.object({posterText: z.string()})},
  prompt: `You are an expert marketing copywriter specializing in creating promotional content for UMKM businesses.

You will generate promotional text for a poster to promote a specific product for a UMKM business.

UMKM Business Name: {{businessName}}
Business Category: {{businessCategory}}
Product Name: {{productName}}
Product Description: {{productDescription}}

Generate concise and engaging promotional text (around 5-10 words) to entice customers. The text should be appropriate for sharing on social media platforms like WhatsApp and Instagram.
`,
});

const generatePromoPosterFlow = ai.defineFlow(
  {
    name: 'generatePromoPosterFlow',
    inputSchema: GeneratePromoPosterInputSchema,
    outputSchema: GeneratePromoPosterOutputSchema,
  },
  async input => {
    const {output: textOutput} = await generatePromoTextPrompt(input);
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image-preview',
      prompt: [
        {
          media: {url: input.productPhotoDataUri},
        },
        {text: `Generate a promotional poster with the product, incorporating the following text: ${textOutput?.posterText}`},
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {posterText: textOutput?.posterText ?? '', posterImageDataUri: media?.url ?? ''};
  }
);
