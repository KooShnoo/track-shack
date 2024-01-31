import debug from 'debug';

// loggers
export const serverErrorLogger = debug('backend:error');
export const serverLogger = debug('backend:server');
export const dbLogger = debug('backend:mongodb');