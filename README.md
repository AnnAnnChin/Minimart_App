# Minimart_App

The application uses the following software stack:
- Frontend: ReactJS (Tested with Firefox 78 ESR)
- Backend: Python Flask (Tested with Python version 3.7.2)
- Database: MySQL (Tested with version 5.5.62)
- Database ORM with Backend: SQLAlchemy package

All the CRUD functionality are accessible and performed on the single web page. For the creation and updating of item, a form will be displayed as an overlay over the web page. Note that the Item ID is automatically assigned based on the timestamp and therefore it is not user-editable.

# Prerequistes and Setup
1. Download and install MySQL. Configure the database URL (Use localhost if database is local), username and password as prompted during installation. Once this is done, start the mysql service. Run the command "CREATE DATABASE minimart_app" to create the schema. Using the schema, setup the database by importing the SQL dump file given in the Database folder in this repo. The SQL dump file contains the Table definition and the test data. 

2. Download and install Python, then install the following Python Packages using pip install command. Additional dependency packages required by the packages will be installed by pip automatically. Once this is done, start the backend by running the python file app.py given the the Backend folder in this repo. When prompted, enter the database URL, username and password configured in Step 1 to connect the Backend to the MySQL service.
- Flask                  1.1.2
- Flask-Cors             3.0.10
- Flask-MySQL            1.5.2
- Flask-SQLAlchemy       2.5.1
- mysql-connector-python 8.0.24
- SQLAlchemy             1.4.11

3. Download and Install NodeJS as the prerequisite, after which, use npm command to install React. Run "create-react-app minimart-app" command to create a React project named minimart_app, then update the created src folder with the src folder given in the Frontend folder in this repo. To start the frontend service, run the command npm start at the folder (....\create-react-app\minimart-app)

# Attempted Objectives
- Both Frontend Webpage and Backend API Server + ORM
