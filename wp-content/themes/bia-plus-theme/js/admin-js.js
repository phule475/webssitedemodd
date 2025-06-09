document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const authBtn = document.getElementById('auth-btn');
    const adminUsername = document.getElementById('admin-username');
    const adminPassword = document.getElementById('admin-password');
    const authError = document.getElementById('auth-error');
    const profileTable = document.getElementById('profile-table');
    const profileBody = document.getElementById('profile-body');

    let token = null;

    authBtn.addEventListener('click', async () => {
        const username = adminUsername.value.trim();
        const password = adminPassword.value.trim();
        try {
            const response = await fetch(biaPlusAjax.rest_url + 'login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            if (response.ok) {
                const data = await response.json();
                token = data.token;
                authForm.style.display = 'none';
                profileTable.style.display = 'table';
                authError.style.display = 'none';
                updateTable();
            } else {
                authError.style.display = 'block';
                adminUsername.value = '';
                adminPassword.value = '';
            }
        } catch (error) {
            console.error('Lỗi khi xác thực:', error);
            authError.style.display = 'block';
            adminUsername.value = '';
            adminPassword.value = '';
        }
    });

    async function updateTable() {
        try {
            const response = await fetch(biaPlusAjax.rest_url + 'profiles', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Không thể lấy danh sách hồ sơ');
            }
            const profiles = await response.json();
            console.log('Cập nhật bảng với hồ sơ:', profiles);
            profileBody.innerHTML = '';

            if (profiles.length === 0) {
                profileBody.innerHTML = '<tr><td colspan="5" class="no-data">Không có hồ sơ nào.</td></tr>';
            } else {
                profiles.forEach((profile) => {
                    console.log('Thêm hồ sơ vào bảng:', profile);
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${profile.name || 'N/A'}</td>
                        <td>${profile.card || 'N/A'}</td>
                        <td>${profile.address || 'N/A'}</td>
                        <td>${profile.timestamp || 'N/A'}</td>
                        <td><button class="delete-btn" data-id="${profile.id}">Xóa</button></td>
                    `;
                    profileBody.appendChild(row);
                });

                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', () => {
                        const id = button.dataset.id;
                        console.log('Xóa hồ sơ với ID:', id);
                        deleteProfile(id);
                    });
                });
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật bảng:', error);
            profileBody.innerHTML = '<tr><td colspan="5" class="no-data">Lỗi khi tải hồ sơ.</td></tr>';
        }
    }

    async function deleteProfile(id) {
        try {
            const response = await fetch(biaPlusAjax.rest_url + 'profiles/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Xóa hồ sơ thất bại');
            }
            console.log('Hồ sơ đã được xóa:', id);
            updateTable();
        } catch (error) {
            console.error('Lỗi khi xóa hồ sơ:', error);
            profileBody.innerHTML = '<tr><td colspan="5" class="no-data">Lỗi khi xóa hồ sơ.</td></tr>';
        }
    }
});