## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AdityaMadhukar/StickyNotes.git

2. Navigate to server and client directories and install dependencies
    ```terminal
    npm install 

    npm install --force
## Configuration

1. Create .env files in each of the client and server folders
2. Add env variables as shown in example.env files in both folders

## Running 

1. Navigate to server directory
    ```terminal
    npm run dev
2. Navigate to client directory
    ```terminal
    npm run start
## Database Structure

                        +-------------------+
                        |       user        |
                        +-------------------+
                        | id (PK)           |
                        | name              |
                        | email             |
                        | password          |
                        | role              |
                        +-------------------+
                                |
                                |
                                | foreign key
                                |
                                v
        +-------------------+       +-------------------+
        |       notes       |       |        log        |
        +-------------------+       +-------------------+
        | id (PK)           |       | id (PK)           |
        | userID (FK)       |<----->| userID (FK)       |
        | note              |       | description       |
        | status            |       | timestamp         |
        +-------------------+       +-------------------+


