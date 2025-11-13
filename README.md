# Catalogue Portal with Quantity

A simple, elegant web application for managing product catalogues with quantity tracking. Built with vanilla HTML, CSS, and JavaScript.

## Features

- ✨ **Add Products**: Easily add new products with name, description, price, and quantity
- 📊 **Track Inventory**: View total items and stock levels at a glance
- ✏️ **Edit Items**: Update product information anytime
- 🗑️ **Delete Items**: Remove products from the catalogue
- 💾 **Persistent Storage**: All data is saved locally in your browser
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean, intuitive interface with smooth animations

## Getting Started

### Prerequisites

No installation required! This is a pure HTML/CSS/JavaScript application.

### Running the Application

1. Clone this repository:
   ```bash
   git clone https://github.com/ashwinjain5/catalogue-portal---with-Quantity.git
   cd catalogue-portal---with-Quantity
   ```

2. Open `index.html` in your web browser:
   - Double-click the `index.html` file, or
   - Use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     ```
   - Then navigate to `http://localhost:8000` in your browser

## Usage

### Adding Items

1. Fill in the form on the left side with:
   - **Product Name**: Name of the product
   - **Description**: Brief description of the product
   - **Price**: Product price in dollars
   - **Quantity**: Available stock quantity

2. Click **Add Item** to add the product to the catalogue

### Managing Items

- **Edit**: Click the green "Edit" button on any item to modify its details
- **Delete**: Click the red "Delete" button to remove an item (confirmation required)

### Quantity Indicators

- **Blue Badge**: Normal stock (10+ items)
- **Red Badge**: Low stock (1-9 items)
- **Gray Badge**: Out of stock (0 items)

### Statistics

The catalogue displays:
- **Total Items**: Number of different products in the catalogue
- **Total Stock**: Sum of all product quantities

## Data Storage

All catalogue data is stored in your browser's local storage, which means:
- ✅ Data persists between sessions
- ✅ No server required
- ⚠️ Data is specific to the browser and device
- ⚠️ Clearing browser data will erase the catalogue

## Browser Support

This application works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## File Structure

```
catalogue-portal---with-Quantity/
├── index.html      # Main HTML structure
├── style.css       # Styling and layout
├── script.js       # Application logic
└── README.md       # Documentation
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript (ES6+)**: Application logic and DOM manipulation
- **LocalStorage API**: Data persistence

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.