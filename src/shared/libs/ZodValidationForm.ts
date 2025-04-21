import { ZodSchema } from "zod";

interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
}

/**
 * Validates form data using the given Zod schema.
 * @param schema Zod schema to validate against.
 * @param data The raw data (e.g. from a form).
 */
export function ZodValidateForm<T>(
  schema: ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data);

  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  } else {
    const errorMap: Record<string, string> = {};
    result.error.errors.forEach((err) => {
      if (err.path.length > 0) {
        errorMap[err.path[0] as string] = err.message;
      }
    });

    return {
      success: false,
      errors: errorMap,
    };
  }
}
