export class Response {
  constructor(
    public readonly status: number,
    public readonly body: any = null,
    public readonly headers: Record<string, string> = {},
  ) {}

  public static ok(
    body: any = null,
    headers: Record<string, string> = {},
  ): Response {
    return new Response(200, body, headers);
  }

  public static created(
    body: any = null,
    headers: Record<string, string> = {},
  ): Response {
    return new Response(201, body, headers);
  }

  public static noContent(headers: Record<string, string> = {}): Response {
    return new Response(204, null, headers);
  }
}
