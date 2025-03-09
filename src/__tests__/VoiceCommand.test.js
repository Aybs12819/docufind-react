import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import VoiceCommand from '../components/VoiceCommand';

describe('VoiceCommand', () => {
  let mockRecognition;
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockRecognition = {
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
    jest.clearAllMocks();
  });

  test('renders voice command button', () => {
    render(<VoiceCommand onSearch={mockOnSearch} />);
    const button = screen.getByRole('button', { name: /voice search/i });
    expect(button).toHaveClass('voice-trigger');
    expect(button).not.toHaveClass('active');
  });

  test('starts listening on button click', async () => {
    render(<VoiceCommand onSearch={mockOnSearch} />);
    const button = screen.getByRole('button', { name: /voice search/i });
    
    await act(async () => {
      fireEvent.click(button);
    });
    
    expect(mockRecognition.start).toHaveBeenCalled();
    expect(button).toHaveClass('active');
    expect(button).toBeDisabled();
  });

  test('calls onSearch with transcript when speech is recognized', async () => {
    render(<VoiceCommand onSearch={mockOnSearch} />);
    const button = screen.getByRole('button', { name: /voice search/i });
    
    await act(async () => {
      fireEvent.click(button);
      const recognition = global.SpeechRecognition();
      recognition.onresult({ 
        results: [[{ transcript: 'test query' }]] 
      });
    });
    
    expect(mockOnSearch).toHaveBeenCalledWith('test query');
    expect(button).not.toHaveClass('active');
    expect(button).not.toBeDisabled();
  });

  test('handles speech recognition errors', async () => {
    render(<VoiceCommand onSearch={mockOnSearch} />);
    const button = screen.getByRole('button', { name: /voice search/i });
    
    await act(async () => {
      fireEvent.click(button);
      const recognition = global.SpeechRecognition();
      recognition.onerror({ error: 'no-speech' });
    });
    
    expect(button).not.toHaveClass('active');
    expect(button).not.toBeDisabled();
  });
});