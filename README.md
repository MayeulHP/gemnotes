# GemNotes: A Simple Note-Taking Application

This project implements a basic note-taking application using a Flask backend and a simple HTML frontend.  Notes are stored as files within a designated directory.

## Project Structure

* `backend/`: Contains the Flask application code (`api.py`) and `Dockerfile`.
* `frontend/`: Contains the HTML, CSS, and JavaScript for the frontend, and `Dockerfile`.
* `docker-compose.yml`: Orchestrates the backend and frontend containers.


## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   ```

2. **Build the Docker images:**
   ```bash
   docker-compose build
   ```

3. **Start the containers:**
   ```bash
   docker-compose up
   ```

4. **Access the frontend:**
   ```bash
   http://localhost:8080
   ```