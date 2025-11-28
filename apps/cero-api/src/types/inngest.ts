import type { Realtime } from "@inngest/realtime";
import type { Context } from "inngest";

export type RealtimeContext = Context & {
  publish: Realtime.PublishFn;
};
