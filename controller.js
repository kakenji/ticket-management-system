const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// database in memory
let tickets = [];
let idCounter = 1;

// POST
app.post('/tickets', (req, res) => {
    const { title, description, status } = req.body;

    const newTicket = {
        id: idCounter++,
        title,
        description,
        status: status || 'open',
        createdAt: new Date()
    };

    tickets.push(newTicket);
    res.status(201).json(newTicket);
});

// GET
app.get('/tickets', (req, res) => {
    res.json(tickets);
});

// app.get('/tickets/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const ticket = tickets.find(t => t.id === id);

//     if (!ticket) {
//         return res.status(404).json({ error: 'Ticket not found' });
//     }

//     res.json(ticket);
// });

// PUT
app.put('/tickets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, status } = req.body;

    const ticket = tickets.find(t => t.id === id);

    if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
    }

    if (title) ticket.title = title;
    if (description) ticket.description = description;
    if (status) ticket.status = status;

    res.json(ticket);
});

// DELETE
app.delete('/tickets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tickets.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Ticket not found' });
    }

    tickets.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});
