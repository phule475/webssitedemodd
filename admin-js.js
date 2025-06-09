document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const authBtn = document.getElementById('auth-btn');
    const adminUsername = document.getElementById('admin-username');
    const adminPassword = document.getElementById('admin-password');
    const authError = document.getElementById('auth-error');
    const profileTable = document.getElementById('profile-table');
    const profileBody = document.getElementById('profile-body');
    const loginLogTable = document.getElementById('login-log-table');
    const loginLogBody = document.getElementById('login-log-body');

    let token = null;

    // Handle admin authentication
    authBtn.addEventListener('click', async () => {
        const username = adminUsername.value.trim();
        const password = adminPassword.value.trim();
        try {
            const response = await fetch('backend/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, isAdmin: true })
            });
            const data = await response.json();
            if (response.ok && data.success) {
                token = data.token;
                authForm.style.display = 'none';
                profileTable.style.display = 'table';
                loginLogTable.style.display = 'table';
                authError.style.display = 'none';
                updateProfileTable();
                updateLoginLogTable();
            } else {
                authError.style.display = 'block';
                authError.textContent = data.message || 'Invalid credentials!';
            }
        } catch (error) {
            console.error('Authentication error:', error);
            authError.style.display = 'block';
            authError.textContent = 'System error. Please try again!';
        }
    });

    // Update profile table
    async function updateProfileTable() {
        try {
            const response = await fetch('backend/profiles.php', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch profiles');
            const profiles = await response.json();
            profileBody.innerHTML = '';
            if (profiles.length === 0) {
                profileBody.innerHTML = '<tr><td colspan="5" class="no-data">No profiles available.</td></tr>';
            } else {
                profiles.forEach((profile) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${profile.name || 'N/A'}</td>
                        <td>${profile.card || 'N/A'}</td>
                        <td>${profile.address || 'N/A'}</td>
                        <td>${profile.timestamp || 'N/A'}</td>
                        <td><button class="delete-btn" data-id="${profile.id}">Delete</button></td>
                    `;
                    profileBody.appendChild(row);
                });
                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', () => deleteProfile(button.dataset.id));
                });
            }
        } catch (error) {
            console.error('Error updating profile table:', error);
            profileBody.innerHTML = '<tr><td colspan="5" class="no-data">Error loading profiles.</td></tr>';
        }
    }

    // Update login log table
    async function updateLoginLogTable() {
        try {
            const response = await fetch('backend/login_logs.php', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch login logs');
            const logs = await response.json();
            loginLogBody.innerHTML = '';
            if (logs.length === 0) {
                loginLogBody.innerHTML = '<tr><td colspan="3" class="no-data">No login logs available.</td></tr>';
            } else {
                logs.forEach((log) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${log.username || 'N/A'}</td>
                        <td>${log.timestamp || 'N/A'}</td>
                        <td><button class="delete-btn" data-id="${log.id}">Delete</button></td>
                    `;
                    loginLogBody.appendChild(row);
                });
                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', () => deleteLoginLog(button.dataset.id));
                });
            }
        } catch (error) {
            console.error('Error updating login log table:', error);
            loginLogBody.innerHTML = '<tr><td colspan="3" class="no-data">Error loading login logs.</td></tr>';
        }
    }

    // Delete profile
    async function deleteProfile(id) {
        try {
            const response = await fetch(`backend/profiles.php?id=${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to delete profile');
            updateProfileTable();
        } catch (error) {
            console.error('Error deleting profile:', error);
            profileBody.innerHTML = '<tr><td colspan="5" class="no-data">Error deleting profile.</td></tr>';
        }
    }

    // Delete login log
    async function deleteLoginLog(id) {
        try {
            const response = await fetch(`backend/login_logs.php?id=${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to delete login log');
            updateLoginLogTable();
        } catch (error) {
            console.error('Error deleting login log:', error);
            loginLogBody.innerHTML = '<tr><td colspan="3" class="no-data">Error deleting login log.</td></tr>';
        }
    }
});