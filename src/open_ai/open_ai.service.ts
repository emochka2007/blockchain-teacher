import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { Injectable, Logger } from '@nestjs/common';
import {
  BASE_PROMPT_V1,
  CHECK_HOMEWORK_PROMT_V1,
  CHECK_PRACTICE_PROMPT_V1,
} from './prompts';
import { BasePromptV1Response, OpenAiReviewType } from './open_ai.type';
import * as fs from 'node:fs';
import {
  CheckPracticeDto,
  JoinedHomeworkEntity,
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

  private readDocs(subject: string, topic: string, homeworkName: string) {
    return fs.readFileSync(
      `./public/docs/${subject}/${topic}/${homeworkName}.adoc`,
      'utf-8',
    );
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
    subjectName,
    practiceName,
  }: CheckPracticeDto): Promise<string> {
    const practiceText = this.readDocs(
      subjectName.toLowerCase(),
      lessonName.toLowerCase(),
      practiceName,
    );
    const solution = this.readDocs('practices', userId, lessonName);
    const response = await this.openAiClient.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: [{ type: 'input_text', text: CHECK_PRACTICE_PROMPT_V1 }],
        },
        {
          role: 'user',
          content: [{ type: 'input_text', text: practiceText }],
        },
        {
          role: 'user',
          content: [{ type: 'input_text', text: solution }],
        },
      ],
    });
    return createReviewPracticeFile(userId, response.output_text, lessonName);
  }

  async checkHomework({
    homeworkName,
    lessonName,
    subjectName,
    solution,
  }: JoinedHomeworkEntity): Promise<OpenAiReviewType> {
    const homeworkText = this.readDocs(subjectName, lessonName, homeworkName);
    const response = await this.openAiClient.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: [{ type: 'input_text', text: CHECK_HOMEWORK_PROMT_V1 }],
        },
        {
          role: 'user',
          content: [{ type: 'input_text', text: homeworkText }],
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
}
