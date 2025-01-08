# GemNotes: A simple note-taking web app (Self-hosted Obsidian web alternative)

This project implements a basic note-taking application using a Flask backend and a simple HTML frontend.  Notes are stored as files within a designated directory directly on the server.

## Use case

Users self-hosting their Obsidian vaults may have trouble accessing their notes on certain devices without relying on centralized services potentially compromising their privacy (Especially on iOS devices due to the lack of support for decentralized file syncing and the sandboxing of the different apps).

This project aims to provide a simple solution to this problem by allowing users to access and edit their notes from anywhere through a web application hosted on the same server as their notes.

*I am personally using Obsidian on my computers and syncing them to my home server using the [Syncthing](https://syncthing.net/) service, but I couldn't find a way to access them from my iPhone without relying on a centralized service for syncing. This lets me access my notes on my iPhone while still being able to use Obsidian on my computer.*

> Note: This project is not affiliated with Obsidian or Syncthing.

## Project Structure

* `backend/`: Contains the Flask application code (`api.py`) and `Dockerfile`.
* `frontend/`: Contains the HTML, CSS, and JavaScript for the frontend, and `Dockerfile`. Uses nginx as a web server behind the scenes.
* `docker-compose.yml`: Orchestrates the backend and frontend containers. This is where you can configure the location of your notes folder.


## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone git@github.com:MayeulHP/gemnotes.git && cd gemnotes
   ```

2. **Add the path of your Obsidian vault (or notes folder)**
   In `docker-compose.yml` line 10

3. **Build the Docker images:**
   ```bash
   docker-compose build
   ```

4. **Start the containers:**
   ```bash
   docker-compose up -d
   ```
   *The `-d` option makes it run in the background (detached mode)*

5. **Access the frontend:**
   ```bash
   http://localhost:8080
   ```

## Shutdown

```bash
docker-compose down
```

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please open an issue or submit a pull request. See the below list for planned improvements.

## Todo

List of improvements I plan on adding

- [ ] Responsive design for mobile
- [ ] Improve file explorer
- [ ] Improve UI
- [ ] Change folder location from the UI
- [ ] Live Markdown visualization (WYSIWYG)
- [ ] Functional backlinks
- [ ] Hotkeys
- [ ] Graph view (Obsidian-like)
- [ ] Calendar view inspired by [Obsidian Full Calendar](https://github.com/obsidian-community/obsidian-full-calendar)

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for more information.
