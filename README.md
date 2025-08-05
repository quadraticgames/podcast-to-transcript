# Podcast to Transcript

A web application that converts podcast audio into text transcripts using AI. This tool leverages Google's Gemini AI to provide accurate transcriptions of podcast episodes.

## Features

- Upload podcast audio files for transcription
- View and edit transcriptions
- Save and export transcripts in various formats
- Responsive design for desktop and mobile use

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Google Gemini API key

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/podcast-to-transcript.git
   cd podcast-to-transcript
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your Gemini API key:
     ```
     VITE_GEMINI_API_KEY=your_gemini_api_key_here
     ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

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

| Variable           | Description                           | Required |
|--------------------|---------------------------------------|----------|
| VITE_GEMINI_API_KEY | Your Google Gemini API key           | Yes      |

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
