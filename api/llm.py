import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)


class LLMQueryGenerator:
    def __init__(self, prompt_path: str, model_path: str):
        with open(prompt_path) as f:
            self.prompt = f.read()
        with open(model_path) as f:
            self.model = f.read()

    def generate_sql(self, user_query: str) -> str:
        completion = client.chat.completions.create(
            model="gpt-4",
            temperature=0,
            top_p=0,
            messages=[
                {"role": "system", "content": "You are a helpful sql query generator."},
                {"role": "user", "content": self.prompt.format(self.model, user_query)},
            ],
        )
        llm_response = completion.choices[0].message.content
        return llm_response
