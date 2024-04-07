import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { ulid } from "ulid";

export const handler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	console.log("Received event:", JSON.stringify(event, null, 2));
	const client = new DynamoDBClient({ region: process.env.AWS_REGION });

	const requestBody = JSON.parse(event.body || "{}");
	const title = requestBody.title;
	const content = requestBody.content;

	if (!title || !content) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "Title and content are required",
			}),
			headers: {
				"Content-Type": "application/json",
			},
		};
	}

	const newBlogPost = {
		id: ulid(),
		title,
		content,
		createdAt: new Date().toISOString(),
	};

	const params = {
		TableName: process.env.BLOG_POSTS_TABLE,
		Item: {
			id: { S: newBlogPost.id },
			title: { S: title },
			content: { S: content },
			createdAt: { S: newBlogPost.createdAt },
		},
	};

	const command = new PutItemCommand(params);

	let response;

	try {
		response = await client.send(command);
	} catch (error) {
		console.error("Error creating item:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Error creating item",
				error: error,
			}),
		};
	}

	return {
		statusCode: 201,
		body: JSON.stringify({
			message: "Item created successfully",
			data: newBlogPost,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	};
};
