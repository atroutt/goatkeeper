import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AgendaItem from './AgendaItem';

describe('AgendaItem', () => {
  const item = { id: '1', title: 'Test Title', presenter: 'Test Presenter', duration: 10 };
  const setAgenda = jest.fn();

  it('renders the agenda item', () => {
    render(<AgendaItem item={item} setAgenda={setAgenda} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Presenter')).toBeInTheDocument();
    expect(screen.getByText('10 minutes')).toBeInTheDocument();
  });

  it('switches to edit mode', () => {
    render(<AgendaItem item={item} setAgenda={setAgenda} />);
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByDisplayValue('Test Title')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Presenter')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  });

  it('calls setAgenda on delete', () => {
    render(<AgendaItem item={item} setAgenda={setAgenda} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(setAgenda).toHaveBeenCalled();
  });

  it('calls setAgenda on update', () => {
    render(<AgendaItem item={item} setAgenda={setAgenda} />);
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Save'));
    expect(setAgenda).toHaveBeenCalled();
  });
});
