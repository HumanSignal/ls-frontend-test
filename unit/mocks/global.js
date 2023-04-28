Object.defineProperty(window, 'APP_SETTINGS', {
  value: {
    hostname: 'http://localhost:3000',
  },
});

// Mock the URl.createObjectURL function
Object.defineProperty(window.URL, 'createObjectURL', {
  value: jest.fn().mockReturnValue('http://localhost:3000'),
});
