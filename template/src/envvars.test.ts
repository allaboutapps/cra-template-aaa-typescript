// Test static env vars exist. More of a dummy test to make sure jest setup is working.
it("test static env", () => {
    expect(process.env.REACT_APP_API_BASE_URL).toEqual("TEST_API_BASE_URL");
    expect(process.env.REACT_APP_BASE_NAME).toEqual("/test");
    expect(process.env.REACT_APP_DEPLOYMENT_ENV).toEqual("test-env");
});
