import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { Env } from './config/env.validation.js';

// Global app behavior. Used by main.ts and by the e2e tests, so both run the same app.
export function setupApp<T extends INestApplication>(app: T): T {
  const config = app.get<ConfigService<Env, true>>(ConfigService);

  app.setGlobalPrefix('api/v1', { exclude: ['health'] });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const origins = config
    .get('CORS_ORIGIN', { infer: true })
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  if (origins.length > 0) {
    app.enableCors({ origin: origins });
  }

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder().setTitle('Nami API').setVersion('1.0').build(),
  );
  SwaggerModule.setup('docs', app, document);

  return app;
}
