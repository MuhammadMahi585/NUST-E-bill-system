document.addEventListener('DOMContentLoaded', function() {
    var updateForm = document.getElementById('updateForm');

    if (updateForm) {
        updateForm.addEventListener('submit', async function(event) {
            event.preventDefault(); 

            const commRate = document.getElementById('comTerrif').value;
            const domRate = document.getElementById('domTerrif').value;

            try {
                const dataUpdated = await updateTerrif(commRate, domRate);
                console.log('Tariff rates updated successfully:', dataUpdated);
                alert('update successfully');
                // Handle success: update UI or show a message
            } catch (error) {
                console.error('Error updating tariff rates:', error);
                alert('update unsuccessfull');
                // Handle errors gracefully, show a message to the user, etc.
            }
        });
    }
});

async function updateTerrif(commRate, domRate) {
    const url = 'http://localhost:4000/updateTerrif'; // Assuming it's the correct endpoint
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comTerrif: commRate, domTerrif: domRate })
        });

        if (!response.ok) {
            throw new Error('Failed to update tariff rates');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

