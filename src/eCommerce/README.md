# eCommerce Project

This is an eCommerce web application built using React. The application includes features such as Google OAuth for authentication, routing for different pages, and custom styling.

## Project Structure

```
eCommerce
├── public
│   └── index.html          # Main HTML file for the React application
├── src
│   ├── App.css            # CSS styles specific to the App component
│   ├── App.js             # Main App component that includes routing and other components
│   ├── index.js           # Entry point of the React application
│   ├── reportWebVitals.js  # Functions to measure and report performance metrics
│   ├── css
│   │   └── mystyle.css    # Custom CSS styles for the application
│   ├── Routes
│   │   └── Router.js      # Application's routing logic
│   ├── components         # Reusable React components
│   ├── pages              # Page components representing different views
│   └── assets             # Static assets such as images and fonts
├── package.json           # npm configuration file
└── README.md              # Documentation for the project
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd eCommerce
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Create a `.env` file in the root directory and add your Google Client ID:**
   ```
   REACT_APP_GOOGLE_CLIENT_ID=<your-client-id>
   ```

4. **Run the application:**
   ```
   npm start
   ```

5. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Features

- Google OAuth authentication
- Responsive design using Bootstrap
- Custom styling
- Modular architecture with reusable components

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.