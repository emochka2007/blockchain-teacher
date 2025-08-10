import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { Injectable } from '@nestjs/common';
import { BASE_PROMPT_V1 } from './prompts';
import { BasePromptV1Response } from './open_ai.type';

@Injectable()
export class OpenAiService {
  private openAiClient: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openAiClient = new OpenAI({
      apiKey: this.configService.getOrThrow('openAiKey'), // This is the default and can be omitted
    });
  }

  base_prompt() {
    return BASE_PROMPT_V1;
  }

  async sendImageWithRef(
    image_buffer: string,
    refImage: string,
  ): Promise<BasePromptV1Response> {
    const response = await this.openAiClient.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'user',
          content: [
            { type: 'input_text', text: this.base_prompt() },
            {
              type: 'input_image',
              image_url: `data:image/jpeg;base64,${image_buffer}`,
              detail: 'auto',
            },
            {
              type: 'input_image',
              image_url: `data:image/jpeg;base64,${refImage}`,
              detail: 'auto',
            },
          ],
        },
      ],
    });
    console.log(response.output_text);
    return JSON.parse(response.output_text) as BasePromptV1Response;
  }
}
