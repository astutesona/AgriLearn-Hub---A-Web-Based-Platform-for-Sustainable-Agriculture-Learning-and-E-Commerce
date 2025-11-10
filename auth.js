// Authentication and User Session Management

// Check if user is logged in and update navigation
function checkUserSession() {
  const currentUser = JSON.parse(localStorage.getItem("agrilearn_current_user"));
  const navMenu = document.querySelector(".nav-menu");
  
  if (currentUser && navMenu) {
    // Find the login link
    const loginLink = navMenu.querySelector('a[href="login.html"]');
    
    if (loginLink) {
      const listItem = loginLink.parentElement;
      
      // Replace login link with user menu
      listItem.innerHTML = `
        <div class="user-menu" style="position: relative;">
          <a href="#" class="btn-nav" onclick="toggleUserDropdown(event)" style="display: flex; align-items: center; gap: 5px;">
            <span>👤</span>
            <span>${currentUser.fullName.split(' ')[0]}</span>
            <span style="font-size: 0.8em;">▼</span>
          </a>
          <div id="userDropdown" class="user-dropdown" style="display: none; position: absolute; top: 100%; right: 0; background: white; box-shadow: 0 4px 10px rgba(0,0,0,0.1); border-radius: 8px; margin-top: 10px; min-width: 180px; z-index: 1000;">
            <div style="padding: 15px; border-bottom: 1px solid #eee;">
              <strong style="color: #2d6a4f;">${currentUser.fullName}</strong>
              <p style="font-size: 0.85em; color: #666; margin: 5px 0 0 0;">${currentUser.email}</p>
            </div>
            <a href="#" onclick="handleLogout(event)" style="display: block; padding: 12px 15px; color: #d32f2f; text-decoration: none; font-weight: 600; border-radius: 0 0 8px 8px;">
              🚪 Logout
            </a>
          </div>
        </div>
      `;
    }
  }
}

// Toggle user dropdown menu
function toggleUserDropdown(event) {
  event.preventDefault();
  const dropdown = document.getElementById("userDropdown");
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
  }
}

// Close dropdown when clicking outside
document.addEventListener("click", function(event) {
  const userMenu = document.querySelector(".user-menu");
  const dropdown = document.getElementById("userDropdown");
  
  if (dropdown && userMenu && !userMenu.contains(event.target)) {
    dropdown.style.display = "none";
  }
});

// Handle logout
function handleLogout(event) {
  event.preventDefault();
  
  if (confirm("Are you sure you want to logout?")) {
    // Remove current user from localStorage
    localStorage.removeItem("agrilearn_current_user");
    
    // Redirect to home page
    window.location.href = "index.html";
  }
}

// Get current user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("agrilearn_current_user"));
}

// Check if user is logged in
function isLoggedIn() {
  return getCurrentUser() !== null;
}

// Require login for certain pages
function requireLogin() {
  if (!isLoggedIn()) {
    alert("Please login to access this page!");
    window.location.href = "login.html";
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
  checkUserSession();
});
