/** @type {import('ts-jest').JestConfigWithTsJest} */
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
	},
	moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
	transformIgnorePatterns: ["<rootDir>/node_modules/"],
	testEnvironment: "node",
	testMatch: ["**/__tests__/test_cases/**/*.ts"],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: "<rootDir>/",
	}),
	extensionsToTreatAsEsm: [".ts"],
};
