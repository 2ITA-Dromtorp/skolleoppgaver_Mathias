
import React, { useState } from 'react';
import './index.css'; 
import Ticket from './Ticket';

// This is the main component for the ticket system
const TicketSystem = () => {
  // These are the states for the tickets, the problem description, and any error messages
  const [tickets, setTickets] = useState([]);
  const [problem, setProblem] = useState('');
  const [error, setError] = useState(null);

  // This function is called when a new ticket is created
  const createTicket = () => {
    // Reset the error state
    setError(null);
    // Generate a new ticket ID
    const newTicketId = tickets.length + 1;
    // Create a new ticket
    const newTicket = { id: newTicketId, problem, status: 'Open' };
    // Log the new ticket to the console
    console.log(newTicket);
    // Add the new ticket to the state
    setTickets([...tickets, newTicket]);
    // Reset the problem description
    setProblem('');
  };

  // This function is called when a ticket is closed
  const closeTicket = (id) => {
    // Update the status of the ticket to 'Closed'
    const updatedTickets = tickets.map(ticket => ticket.id === id ? { ...ticket, status: 'Closed' } : ticket);
    // Update the state with the updated tickets
    setTickets(updatedTickets);
  };

  // This function is called when a ticket is deleted
  const deleteTicket = (id) => {
    // Remove the ticket from the state
    const remainingTickets = tickets.filter(ticket => ticket.id !== id);
    // Update the state with the remaining tickets
    setTickets(remainingTickets);
  };

  // This function is called when a ticket is handled
  const handleTicket = (id) => {
    // Update the status of the ticket to 'In Progress'
    const updatedTickets = tickets.map(ticket => ticket.id === id ? { ...ticket, status: 'In Progress' } : ticket);
    // Update the state with the updated tickets
    setTickets(updatedTickets);
  };

  // This is the return statement for the component
  return (
    <div className="ticket-system">
      {/* This is the input field for the problem description */}
      <input type="text" value={problem} onChange={(e) => setProblem(e.target.value)} placeholder="Skriv inn problemet ditt her" />
      {/* This is where any error messages are displayed */}
      {error && <p className="error-message">{error}</p>}
      {/* This is the button to create a new ticket */}
      <button onClick={createTicket} aria-label="Create Ticket">Create Ticket</button>
      {/* This is where the tickets are displayed */}
      {tickets.map(ticket => (
        <div className="ticket-container">
          <Ticket key={ticket.id} {...ticket} closeTicket={closeTicket} deleteTicket={deleteTicket} handleTicket={handleTicket} />
        </div>
      ))}
      {/* This is the footer with the contact information */}
      <footer>
        <p>Contact oss:</p>
        <p>Email: example@example.com</p>
        <p>Phone: 123-456-7890</p>
      </footer>
    </div>
  );
};

export default TicketSystem;
