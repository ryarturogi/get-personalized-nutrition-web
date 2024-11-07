import OpenAI from "openai";
import { OpenAIStream } from "../../utils/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { prompt } = (await req.json()) as { prompt?: string };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAI.ChatCompletionCreateParams = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
