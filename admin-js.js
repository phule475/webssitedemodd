document.addEventListener('DOMContentLoaded', () => {
    const profileBody = document.getElementById('profile-body');
    let profiles = []; // In-memory array to store profiles

    // Initialize Broadcast Channel
    const profileChannel = new BroadcastChannel('profile_channel');
    console.log('Broadcast Channel initialized in admin page');

    // Function to update the table with profiles
    function updateTable() {
        try {
            console.log('Updating table with profiles:', profiles);
            profileBody.innerHTML = ''; // Clear existing table content

            if (profiles.length === 0) {
                profileBody.innerHTML = '<tr><td colspan="5" class="no-data">No profiles available.</td></tr>';
            } else {
                profiles.forEach((profile, index) => {
                    console.log('Adding profile to table:', profile);
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${profile.name || ''}</td>
                        <td>${profile.card || ''}</td>
                        <td>${profile.address || ''}</td>
                        <td>${profile.timestamp || ''}</td>
                        <td><button class="delete-btn" data-index="${index}">Delete</button></td>
                    `;
                    profileBody.appendChild(row);
                });

                // Attach delete event listeners to buttons
                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', () => {
                        const index = parseInt(button.dataset.index);
                        console.log('Deleting profile at index:', index);
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
            if (index >= 0 && index < profiles.length) {
                profiles.splice(index, 1); // Remove profile at index
                console.log('Profile deleted, new profiles array:', profiles);
                updateTable(); // Refresh table
            }
        } catch (error) {
            console.error('Error deleting profile:', error);
            profileBody.innerHTML = '<tr><td colspan="5" class="no-data">Error deleting profile.</td></tr>';
        }
    }

    // Receive profiles from Broadcast Channel
    profileChannel.onmessage = (event) => {
        const profile = event.data;
        console.log('Received profile from main page:', profile);
        profiles.push(profile); // Add profile to array
        updateTable(); // Update table
    };

    // Initial table load (empty)
    updateTable();
});