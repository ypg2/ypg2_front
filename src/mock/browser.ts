import { setupWorker } from "msw/browser";
import { loginHandler, joinHandler } from "./user";

const handlers = [loginHandler, joinHandler];
export const worker = setupWorker(...handlers);
