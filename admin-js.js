document.addEventListener('DOMContentLoaded', () => {
    const profileBody = document.getElementById('profile-body');

    // Function to update the table with profiles
    function updateTable() {
        try {
            const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
            profileBody.innerHTML = ''; // Clear existing table content

            if (profiles.length === 0) {
                profileBody.innerHTML = '<tr><td colspan="4" class="no-data">No profiles available.</td></tr>';
            } else {
                profiles.forEach(profile => {
                    // Ensure profile has all required fields
                    if (profile.name && profile.card && profile.address && profile.timestamp) {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${profile.name}</td>
                            <td>${profile.card}</td>
                            <td>${profile.address}</td>
                            <td>${profile.timestamp}</td>
                        `;
                        profileBody.appendChild(row);
                    }
                });
            }
        } catch (error) {
            console.error('Error updating table:', error);
            profileBody.innerHTML = '<tr><td colspan="4" class="no-data">Error loading profiles.</td></tr>';
        }
    }

    // Initial table load
    updateTable();

    // Listen for storage events to update table in real-time
    window.addEventListener('storage', (event) => {
        if (event.key === 'profiles') {
            updateTable();
        }
    });
});