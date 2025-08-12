import { Controller, Get, Query } from '@nestjs/common';
import { readFileSync } from 'fs';

@Controller('docs')
export class DocsController {
  @Get('')
  getDoc(
    @Query('subject') subject: string,
    @Query('theme') theme: string,
    @Query('type') type: string,
  ) {
    const filePath = `./public/docs/${subject}/${theme}/${type}.html`;
    return { html: readFileSync(filePath, 'utf8') };
  }
}
