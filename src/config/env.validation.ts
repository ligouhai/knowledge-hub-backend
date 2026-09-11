import { plainToInstance, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

const ENV_KEYS = [
  'PORT',
  'MONGODB_URI',
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DB',
  'TYPEORM_SYNCHRONIZE',
  'TYPEORM_LOGGING',
] as const;

function toEnvText(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value;
  }
  if (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'bigint'
  ) {
    return String(value);
  }
  return undefined;
}

function parseInteger(value: unknown): number | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }
  if (typeof value === 'number') {
    return Number.isInteger(value) ? value : Number.NaN;
  }
  const text = toEnvText(value);
  if (text === undefined) {
    return Number.NaN;
  }
  const trimmed = text.trim();
  if (trimmed === '') {
    return undefined;
  }
  if (!/^[+-]?\d+$/.test(trimmed)) {
    return Number.NaN;
  }
  return Number.parseInt(trimmed, 10);
}

function parseBoolean(value: unknown, fallback: boolean): boolean {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  const text = toEnvText(value);
  if (text === undefined) {
    return fallback;
  }
  const normalized = text.trim().toLowerCase();
  if (normalized === 'true' || normalized === '1') {
    return true;
  }
  if (normalized === 'false' || normalized === '0') {
    return false;
  }
  return fallback;
}

function pickKnownEnv(
  config: Record<string, unknown>,
): Record<string, unknown> {
  const picked: Record<string, unknown> = {};
  for (const key of ENV_KEYS) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      picked[key] = config[key];
    }
  }
  return picked;
}

export class EnvironmentVariables {
  @Transform(({ value }) => parseInteger(value) ?? 3000)
  @IsInt()
  @Min(1)
  @Max(65535)
  PORT = 3000;

  @IsString()
  MONGODB_URI!: string;

  @IsString()
  POSTGRES_HOST!: string;

  @Transform(({ value }) => parseInteger(value))
  @IsInt()
  @Min(1)
  @Max(65535)
  POSTGRES_PORT!: number;

  @IsString()
  POSTGRES_USER!: string;

  @IsString()
  POSTGRES_PASSWORD!: string;

  @IsString()
  POSTGRES_DB!: string;

  @Transform(({ value }) => parseBoolean(value, false))
  @IsBoolean()
  TYPEORM_SYNCHRONIZE = false;

  @Transform(({ value }) => parseBoolean(value, false))
  @IsBoolean()
  TYPEORM_LOGGING = false;
}

export function validateEnv(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validated = plainToInstance(
    EnvironmentVariables,
    pickKnownEnv(config),
    {
      enableImplicitConversion: false,
      exposeDefaultValues: true,
    },
  );
  const errors = validateSync(validated, {
    skipMissingProperties: false,
    forbidUnknownValues: false,
  });
  if (errors.length > 0) {
    const messages = errors
      .map((e) => Object.values(e.constraints ?? {}).join(', '))
      .join('; ');
    throw new Error(`Environment validation failed: ${messages}`);
  }
  return validated;
}
