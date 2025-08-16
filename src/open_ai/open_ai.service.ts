import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { Injectable, Logger } from '@nestjs/common';
import {
  BASE_PROMPT_V1,
  CHECK_HOMEWORK_PROMT_V1,
  CHECK_PRACTICE_PROMPT_V1,
  CREATE_HOMEWORK_PROMPT_V1,
  CREATE_LESSON_PROMPT_V1,
  CREATE_PRACTICE_PROMPT_V1,
} from './prompts';
import { OpenAiReviewType } from './open_ai.type';
import {
  CheckPracticeDto,
  CheckHomeworkDto,
} from '../homework/homework.interface';
import { createReviewPracticeFile } from '../utils/helpers';

@Injectable()
export class OpenAiService {
  private readonly logger: Logger = new Logger();
  private openAiClient: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openAiClient = new OpenAI({
      apiKey: this.configService.getOrThrow('openAiKey'),
    });
  }

  private base_prompt() {
    return BASE_PROMPT_V1;
  }

  // async sendImageWithRef(
  //   image_buffer: string,
  //   refImage: string,
  // ): Promise<BasePromptV1Response> {
  //   const response = await this.openAiClient.responses.create({
  //     model: 'gpt-4.1-mini',
  //     input: [
  //       {
  //         role: 'user',
  //         content: [
  //           { type: 'input_text', text: this.base_prompt() },
  //           {
  //             type: 'input_image',
  //             image_url: `data:image/jpeg;base64,${image_buffer}`,
  //             detail: 'auto',
  //           },
  //           {
  //             type: 'input_image',
  //             image_url: `data:image/jpeg;base64,${refImage}`,
  //             detail: 'auto',
  //           },
  //         ],
  //       },
  //     ],
  //   });
  //   console.log(response.output_text);
  //   return JSON.parse(response.output_text) as BasePromptV1Response;
  // }

  async checkPractice({
    userId,
    lessonName,
    practiceContent,
    solutionContent,
  }: CheckPracticeDto): Promise<string> {
    const response = await this.openAiClient.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: [{ type: 'input_text', text: CHECK_PRACTICE_PROMPT_V1 }],
        },
        {
          role: 'user',
          content: [{ type: 'input_text', text: practiceContent }],
        },
        {
          role: 'user',
          content: [{ type: 'input_text', text: solutionContent }],
        },
      ],
    });
    return createReviewPracticeFile(userId, response.output_text, lessonName);
  }

  async checkHomework({
    solution,
    homeworkContent,
  }: CheckHomeworkDto): Promise<OpenAiReviewType> {
    const response = await this.openAiClient.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: [{ type: 'input_text', text: CHECK_HOMEWORK_PROMT_V1 }],
        },
        {
          role: 'user',
          content: [{ type: 'input_text', text: homeworkContent }],
        },
        {
          role: 'user',
          content: [{ type: 'input_text', text: solution }],
        },
      ],
    });
    this.logger.log(response.output_text);
    return JSON.parse(response.output_text) as OpenAiReviewType;
  }

  async getLessonContent(lessonName: string) {
    const { output_text: lessonText } =
      await this.openAiClient.responses.create({
        model: 'gpt-4.1-mini',
        input: [
          {
            role: 'system',
            content: [{ type: 'input_text', text: CREATE_LESSON_PROMPT_V1 }],
          },
          {
            role: 'user',
            content: [{ type: 'input_text', text: lessonName }],
          },
        ],
      });
    return lessonText;
  }

  async getPracticeContent(lessonText: string) {
    const { output_text: practiceText } =
      await this.openAiClient.responses.create({
        model: 'gpt-4.1-mini',
        input: [
          {
            role: 'system',
            content: [{ type: 'input_text', text: CREATE_PRACTICE_PROMPT_V1 }],
          },
          {
            role: 'user',
            content: [{ type: 'input_text', text: lessonText }],
          },
        ],
      });
    return practiceText;
  }

  async getHomeworkContent(lessonText: string, practiceText: string) {
    const { output_text: homeworkText } =
      await this.openAiClient.responses.create({
        model: 'gpt-4.1-mini',
        input: [
          {
            role: 'system',
            content: [{ type: 'input_text', text: CREATE_HOMEWORK_PROMPT_V1 }],
          },
          {
            role: 'user',
            content: [{ type: 'input_text', text: lessonText }],
          },
          {
            role: 'user',
            content: [{ type: 'input_text', text: practiceText }],
          },
        ],
      });
    return homeworkText;
  }
}
