/// <reference types="node" />

// This file helps TypeScript recognize Node.js globals during development
// These declarations will be replaced by actual type definitions when packages are installed

declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    SESSION_SECRET: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    PORT?: string;
    NODE_ENV?: string;
  }

  interface Process {
    env: ProcessEnv;
    exit(code?: number): never;
  }
}

declare var process: NodeJS.Process;
declare var __dirname: string;
declare var __filename: string;

declare var console: {
  log(...args: any[]): void;
  error(...args: any[]): void;
  warn(...args: any[]): void;
  info(...args: any[]): void;
  debug(...args: any[]): void;
};
