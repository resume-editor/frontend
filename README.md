# Resume Editor - Frontend
Frontend application for the Resume Editor platform, built using Next.js.

# Setup
## Clone this repository
Run `git clone https://github.com/resume-editor/frontend.git`

## Install Dependencies
Run `npm i`

## Setup Environment Variables
Copy .env.example to .env
```bash
cp .env.example .env
```

| Variable Name              | Description       | Value                    |
| -------------------------- | ----------------- | ------------------------ |
| `NEXT_PUBLIC_API_BASE_URL` | Your API base URL | `http://localhost:3000/` |

## Run Server
- Development mode
Run `npm run dev`

- Production mode
Build app `npm run build`
Run app `npm run start`


# Related Services
- Backend: https://github.com/resume-editor/backend
- Resume Compiler: https://github.com/resume-editor/compiler