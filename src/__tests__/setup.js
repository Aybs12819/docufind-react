require('@testing-library/jest-dom');

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock SpeechRecognition
const mockRecognition = {
  start: jest.fn(),
  stop: jest.fn(),
  continuous: false,
  interimResults: false,
  lang: 'en-US',
  onresult: null,
  onerror: null,
  onend: null
};

global.SpeechRecognition = jest.fn(() => mockRecognition);
global.webkitSpeechRecognition = jest.fn(() => mockRecognition);

// Mock axios
jest.mock('axios', () => require('./mocks/axios'));

// Add TextEncoder/Decoder
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Suppress console.error during tests
const originalError = console.error;
console.error = (...args) => {
  if (args[0]?.includes('Speech recognition error')) return;
  originalError.call(console, ...args);
};

beforeEach(() => {
  jest.clearAllMocks();
});

// Export for use in tests
module.exports = { mockRecognition };