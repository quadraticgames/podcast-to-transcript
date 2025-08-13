# Podcast to Transcript

A simple web application that converts podcast audio files into clean, easy-to-read text transcripts using AI. No technical skills required!

## ✨ Features

- 🎙️ Upload any podcast MP3 file
- 📝 Get clean, timestamp-free transcripts
- 📋 Copy text to clipboard with one click
- 💾 Download as markdown file
- 📱 Works on both computers and mobile devices

## 🚀 Quick Start Guide (For Everyone!)

### Step 1: Download the Application

1. Click the green "Code" button at the top right of this page
2. Click "Download ZIP"
3. Unzip the folder to a location you can easily find (like your Desktop)

### Step 2: Install Required Software

1. **Install Node.js** (this lets your computer run the application):
   - Go to [https://nodejs.org/](https://nodejs.org/)
   - Download and run the installer (choose the LTS version)
   - Follow the installation instructions (just keep clicking "Next" with default settings)

### Step 3: Get a Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/)
2. Sign in with your Google account
3. Click "Get API Key" in the left sidebar
4. Click "Create API Key" and copy the key that appears

### Step 4: Set Up the Application

1. Open the unzipped folder you downloaded earlier
2. Right-click on any empty space inside the folder and select "Open in Terminal" (Windows) or "Open in Terminal" (Mac)
3. In the terminal window that opens, type this command and press Enter:
   ```
   npm install
   ```
   (This might take a few minutes - it's downloading everything the app needs)

4. In the same folder, right-click and create a new text file
5. Name it exactly: `.env.local` (including the dot at the beginning)
6. Open the file and paste this line, replacing `your_api_key_here` with the key you got from Google:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
   Note: `VITE_GEMINI_API_KEY` also works; the app reads either.
7. Save the file

### Step 5: Run the Application

1. Go back to the terminal window
2. Type this command and press Enter:
   ```
   npm run dev
   ```
3. Wait until you see a message with a local URL (it will look like `http://localhost:5173`)
4. Hold Ctrl (or Cmd on Mac) and click the URL to open it in your web browser

### Step 6: Start Transcribing!

1. Click "Choose File" to select an MP3 file from your computer
2. Wait for the transcription to complete (this might take a few minutes for long podcasts)
3. Once done, you can:
   - Read the transcript directly in your browser
   - Click "Copy to Clipboard" to copy the text
   - Click "Download as Markdown" to save the transcript as a file

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally

## Project Structure

```
podcast-to-transcript/
├── components/      # React components
├── services/        # API and service layer
├── public/          # Static assets
├── src/
│   ├── App.tsx      # Main application component
│   ├── main.tsx     # Application entry point
│   └── ...
├── .env.local       # Environment variables
├── index.html       # HTML template
├── package.json     # Project dependencies
└── tsconfig.json    # TypeScript configuration
```

## Configuration

All configuration is done through environment variables in the `.env.local` file:

| Variable                      | Description                           | Required |
|-------------------------------|---------------------------------------|----------|
| GEMINI_API_KEY                | Your Google Gemini API key            | Yes      |
| VITE_GEMINI_API_KEY (optional)| Alternative name also supported       | No       |

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
- Powered by [Google Gemini AI](https://ai.google/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
