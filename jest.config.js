const ignoredModules = ['@coreui/icons', '@coreui/utils'].join('|')

export const moduleFileExtensions = [
  'js',
  'jsx',
  'json',
  'vue'
]
export const transform = {
  '^.+\\.vue$': 'vue-jest',
  '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  '^.+\\.(js|jsx)?$': '<rootDir>/node_modules/babel-jest'
}
export const transformIgnorePatterns = [`<rootDir>/node_modules/(?!${ignoredModules})`]
export const moduleNameMapper = {
  '^@/(.*)$': '<rootDir>/src/$1'
}
export const snapshotSerializers = [
  'jest-serializer-vue'
]
export const testMatch = ['<rootDir>/tests/unit/**/*.spec.js']
export const verbose = true
export const testURL = 'http://localhost/'
export const collectCoverage = true
export const collectCoverageFrom = [
  'src/**/*.{js,vue}',
  '!**/node_modules/**'
]
export const coverageReporters = ['html', 'text-summary']
