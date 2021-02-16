/* eslint-disable max-len */
import React from 'react';
import { render, cleanup, fireEvent, waitFor, screen } from '@testing-library/react';
import App from './App';

describe('color picker change and record undo and redo ', () => {
  afterEach(() => cleanup());
  it('renders App', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  // ------------------------------------------------

  it('changes the color using record', async() => {
    render(<App />);

    const colorPicker = await screen.findByLabelText('Current Color');
    const colorDisplay = await screen.findByTestId('frig');

    fireEvent.change(colorPicker, {
      target:{
        value: '#0000FF'
      }
    });
    
    return waitFor(() => {
      expect(colorPicker).toHaveValue('#0000ff');
      expect(colorDisplay.style.backgroundColor).toBe('rgb(0, 0, 255)');
    });

  });

  // ------------------------------------------------


  it('undoes the color ', async() => {
    render(<App />);

    const colorPicker = await screen.findByLabelText('Current Color');
    const colorDisplay = await screen.findByTestId('frig');
    const colorUndo = await screen.findByText('undo');


    fireEvent.change(colorPicker, {
      target:{
        value: '#00FF00'
      }
    });

    fireEvent.click(colorUndo);
    
    return waitFor(() => {
      // expect(colorPicker).toHaveValue('#ff0000');
      expect(colorDisplay.style.backgroundColor).toBe('rgb(255, 0, 0)');
    });

  });

  // ------------------------------------------------

  it('redoes the color ', async() => {
    render(<App />);

    const colorPicker = await screen.findByLabelText('Current Color');
    const colorDisplay = await screen.findByTestId('frig');
    const colorUndo = await screen.findByText('undo');
    const colorRedo = await screen.findByText('redo');

    fireEvent.change(colorPicker, {
      target:{
        value: '#00FF00'
      }
    });

    fireEvent.click(colorUndo);
    fireEvent.click(colorRedo);

    return waitFor(() => {
      // expect(colorPicker).toHaveValue('#ff0000');
      expect(colorDisplay.style.backgroundColor).toBe('rgb(0, 255, 0)');
    });

  });


});
