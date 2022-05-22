import { AppConfigService } from "../../application/service/config.service";

type MockAppConfigService = Record<
  keyof Pick<AppConfigService, "get" | "getAccessTokenSettings" | "getRefreshTokenSettings">,
  jest.Mock
>;

const createMockAppConfigService = (): MockAppConfigService => ({
  get: jest.fn(),
  getAccessTokenSettings: jest.fn(),
  getRefreshTokenSettings: jest.fn(),
});

export { MockAppConfigService, createMockAppConfigService };
