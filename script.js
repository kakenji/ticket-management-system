const API_URL = 'http://localhost:3000';

    const ticketTable = document.querySelector('#ticketTable tbody');
    const createForm = document.getElementById('createForm');

    // GET
    async function loadTickets() {
        ticketTable.innerHTML = '';
        const res = await fetch(`${API_URL}/tickets`);
        const tickets = await res.json();

        tickets.forEach(ticket => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${ticket.id}</td>
                <td contenteditable="true">${ticket.title}</td>
                <td contenteditable="true">${ticket.description}</td>
                <td>
                    <select>
                        <option ${ticket.status === 'open' ? 'selected' : ''}>open</option>
                        <option ${ticket.status === 'in progress' ? 'selected' : ''}>in progress</option>
                        <option ${ticket.status === 'closed' ? 'selected' : ''}>closed</option>
                    </select>
                </td>
                <td>${new Date(ticket.createdAt).toLocaleString()}</td>
                <td class="actions">
                    <button onclick="updateTicket(${ticket.id}, this)">Update</button>
                    <button onclick="deleteTicket(${ticket.id})">Delete</button>
                </td>
            `;
            ticketTable.appendChild(tr);
        });
    }

    // POST
    createForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const status = document.getElementById('status').value;

        await fetch(`${API_URL}/tickets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, status })
        });

        createForm.reset();
        loadTickets();
    });

    // PUT
    async function updateTicket(id, btn) {
        const row = btn.closest('tr');
        const title = row.children[1].innerText;
        const description = row.children[2].innerText;
        const status = row.children[3].querySelector('select').value;

        await fetch(`${API_URL}/tickets/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, status })
        });

        loadTickets();
    }

    // DELETE
    async function deleteTicket(id) {
        if (confirm('Are you sure you want to delete this ticket?')) {
            await fetch(`${API_URL}/tickets/${id}`, {
                method: 'DELETE'
            });
            loadTickets();
        }
    }

    loadTickets();