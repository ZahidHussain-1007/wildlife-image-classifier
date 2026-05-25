export const appConfig = {
  port: Number(process.env.PORT ?? 3000),
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  workerApiUrl: process.env.WORKER_API_URL ?? 'http://localhost:8000',
};
