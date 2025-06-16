const form = document.getElementById('ticketForm');
        const responseMessage = document.getElementById('responseMessage');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const status = document.getElementById('status').value;

            const ticket = { title, description, status };

            try {
                const res = await fetch('http://localhost:3000/tickets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(ticket)
                });

                if (res.ok) {
                    const data = await res.json();
                    responseMessage.textContent = 'Ticket created successfully! ID: ' + data.id;
                    responseMessage.className = 'success';
                    form.reset();
                } else {
                    responseMessage.textContent = 'Failed to create ticket.';
                    responseMessage.className = '';
                }
            } catch (error) {
                responseMessage.textContent = 'Error: ' + error.message;
                responseMessage.className = '';
            }
        });