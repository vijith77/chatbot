fetch('products.json')
    .then(response => response.json())
    .then(products => {
        const productList = document.getElementById('product-list');
        products.forEach(p => {
            productList.innerHTML += `
                <div class="col-md-4 mb-4">
                    <div class="card p-3">
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

            const product = products.find(p => p.id === input);
            if (product) {
                chatBody.innerHTML += `<div><strong>${product.name}</strong><br>Colors: ${product.colors.join(', ')}<br>Sizes: ${product.sizes.join(', ')}<br>Fit: ${product.fit}<br>Description: ${product.description}</div>`;
            } else {
                // If not a product ID, use OpenAI API for conversational response
                chatBody.innerHTML += `<div><em>Thinking...</em></div>`;
                try {
                    const response = await fetch('https://api.openai.com/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer YOUR_OPENAI_API_KEY' // Replace with your API key
                        },
                        body: JSON.stringify({
                            model: 'gpt-4',
                            messages: [{ role: 'user', content: input }]
                        })
                    });
                    const data = await response.json();
                    const aiReply = data.choices[0].message.content;
                    chatBody.innerHTML += `<div>${aiReply}</div>`;
                } catch (error) {
                    chatBody.innerHTML += `<div>Error fetching AI response.</div>`;
                }
            }
            document.getElementById('chat-input').value = '';
        });
    });

/* Instructions:
1. Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key.
2. Ensure CORS or proxy setup if running locally.
*/
