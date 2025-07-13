import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddAgendaItemForm from './AddAgendaItemForm';

describe('AddAgendaItemForm', () => {
  const setAgenda = jest.fn();

  beforeEach(() => {
    setAgenda.mockClear();
  });

  it('renders the form', () => {
    render(<AddAgendaItemForm setAgenda={setAgenda} />);
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Presenter')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Duration (minutes)')).toBeInTheDocument();
  });

  it('calls setAgenda on submit', () => {
    render(<AddAgendaItemForm setAgenda={setAgenda} />);
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Item' } });
    fireEvent.change(screen.getByPlaceholderText('Duration (minutes)'), { target: { value: '5' } });
    fireEvent.click(screen.getByText('Add Item'));
    expect(setAgenda).toHaveBeenCalled();
  });

  it('does not call setAgenda if title or duration is missing', () => {
    render(<AddAgendaItemForm setAgenda={setAgenda} />);
    fireEvent.click(screen.getByText('Add Item'));
    expect(setAgenda).not.toHaveBeenCalled();
  });
});
