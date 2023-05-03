declare const ENV_API_BASE_URL: string;
declare const ENV_BASE_NAME: string;
declare const ENV_DEPLOYMENT_ENV: string;

beforeAll(() => {
    const g = global as any;
    g.ENV_API_BASE_URL = "DYNAMIC_API_BASE_URL";
    g.ENV_BASE_NAME = "/dynamic";
    g.ENV_DEPLOYMENT_ENV = "dynamic-env";
});

// Test static env vars exist
it("test static env", () => {
    expect(process.env.REACT_APP_API_BASE_URL).toEqual("TEST_API_BASE_URL");
    expect(process.env.REACT_APP_BASE_NAME).toEqual("/test");
    expect(process.env.REACT_APP_DEPLOYMENT_ENV).toEqual("test-env");
});

// Test dynamic env vars exist
it("test dynamic env", () => {
    expect(ENV_API_BASE_URL).toEqual("DYNAMIC_API_BASE_URL");
    expect(ENV_BASE_NAME).toEqual("/dynamic");
    expect(ENV_DEPLOYMENT_ENV).toEqual("dynamic-env");
});
