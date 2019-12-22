import path from 'path';

const rootDir = __dirname;
const urlPath: string = 'http://localhost';
const urlPort: number = 3000;
const baseVersion: string = 'v2';

const config = {
    ROOT_DIR: rootDir,
    URL_PORT: 3000,
    URL_PATH: urlPath,
    BASE_VERSION: baseVersion,
    CONTROLLER_DIRECTORY: path.join(__dirname, 'controllers'),
    OPENAPI_YAML: path.join(rootDir, 'api', 'openapi.yaml'),
    FULL_PATH: `${urlPath}:${urlPort}/${baseVersion}`,
};

export default config