document.addEventListener('DOMContentLoaded', () => {
    const profileBody = document.getElementById('profile-body');

    // Function to update the table with profiles
    function updateTable() {
        try {
            const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
            profileBody.innerHTML = ''; // Clear existing table content

            if (profiles.length === 0) {
                profileBody.innerHTML = '<tr><td colspan="5" class="no-data">No profiles available.</td></tr>';
            } else {
                profiles.forEach((profile, index) => {
                    // Ensure profile has all required fields
                    if (profile.name && profile.card && profile.address && profile.timestamp) {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${profile.name}</td>
                            <td>${profile.card}</td>
                            <td>${profile.address}</td>
                            <td>${profile.timestamp}</td>
                            <td><button class="delete-btn" data-index="${index}">Delete</button></td>
                        `;
                        profileBody.appendChild(row);
                    }
                });

                // Attach delete event listeners to buttons
                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', () => {
                        const index = parseInt(button.dataset.index);
                        deleteProfile(index);
                    });
                });
            }
        } catch (error) {
            console.error('Error updating table:', error);
            profileBody.innerHTML = '<tr><td colspan="5" class="no-data">Error loading profiles.</td></tr>';
        }
    }

    // Function to delete a profile by index
    function deleteProfile(index) {
        try {
            let profiles = JSON.parse(localStorage.getItem('profiles')) || [];
            if (index >= 0 && index < profiles.length) {
                profiles.splice(index, 1); // Remove profile at index
                localStorage.setItem('profiles', JSON.stringify(profiles));
                updateTable(); // Refresh table
            }
        } catch (error) {
            console.error('Error deleting profile:', error);
            profileBody.innerHTML = '<tr><td colspan="5" class="no-data">Error deleting profile.</td></tr>';
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