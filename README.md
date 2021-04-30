# Minimart_App

The application uses the following software stack:
- Frontend: ReactJS
- Backend: Python Flask (Tested with Python version 3.7.2)
- Database: MYSQL (Tested with version 5.5.62)
- Database ORM with Backend: SQLAlchemy package

# Prerequistes and Setup
1. Download and install MYSQL. Create the database schema minimart_app. Using the schema, setup the database by importing the SQL dump file in the Database folder. The SQL dump file contains the Table definition and the test data. Start the mysql service. Setup the database URL (Use localhost if database is local), username and password as required.

2. Download and install Python, then install the following Python Packages using pip install command. Additional dependency packages required by the packages will be installed by pip. Once this step is done, start the backend app.py by running python app.py. When prompted, enter the database URL, username and password as per Step 1 to connect the Backend to the MySQL service.
--> Flask                  1.1.2
--> Flask-Cors             3.0.10
--> Flask-MySQL            1.5.2
--> Flask-SQLAlchemy       2.5.1
--> mysql-connector-python 8.0.24
--> SQLAlchemy             1.4.11

3. Download and Install NodeJS as the prerequisite, after which, use npm to run the create-react-app command to install React. To start the frontend service, run the command npm start at the folder (....\create-react-app\minimart-app)

# Attempted Objectives
- Both Frontend Webpage and Backend API Server + ORM
