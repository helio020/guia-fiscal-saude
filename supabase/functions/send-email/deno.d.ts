// Type declarations for Deno runtime in Supabase Edge Functions
declare global {
  namespace Deno {
    function serve(
      handler: (req: Request) => Response | Promise<Response>
    ): void;
    
    namespace env {
      function get(key: string): string | undefined;
    }
  }
  
  const Deno: {
    serve: (handler: (req: Request) => Response | Promise<Response>) => void;
    env: {
      get: (key: string) => string | undefined;
    };
  };
  
  // Web API types (available in Deno runtime)
  interface Request {
    readonly method: string;
    readonly url: string;
    json(): Promise<any>;
    text(): Promise<string>;
    headers: Headers;
  }
  
  interface Response {
    readonly status: number;
    readonly statusText: string;
    readonly headers: Headers;
    json(): Promise<any>;
    text(): Promise<string>;
  }
  
  interface Headers {
    get(name: string): string | null;
    set(name: string, value: string): void;
    has(name: string): boolean;
  }
  
  const Request: {
    prototype: Request;
    new(input: RequestInfo | URL, init?: RequestInit): Request;
  };
  
  const Response: {
    prototype: Response;
    new(body?: BodyInit | null, init?: ResponseInit): Response;
  };
}

export {};

