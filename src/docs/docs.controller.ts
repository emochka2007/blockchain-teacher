import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { readFileSync } from 'fs';
import Asciidoctor from '@asciidoctor/core';

@Controller('docs')
export class DocsController {
  @Get('')
  getDoc(
    @Query('subject') subject: string,
    @Query('theme') theme: string,
    @Query('type') type: string,
  ) {
    const ascii = Asciidoctor();
    const filePath = `./public/docs/${subject}/${theme}/${type}.adoc`;
    const adoc = readFileSync(filePath, 'utf8');
    try {
      return ascii.convert(adoc);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
