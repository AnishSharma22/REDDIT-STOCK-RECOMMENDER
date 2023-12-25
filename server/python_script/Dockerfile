# Use a Python base image
FROM python:latest

# Set the working directory in the container
WORKDIR /app

# Copy your Python script and other necessary files
COPY . .

# Install the required Python libraries
RUN pip install -r requirements.txt

# Command to run your Python script
CMD ["python", "main.py"]

