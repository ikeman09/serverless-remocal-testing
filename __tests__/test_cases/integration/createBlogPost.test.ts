require("dotenv").config({
  path: `.env.${process.env.STAGE}`,
});
const chance = require("chance").Chance();

describe("createBlogPost", () => {
  it("should create a blog post", async () => {
    const handler = require("@src/functions/createBlogPost").handler;

    const title = chance.sentence();
    const content = chance.paragraph();

    const event = {
      body: JSON.stringify({
        title,
        content,
      }),
    };

    const response = await handler(event);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeDefined();

    const parsedResponse = JSON.parse(response.body);
    expect(parsedResponse.data.title).toBe(title);
    expect(parsedResponse.data.content).toBe(content);
  });
});
