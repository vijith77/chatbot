fetch('products.json')
    .then(response => response.json())
    .then(products => {
        const productList = document.getElementById('product-list');
        products.forEach(p => {
            productList.innerHTML += `
                <div class="col-md-3 mb-4">
                    <div class="card p-3">
                        <img src="${p.image}" alt="${p.name}">
                        <h5>${p.name}</h5>
                        <p>ID: ${p.id}</p>
                    </div>
                </div>
            `;
        });

        document.getElementById('send-btn').addEventListener('click', async () => {
            const input = document.getElementById('chat-input').value.trim();
            const chatBody = document.getElementById('chat-body');
            if (!input) return;

            let results = [];

            // Check by ID
            const productById = products.find(p => p.id === input);
            if (productById) {
                results.push(`<strong>${productById.name}</strong><br>Colors: ${productById.colors.join(', ')}<br>Sizes: ${productById.sizes.join(', ')}<br>Fit: ${productById.fit}<br>Description: ${productById.description}`);
            } else {
                // Check by color
                const colorMatches = products.filter(p => p.colors.map(c => c.toLowerCase()).includes(input.toLowerCase()));
                if (colorMatches.length > 0) {
                    results.push(`Products with color "${input}":<br>${colorMatches.map(p => `${p.name} (ID: ${p.id})`).join('<br>')}`);
                }

                // Check by size
                const sizeMatches = products.filter(p => p.sizes.map(s => s.toLowerCase()).includes(input.toLowerCase()));
                if (sizeMatches.length > 0) {
                    results.push(`Products with size "${input}":<br>${sizeMatches.map(p => `${p.name} (ID: ${p.id})`).join('<br>')}`);
                }

                // Check by fit
                const fitMatches = products.filter(p => p.fit.toLowerCase() === input.toLowerCase());
                if (fitMatches.length > 0) {
                    results.push(`Products with fit "${input}":<br>${fitMatches.map(p => `${p.name} (ID: ${p.id})`).join('<br>')}`);
                }

                // Check by keyword in description
                const keywordMatches = products.filter(p => p.description.toLowerCase().includes(input.toLowerCase()));
                if (keywordMatches.length > 0) {
                    results.push(`Products matching keyword "${input}":<br>${keywordMatches.map(p => `${p.name} (ID: ${p.id})`).join('<br>')}`);
                }
            }

            if (results.length > 0) {
                chatBody.innerHTML += `<div>${results.join('<hr>')}</div>`;
            } else {
                chatBody.innerHTML += `<div>No direct match found. Try another query or use AI.</div>`;
            }

            document.getElementById('chat-input').value = '';
        });
    });
