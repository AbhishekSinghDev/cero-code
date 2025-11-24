import { z } from "zod";

export const deviceAuthorizationSchema = z.object({
  userCode: z
    .string()
    .min(1, "Please enter a device code")
    .transform((val) => val.trim().replace(/-/g, "").toUpperCase())
    .refine((val) => val.length === 8, {
      message: "Device code must be 8 characters",
    }),
});

export type DeviceAuthorizationFormData = z.infer<
  typeof deviceAuthorizationSchema
>;
