import React from 'react';

const Ticket = ({ id, problem, status, closeTicket, deleteTicket, handleTicket }) => {
  return (
    <div className="ticket">
      <h2>{`ID: ${id}, Problem: ${problem}`}</h2>
      <p>{`Status: ${status}`}</p>
      {(status === 'Open' || status === 'In Progress') && (
        <>
          <button onClick={() => closeTicket(id)}>Close Ticket</button>
          <button onClick={() => handleTicket(id)}>Handle Ticket</button>
        </>
      )}
      <button onClick={() => deleteTicket(id)}>Delete Ticket</button>
    </div>
  );
};

export default Ticket;
