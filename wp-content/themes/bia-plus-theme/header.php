<header class="header">
    <div class="top-bar">
        <div class="brand">
            <h1>Bia +</h1>
            <p>99 Thanh Tinh, TTDT Chi Linh, Vung Tau, BR-VT</p>
        </div>
        <div class="icon-row">
            <button class="profile-btn">
                <img src="images/profile-icon.png" alt="Profile">
            </button>
        </div>
    </div>
    <div class="profile-info">
        <label>Name: <input type="text" id="name" value="<?php echo isset($_SESSION['profile']['name']) ? htmlspecialchars($_SESSION['profile']['name']) : ''; ?>"></label>
        <label>sdt: <input type="text" id="card" value="<?php echo isset($_SESSION['profile']['card']) ? htmlspecialchars($_SESSION['profile']['card']) : ''; ?>"></label>
        <label>Address: <input type="text" id="address" value="<?php echo isset($_SESSION['profile']['address']) ? htmlspecialchars($_SESSION['profile']['address']) : ''; ?>"></label>
        <button id="save-profile">Save</button>
    </div>
</header>