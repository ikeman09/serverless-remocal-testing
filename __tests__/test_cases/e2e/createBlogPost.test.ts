require("dotenv").config({
	path: `.env.${process.env.STAGE}`,
});
import axios from "axios";
const chance = require("chance").Chance();

describe("When we call POST /blogposts", () => {
	it("should create a new item", async () => {
		console.log(`API_BASE_URL: ${process.env.API_BASE_URL}`);
		const title = chance.sentence({ words: 5 });
		const content = chance.paragraph();

		let response;
		try {
			response = await axios.post(
				`${process.env.API_BASE_URL}/blogposts`,
				{
					title,
					content,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: "test",
					},
				}
			);
		} catch (error: any) {
			console.error(error);
		}

		expect(response).toBeDefined();

		if (response) {
			expect(response.status).toBe(201);
			expect(response.data.data.title).toBe(title);
			expect(response.data.data.content).toBe(content);
		}
	});
});
