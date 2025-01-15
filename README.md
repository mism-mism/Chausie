# Chausie Figma Plugin

Chausie is a powerful Figma plugin designed to streamline your design workflow by automatically integrating data from spreadsheets into your Figma templates. With Chausie, you can effortlessly generate hundreds of creative assets by populating text and images based on your data, saving you time and ensuring consistency across your designs.

## 🛠️ Features

- **Bulk Data Integration**: Import data from CSV spreadsheets to populate multiple templates simultaneously.
- **Automated Text Replacement**: Automatically replace text layers in your templates with data from your spreadsheet.
- **Dynamic Image Replacement**: Replace image placeholders in your templates with images from URLs specified in your data.
- **Easy Export**: Export generated creatives as PNG images directly from Figma.
- **User-Friendly Interface**: Intuitive drag-and-drop interface for uploading your CSV files.

## 📦 Installation

1. **Clone the Repository**

```bash
git clone https://github.com/mism-mism/Chausie.git
cd Chausie
```

2. **Install Dependencies**

Ensure you have [Node.js](https://nodejs.org/) installed. Then, install the necessary packages:

```bash
npm install
```

3. **Build the Plugin**

Compile the TypeScript code to JavaScript:

```bash
npm run build
```

4. **Load the Plugin in Figma**

- Open Figma.
- Navigate to **Plugins > Development > Import Plugin from Manifest...**
- Select the `manifest.json` file from the cloned repository.

## 📖 Usage

### 1. **Prepare Your Template in Figma**

Ensure your Figma template is set up with consistent naming conventions for text and image layers:

- **Text Layers**: Name your text layers using the prefix `text_` followed by the corresponding CSV header.  
**Example**: For a CSV header `username`, name the text layer `text_username`.

- **Image Layers**: Name your image layers using the prefix `image_` followed by the corresponding CSV header.  
**Example**: For a CSV header `profile_image`, name the image layer `image_profile_image`.

### 2. **Prepare Your CSV File**

Create a CSV file with headers matching the layer names in your Figma template (without the prefixes).  
**Example CSV Structure**:

```csv
username,profile_image,bio
JohnDoe,https://example.com/images/johndoe.png,Software Developer at XYZ Corp.
JaneSmith,https://example.com/images/janesmith.png,Graphic Designer at ABC Studio.
```

### 3. **Run the Chausie Plugin**

1. **Open the Plugin Interface**:
- In Figma, go to **Plugins > Development > Chausie**.

2. **Upload Your CSV File**:
- Drag and drop your CSV file into the designated drop zone in the plugin interface.
- The drop zone will confirm the file has been loaded.

3. **Generate Creatives**:
- Click the **"クリエイティブ生成"** (Generate Creatives) button.
- The plugin will process the data, clone the template for each row in the CSV, replace the text and images accordingly, and export each creative as a PNG image.

4. **Download Generated Images**:
- After processing, the plugin will prompt downloads for each generated image.

## ⚙️ Configuration

### **manifest.json**

Ensure your `manifest.json` is correctly configured:

```json
{
"name": "Chausie",
"id": "automator-plugin",
"api": "1.0.0",
"main": "code.js",
"ui": "ui.html",
"editorType": ["figma"],
"permissions": ["currentpage"]
}
```

### **TypeScript Configuration**

Your `tsconfig.json` should be set to compile TypeScript correctly:

```json
{
"compilerOptions": {
"module": "commonjs",
"target": "es6",
"lib": ["es6", "dom"],
"strict": true,
"noImplicitAny": true,
"outDir": "./",
"rootDir": "./",
"esModuleInterop": true
},
"include": ["code.ts"]
}
```

## 🧩 Code Structure

### **code.ts**

The main plugin logic handles parsing the CSV, cloning templates, replacing text and images, and exporting the final creatives.

### **ui.html**

The user interface allows users to upload their CSV files and initiate the creative generation process.

### **styles.css**

Contains any additional styles for the plugin UI. Currently, styles are embedded within `ui.html`, but you can externalize them if needed.

### **package.json**

Manages project dependencies and scripts for building the plugin.

## 🔧 Development

### **Building the Plugin**

To watch for changes and automatically rebuild the plugin during development:

```bash
npm run watch
```

### **Testing the Plugin**

1. **Load the Plugin in Figma** as described in the [Installation](#installation) section.
2. **Run the Plugin** and verify that it correctly processes your CSV data and generates the desired creatives.
3. **Debugging**:
- Open the **Developer Console** in Figma by pressing `Ctrl + Shift + I` (Windows) or `Cmd + Option + I` (Mac) to view logs and debug errors.

## 📝 Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository**
2. **Create a Feature Branch**

```bash
git checkout -b feature/YourFeature
```

3. **Commit Your Changes**

```bash
git commit -m "Add your feature"
```

4. **Push to the Branch**

```bash
git push origin feature/YourFeature
```

5. **Open a Pull Request**

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 📞 Support

If you encounter any issues or have questions, feel free to open an issue on the [GitHub repository](https://github.com/your-username/automator-plugin/issues) or contact the maintainer directly.

---

© 2025 Chausie Plugin. All rights reserved.
```