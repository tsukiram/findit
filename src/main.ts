document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  // Create wireframe container
  const wireframeContainer = document.createElement('div');
  wireframeContainer.className = 'wireframe-container';
  app.appendChild(wireframeContainer);

  // Create toast for notifications
  const toast = document.createElement('div');
  toast.className = 'toast';
  app.appendChild(toast);

  // Create all screens
  createLoginScreen(wireframeContainer);
  createHomeScreen(wireframeContainer);
  createSearchResultsScreen(wireframeContainer);
  createBookDetailsScreen(wireframeContainer);
  createBorrowScanFloorScreen(wireframeContainer);
  createBorrowNavigationScreen(wireframeContainer);
  createBorrowScanBookScreen(wireframeContainer);
  createBorrowConfirmationScreen(wireframeContainer);
  createReturnBooksScreen(wireframeContainer);
  createReturnNavigationScreen(wireframeContainer);
  createReturnConfirmationScreen(wireframeContainer);
  createProfileScreen(wireframeContainer);

  // Start with login screen
  showScreen('login-screen');
});

// Navigation functions
function showScreen(screenId: string): void {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    screen.classList.remove('active');
  });

  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');

    // Show bottom navigation for main screens
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
      const showNav = ['home-screen', 'search-results-screen', 'profile-screen'].includes(screenId);
      bottomNav.classList.toggle('hidden', !showNav);

      // Update active nav item
      if (showNav) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));

        let activeNavId = '';
        if (screenId === 'home-screen') activeNavId = 'nav-home';
        else if (screenId === 'search-results-screen') activeNavId = 'nav-search';
        else if (screenId === 'profile-screen') activeNavId = 'nav-profile';

        const activeNav = document.getElementById(activeNavId);
        if (activeNav) activeNav.classList.add('active');
      }
    }
  }
}

function showToast(message: string): void {
  const toast = document.querySelector('.toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
      toast.classList.remove('active');
    }, 3000);
  }
}

// Screen creation functions
function createLoginScreen(container: HTMLElement): void {
  const screen = document.createElement('div');
  screen.id = 'login-screen';
  screen.className = 'screen';

  screen.innerHTML = `
    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
      <h1 style="text-align: center; margin-bottom: 30px; font-size: 24px;">FindIt</h1>

      <div class="input-group">
        <label for="user-id">ID</label>
        <input type="text" id="user-id" placeholder="Enter your ID">
      </div>

      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password">
      </div>

      <div class="error-message" id="login-error">Invalid ID or password. Please try again.</div>

      <button id="login-button">Login</button>
    </div>
  `;

  container.appendChild(screen);

  // Add event listeners
  const loginButton = screen.querySelector('#login-button');
  loginButton?.addEventListener('click', () => {
    const userId = (screen.querySelector('#user-id') as HTMLInputElement)?.value;
    const password = (screen.querySelector('#password') as HTMLInputElement)?.value;

    if (userId && password) {
      showScreen('home-screen');
      showToast('Login successful');
    } else {
      const errorEl = screen.querySelector('#login-error');
      errorEl?.classList.add('active');

      setTimeout(() => {
        errorEl?.classList.remove('active');
      }, 3000);
    }
  });
}

function createHomeScreen(container: HTMLElement): void {
  const screen = document.createElement('div');
  screen.id = 'home-screen';
  screen.className = 'screen';

  screen.innerHTML = `
    <div class="header">
      <div class="header-title">FindIt</div>
    </div>

    <div class="search-bar">
      <input type="text" placeholder="Search books...">
      <button id="search-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </button>
    </div>

    <div class="quick-actions">
      <div class="button" id="borrow-button">Borrow Book</div>
      <div class="button" id="return-button">Return Book</div>
      <div class="button" id="profile-button">My Profile</div>
    </div>

    <div class="section-title">Recently Searched</div>

    <div class="list-item">
      <div class="item-details">
        <div class="item-title">Dasar Pemrograman Web</div>
        <div class="item-subtitle">Budi Raharjo</div>
      </div>
      <span class="badge available">Available</span>
    </div>

    <div class="list-item">
      <div class="item-details">
        <div class="item-title">Algoritma & Pemrograman C++</div>
        <div class="item-subtitle">Rinaldi Munir</div>
      </div>
      <span class="badge unavailable">Borrowed</span>
    </div>

    <div class="list-item">
      <div class="item-details">
        <div class="item-title">Pemrograman Android</div>
        <div class="item-subtitle">Aditya Rahman</div>
      </div>
      <span class="badge available">Available</span>
    </div>

    <div class="bottom-nav">
      <div class="nav-item active" id="nav-home">
        <span class="nav-icon">🏠</span>
        Home
      </div>
      <div class="nav-item" id="nav-search">
        <span class="nav-icon">🔍</span>
        Search
      </div>
      <div class="nav-item" id="nav-profile">
        <span class="nav-icon">👤</span>
        Profile
      </div>
    </div>
  `;

  container.appendChild(screen);

  // Add event listeners
  screen.querySelector('#search-button')?.addEventListener('click', () => {
    showScreen('search-results-screen');
  });

  screen.querySelector('#borrow-button')?.addEventListener('click', () => {
    showScreen('search-results-screen');
  });

  screen.querySelector('#return-button')?.addEventListener('click', () => {
    showScreen('return-books-screen');
  });

  screen.querySelector('#profile-button')?.addEventListener('click', () => {
    showScreen('profile-screen');
  });

  screen.querySelector('#nav-search')?.addEventListener('click', () => {
    showScreen('search-results-screen');
  });

  screen.querySelector('#nav-profile')?.addEventListener('click', () => {
    showScreen('profile-screen');
  });

  // Make list items clickable
  const listItems = screen.querySelectorAll('.list-item');
  listItems.forEach(item => {
    item.addEventListener('click', () => {
      showScreen('book-details-screen');
    });
  });
}

function createSearchResultsScreen(container: HTMLElement): void {
  const screen = document.createElement('div');
  screen.id = 'search-results-screen';
  screen.className = 'screen';

  screen.innerHTML = `
    <div class="header">
      <span class="back-button" id="search-back">←</span>
      <div class="header-title">Search Results</div>
    </div>

    <div class="search-bar">
      <input type="text" placeholder="Search books..." value="programming">
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </button>
    </div>

    <div class="list-item">
      <div class="item-details">
        <div class="item-title">Clean Code</div>
        <div class="item-subtitle">Robert C. Martin</div>
      </div>
      <span class="badge available">Available</span>
    </div>

    <div class="list-item">
      <div class="item-details">
        <div class="item-title">The Pragmatic Programmer</div>
        <div class="item-subtitle">Andrew Hunt, David Thomas</div>
      </div>
      <span class="badge available">Available</span>
    </div>

    <div class="list-item">
      <div class="item-details">
        <div class="item-title">Design Patterns</div>
        <div class="item-subtitle">Erich Gamma, et al.</div>
      </div>
      <span class="badge unavailable">Borrowed</span>
    </div>

    <div class="list-item">
      <div class="item-details">
        <div class="item-title">Refactoring</div>
        <div class="item-subtitle">Martin Fowler</div>
      </div>
      <span class="badge available">Available</span>
    </div>

    <div class="list-item">
      <div class="item-details">
        <div class="item-title">JavaScript: The Good Parts</div>
        <div class="item-subtitle">Douglas Crockford</div>
      </div>
      <span class="badge available">Available</span>
    </div>

    <div class="bottom-nav">
      <div class="nav-item" id="nav-home-search">
        <span class="nav-icon">🏠</span>
        Home
      </div>
      <div class="nav-item active" id="nav-search-search">
        <span class="nav-icon">🔍</span>
        Search
      </div>
      <div class="nav-item" id="nav-profile-search">
        <span class="nav-icon">👤</span>
        Profile
      </div>
    </div>
  `;

  container.appendChild(screen);

  // Add event listeners
  screen.querySelector('#search-back')?.addEventListener('click', () => {
    showScreen('home-screen');
  });

  screen.querySelector('#nav-home-search')?.addEventListener('click', () => {
    showScreen('home-screen');
  });

  screen.querySelector('#nav-profile-search')?.addEventListener('click', () => {
    showScreen('profile-screen');
  });

  // Make list items clickable
  const listItems = screen.querySelectorAll('.list-item');
  listItems.forEach(item => {
    item.addEventListener('click', () => {
      showScreen('book-details-screen');
    });
  });
}

function createBookDetailsScreen(container: HTMLElement): void {
  const screen = document.createElement('div');
  screen.id = 'book-details-screen';
  screen.className = 'screen';

  screen.innerHTML = `
    <div class="header">
      <span class="back-button" id="details-back">←</span>
      <div class="header-title">Book Details</div>
    </div>

    <h2 style="margin-bottom: 5px;">Clean Code</h2>
    <p style="color: var(--secondary-color); margin-bottom: 15px;">Robert C. Martin</p>

    <div style="border: 1px solid var(--border-color); width: 120px; height: 180px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; color: var(--secondary-color);">
      Book Cover
    </div>

    <p style="margin-bottom: 20px;">
      A handbook of agile software craftsmanship that helps programmers write clean, maintainable code.
    </p>

    <div class="section-title">Location</div>
    <p>Floor: 3</p>
    <p>Shelf: CS-101</p>

    <div class="map-container">
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--secondary-color);">
        Floor Map
      </div>
      <div class="map-marker" style="top: 75px; left: 150px;"></div>
    </div>

    <div class="action-buttons">
      <button id="borrow-this-book">Borrow</button>
    </div>
  `;

  container.appendChild(screen);

  // Add event listeners
  screen.querySelector('#details-back')?.addEventListener('click', () => {
    showScreen('search-results-screen');
  });

  screen.querySelector('#borrow-this-book')?.addEventListener('click', () => {
    showScreen('borrow-scan-floor-screen');
  });
}

function createBorrowScanFloorScreen(container: HTMLElement): void {
  const screen = document.createElement('div');
  screen.id = 'borrow-scan-floor-screen';
  screen.className = 'screen';

  screen.innerHTML = `
    <div class="header">
      <span class="back-button" id="scan-floor-back">←</span>
      <div class="header-title">Scan Floor QR Code</div>
    </div>

    <div class="scanner-overlay">
      <div class="scanner-frame"></div>
      <div class="scanner-text">Align the QR code for Floor 3 within the frame to verify your location</div>
      <button id="simulate-floor-scan" style="width: auto; margin-top: 20px;">Simulate Successful Scan</button>
    </div>
  `;

  container.appendChild(screen);

  // Add event listeners
  screen.querySelector('#scan-floor-back')?.addEventListener('click', () => {
    showScreen('book-details-screen');
  });

  screen.querySelector('#simulate-floor-scan')?.addEventListener('click', () => {
    showScreen('borrow-navigation-screen');
  });
}

function createBorrowNavigationScreen(container: HTMLElement): void {
  const screen = document.createElement('div');
  screen.id = 'borrow-navigation-screen';
  screen.className = 'screen';

  screen.innerHTML = `
    <div class="header">
      <span class="back-button" id="navigation-back">←</span>
      <div class="header-title">Navigate to Book</div>
    </div>

    <div style="text-align: center; margin-bottom: 15px;">
      <h2 style="font-size: 18px; margin-bottom: 5px;">Clean Code</h2>
      <p style="color: var(--secondary-color); font-size: 14px;">Floor: 3, Shelf: CS-101</p>
    </div>

    <div class="map-container">
      <div class="ar-indicator">AR View Active</div>

      <div class="map-3d-view">
        <!-- Floor grid -->
        <div class="map-floor"></div>

        <!-- Walls representing bookshelves -->
        <div class="map-wall horizontal" style="top: 50px; left: 40px;"></div>
        <div class="map-wall horizontal" style="top: 50px; left: 140px;"></div>
        <div class="map-wall horizontal" style="top: 150px; left: 40px;"></div>
        <div class="map-wall horizontal" style="top: 150px; left: 140px;"></div>
        <div class="map-wall horizontal" style="top: 250px; left: 40px;"></div>
        <div class="map-wall horizontal" style="top: 250px; left: 140px;"></div>

        <div class="map-wall vertical" style="top: 70px; left: 40px;"></div>
        <div class="map-wall vertical" style="top: 70px; left: 220px;"></div>
        <div class="map-wall vertical" style="top: 170px; left: 40px;"></div>
        <div class="map-wall vertical" style="top: 170px; left: 220px;"></div>

        <!-- Your current location marker -->
        <div class="map-marker user" style="top: 200px; left: 50px;"></div>

        <!-- Book location marker -->
        <div class="map-marker book" style="top: 75px; left: 180px;"></div>

        <!-- Path between markers -->
        <div class="map-path" style="top: 200px; left: 50px; width: 130px; transform: rotate(-45deg); transform-origin: left;"></div>
        <div class="map-path" style="top: 75px; left: 180px; width: 0; height: 0;"></div>
      </div>
    </div>

    <div style="background-color: var(--surface-color); padding: 15px; border-radius: 10px; margin-top: 15px;">
      <p style="font-weight: 500; margin-bottom: 10px;">Directions:</p>
      <ol style="padding-left: 20px; font-size: 14px; color: var(--secondary-color);">
        <li style="margin-bottom: 8px;">Walk straight ahead past 2 bookshelves</li>
        <li style="margin-bottom: 8px;">Turn right at the Computer Science section</li>
        <li>The book is on the 3rd shelf from the top</li>
      </ol>
    </div>

    <button id="found-book-button" style="margin-top: 15px;">I Found the Book</button>
  `;

  container.appendChild(screen);

  // Add event listeners
  screen.querySelector('#navigation-back')?.addEventListener('click', () => {
    showScreen('borrow-scan-floor-screen');
  });

  screen.querySelector('#found-book-button')?.addEventListener('click', () => {
    showScreen('borrow-scan-book-screen');
  });
}

function createBorrowScanBookScreen(container: HTMLElement): void {
  const screen = document.createElement('div');
  screen.id = 'borrow-scan-book-screen';
  screen.className = 'screen';

  screen.innerHTML = `
    <div class="header">
      <span class="back-button" id="scan-book-back">←</span>
      <div class="header-title">Scan Book Barcode</div>
    </div>

    <div class="scanner-overlay">
      <div class="scanner-frame"></div>
      <div class="scanner-text">Align the barcode on the back of the book within the frame to verify</div>
      <button id="simulate-book-scan" style="width: auto; margin-top: 20px;">Simulate Successful Scan</button>
    </div>
  `;

  container.appendChild(screen);

  // Add event listeners
  screen.querySelector('#scan-book-back')?.addEventListener('click', () => {
    showScreen('borrow-navigation-screen');
  });

  screen.querySelector('#simulate-book-scan')?.addEventListener('click', () => {
    showScreen('borrow-confirmation-screen');
  });
}

function createReturnNavigationScreen(container: HTMLElement): void {
  const screen = document.createElement('div');
  screen.id = 'return-navigation-screen';
  screen.className = 'screen';

  screen.innerHTML = `
    <div class="header">
      <span class="back-button" id="return-navigation-back">←</span>
      <div class="header-title">Navigate to Return Shelf</div>
    </div>

    <div style="text-align: center; margin-bottom: 15px;">
      <h2 style="font-size: 18px; margin-bottom: 5px;">Return Book</h2>
      <p style="color: var(--secondary-color); font-size: 14px;">Clean Code by Robert C. Martin</p>
      <p style="color: var(--secondary-color); font-size: 14px;">Go to Return Shelf on Floor 2</p>
    </div>

    <div class="map-container">
      <div class="ar-indicator">AR View Active</div>

      <div class="map-3d-view">
        <!-- Floor grid -->
        <div class="map-floor"></div>

        <!-- Walls representing areas and desks -->
        <div class="map-wall horizontal" style="top: 50px; left: 40px;"></div>
        <div class="map-wall horizontal" style="top: 50px; left: 140px;"></div>
        <div class="map-wall horizontal" style="top: 130px; left: 250px; width: 40px;"></div>
        <div class="map-wall vertical" style="top: 50px; left: 220px;"></div>
        <div class="map-wall vertical" style="top: 140px; left: 40px;"></div>
        <div class="map-wall vertical" style="top: 170px; left: 220px;"></div>

        <!-- Your current location marker -->
        <div class="map-marker user" style="top: 200px; left: 50px;"></div>

        <!-- Return shelf location marker -->
        <div class="map-marker book" style="top: 100px; left: 250px;"></div>

        <!-- Path between markers -->
        <div class="map-path" style="top: 200px; left: 50px; width: 150px; transform: rotate(-45deg); transform-origin: left;"></div>
        <div class="map-path" style="top: 100px; left: 170px; width: 80px;"></div>
      </div>
    </div>

    <div style="background-color: var(--surface-color); padding: 15px; border-radius: 10px; margin-top: 15px;">
      <p style="font-weight: 500; margin-bottom: 10px;">Directions:</p>
      <ol style="padding-left: 20px; font-size: 14px; color: var(--secondary-color);">
        <li style="margin-bottom: 8px;">Walk straight towards the study area</li>
        <li style="margin-bottom: 8px;">Turn right at the information desk</li>
        <li>The return shelf is next to the librarian's counter</li>
      </ol>
    </div>

    <button id="at-return-shelf-button" style="margin-top: 15px;">I'm at the Return Shelf</button>
  `;

  container.appendChild(screen);

  // Add event listeners
  screen.querySelector('#return-navigation-back')?.addEventListener('click', () => {
    showScreen('return-books-screen');
  });

  screen.querySelector('#at-return-shelf-button')?.addEventListener('click', () => {
    showScreen('return-confirmation-screen');
  });
}

function createBorrowConfirmationScreen(container: HTMLElement): void {
  const screen = document.createElement('div');
  screen.id = 'borrow-confirmation-screen';
  screen.className = 'screen';

  screen.innerHTML = `
    <div class="header">
      <div class="header-title">Borrow Confirmation</div>
    </div>

    <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
      <div style="font-size: 60px; margin-bottom: 20px;">✅</div>
      <h2 style="margin-bottom: 15px;">Book Borrowed Successfully</h2>
      <p style="margin-bottom: 10px;">Clean Code by Robert C. Martin</p>
      <p style="margin-bottom: 30px;">Due date: April 28, 2025</p>

      <button id="borrow-done-button">Done</button>
    </div>
  `;

  container.appendChild(screen);

  // Add event listeners
  screen.querySelector('#borrow-done-button')?.addEventListener('click', () => {
    showScreen('home-screen');
    showToast('Book borrowed successfully');
  });
}

function createReturnBooksScreen(container: HTMLElement): void {
  const screen = document.createElement('div');
  screen.id = 'return-books-screen';
  screen.className = 'screen';

  screen.innerHTML = `
    <div class="header">
      <span class="back-button" id="return-list-back">←</span>
      <div class="header-title">Return Book</div>
    </div>

    <div class="section-title">Borrowed Books</div>

    <div class="list-item">
      <div class="item-details">
        <div class="item-title">Clean Code</div>
        <div class="item-subtitle">Due: April 28, 2025</div>
      </div>
      <button class="button" id="return-book-button" style="width: auto;">Return</button>
    </div>

    <div class="list-item">
      <div class="item-details">
        <div class="item-title">To Kill a Mockingbird</div>
        <div class="item-subtitle">Due: May 2, 2025</div>
      </div>
      <button class="button" style="width: auto;">Return</button>
    </div>
  `;

  container.appendChild(screen);

  // Add event listeners
  screen.querySelector('#return-list-back')?.addEventListener('click', () => {
    showScreen('home-screen');
  });

  screen.querySelector('#return-book-button')?.addEventListener('click', () => {
    showScreen('return-navigation-screen');
  });
}

function createReturnConfirmationScreen(container: HTMLElement): void {
  const screen = document.createElement('div');
  screen.id = 'return-confirmation-screen';
  screen.className = 'screen';

  screen.innerHTML = `
    <div class="header">
      <div class="header-title">Return Confirmation</div>
    </div>

    <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
      <div style="font-size: 60px; margin-bottom: 20px;">✅</div>
      <h2 style="margin-bottom: 15px;">Book Returned Successfully</h2>
      <p style="margin-bottom: 30px;">Clean Code by Robert C. Martin</p>

      <button id="return-done-button">Done</button>
    </div>
  `;

  container.appendChild(screen);

  // Add event listeners
  screen.querySelector('#return-done-button')?.addEventListener('click', () => {
    showScreen('home-screen');
    showToast('Book returned successfully');
  });
}

function createProfileScreen(container: HTMLElement): void {
  const screen = document.createElement('div');
  screen.id = 'profile-screen';
  screen.className = 'screen';

  screen.innerHTML = `
    <div class="header">
      <div class="header-title">My Profile</div>
    </div>

    <div class="user-info">
      <h2>Viona UIN</h2>
      <p>ID: RAMM1703</p>
      <p>Email: ramm.k@campus.edu</p>
    </div>

    <div class="section-title">Borrowed Books</div>

    <div class="list-item">
      <div class="item-details">
        <div class="item-title">Clean Code</div>
        <div class="item-subtitle">Due: 28 Apr 2025</div>
      </div>
    </div>

    <div class="list-item">
      <div class="item-details">
        <div class="item-title">To Kill a Mockingbird</div>
        <div class="item-subtitle">Due: 2 May 2025</div>
      </div>
    </div>

    <button id="logout-button">Logout</button>

    <div class="bottom-nav">
      <div class="nav-item" id="nav-home-profile">
        <span class="nav-icon">🏠</span>
        Home
      </div>
      <div class="nav-item" id="nav-search-profile">
        <span class="nav-icon">🔍</span>
        Search
      </div>
      <div class="nav-item active" id="nav-profile-profile">
        <span class="nav-icon">👤</span>
        Profile
      </div>
    </div>
  `;

  container.appendChild(screen);

  // Add event listeners
  screen.querySelector('#logout-button')?.addEventListener('click', () => {
    showScreen('login-screen');
  });

  screen.querySelector('#nav-home-profile')?.addEventListener('click', () => {
    showScreen('home-screen');
  });

  screen.querySelector('#nav-search-profile')?.addEventListener('click', () => {
    showScreen('search-results-screen');
  });
}
