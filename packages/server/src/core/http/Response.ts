export default class Response {
  constructor(
    public readonly status: number,
    public readonly body: any = null,
    public readonly headers: Record<string, string> = {},
  ) {}
}
