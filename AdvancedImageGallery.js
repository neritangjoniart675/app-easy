/* 
Filename: AdvancedImageGallery.js
Content: An advanced image gallery with dynamic image loading and filters.
*/

// Create image gallery object
const ImageGallery = {
  images: [],
  filters: [],
  
  // Method to add images to the gallery
  addImage(imageName, category) {
    const image = {
      name: imageName,
      category: category
    };

    this.images.push(image);
  },

  // Method to remove an image from the gallery
  removeImage(imageName) {
    this.images = this.images.filter(image => image.name !== imageName);
  },

  // Method to add filters to the gallery
  addFilter(filterName, filterFunction) {
    const filter = {
      name: filterName,
      function: filterFunction
    };

    this.filters.push(filter);
  },

  // Method to remove a filter from the gallery
  removeFilter(filterName) {
    this.filters = this.filters.filter(filter => filter.name !== filterName);
  },

  // Method to display images with applied filters
  displayFilteredImages() {
    const filteredImages = this.images.filter(image => {
      return this.filters.every(filter => {
        return filter.function(image);
      });
    });

    filteredImages.forEach(image => {
      console.log(`Image: ${image.name}`);
    });
  }
};

// Add sample images to the gallery
ImageGallery.addImage('Nature1.jpg', 'Nature');
ImageGallery.addImage('Nature2.jpg', 'Nature');
ImageGallery.addImage('City1.jpg', 'City');
ImageGallery.addImage('City2.jpg', 'City');
ImageGallery.addImage('Food1.jpg', 'Food');
ImageGallery.addImage('Food2.jpg', 'Food');

// Define filter functions
const natureFilter = image => image.category === 'Nature';
const cityFilter = image => image.category === 'City';
const foodFilter = image => image.category === 'Food';

// Add filters to the gallery
ImageGallery.addFilter('Nature', natureFilter);
ImageGallery.addFilter('City', cityFilter);
ImageGallery.addFilter('Food', foodFilter);

// Display all images by default
console.log('All Images:');
ImageGallery.displayFilteredImages();

// Remove the city filter and display filtered images
ImageGallery.removeFilter('City');
console.log('Images without the City filter:');
ImageGallery.displayFilteredImages();