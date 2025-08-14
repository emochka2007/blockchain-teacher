import * as process from 'node:process';

export default () => ({
  apiId: Number(process.env.TG_API_ID as string),
  apiHash: process.env.TG_API_HASH,
  openAiKey: process.env.OPEN_AI_KEY,
});
