import os
from openai import OpenAI
import sqlite3

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


def print_query_results(sql: str) -> None:
    connection = sqlite3.connect("db.sqlite3")
    cursor = connection.cursor()
    cursor.execute(sql)
    results = cursor.fetchall()

    for row in results:
        print(row)

    cursor.close()
    connection.close()


def run(llm_query_generator: LLMQueryGenerator, user_query: str) -> None:
    sql = llm_query_generator.generate_sql(user_query)
    print(sql)
    print_query_results(sql)


def main() -> None:
    llm_query_generator = LLMQueryGenerator("api/data/prompt.txt", "api/models.py")

    tests = [
        "What are the top 5 safest areas",
        # "Give me the area with the least amount of burglaries",
        # "Give me the area with the least amount of illegal entry of a building with intent to commit a crime, especially theft.",
        # "Give me the area with the least amount of theft from the person",
        # "Give me the area with the least amount of theft from a vehicle",
        # "Give me the area with the least amount of theft or unauthorised taking of a pedal cycle",
        # "Give me the area with the least amount of theft in a dwelling",
        # "Give me the area with the least amount of theft from a shop",
        # "Give me the area with the least amount of criminal damage and arson",
        # "Give me the area with the least amount of violence and sexual offences",
        # "Give me the area with the least amount of violence without injury",
        # "Give me the area with the least amount of violence with injury",
        # "Give me the area with the least amount of stalking and harassment",
    ]

    for test in tests:
        run(llm_query_generator, test)


if __name__ == "__main__":
    main()
