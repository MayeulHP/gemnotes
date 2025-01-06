# GemNotes: A simple note-taking web app (Self-hosted Obsidian web alternative)

This project implements a basic note-taking application using a Flask backend and a simple HTML frontend.  Notes are stored as files within a designated directory directly on the server.

## Use case

Users self-hosting their Obsidian vaults may have trouble syncing their notes across multiple devices and accessing them from multiple locations without relying on centralized services (Especially on iOS devices due to the lack of support for decentralized file syncing and the sandboxing of the different apps).

This project aims to provide a simple solution to this problem by allowing users to access and edit their notes from anywhere, without the need for a centralized service.

*I am personally using Obsidian on my computers and syncing them to my home server using the [Syncthing](https://syncthing.net/) service, but I couldn't find a way to access them from my iPhone or iPad without relying on a centralized service due to the lack of decentralized file syncing and sandboxing. This lets me access my notes on my iPhone while still being able to use Obsidian on my computer.*

> Note: This project is not affiliated with Obsidian or Syncthing.

## Project Structure

* `backend/`: Contains the Flask application code (`api.py`) and `Dockerfile`.
* `frontend/`: Contains the HTML, CSS, and JavaScript for the frontend, and `Dockerfile`.
* `docker-compose.yml`: Orchestrates the backend and frontend containers.


## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone git@github.com:MayeulHP/gemnotes.git
   ```

2. **Add the path of your Obsidian vault (or notes folder)**
   In `docker-compose.yml` line 10

3. **Build the Docker images:**
   ```bash
   docker-compose build
   ```

4. **Start the containers:**
   ```bash
   docker-compose up
   ```

5. **Access the frontend:**
   ```bash
   http://localhost:8080
   ```

## Shutdown

```bash
docker-compose down
```

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for more information.
