module.exports = {
	preset: "ts-jest/presets/js-with-babel",
	moduleNameMapper: {
		"@root/(.*)": "<rootDir>/src/$1",
		"\\.(css|less)$": "identity-obj-proxy"
	},
	setupFiles: [
		"jest-canvas-mock"
	],
	setupFilesAfterEnv: [
		"./src/setup-jest.ts"
	],
	testEnvironment: "jsdom",
	collectCoverage: true,
}