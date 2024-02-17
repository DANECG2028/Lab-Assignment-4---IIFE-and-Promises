//This script fetches the student data from 'students.json', creates HTML elements
//dynamically to display the data, and appends them to the '<div>' with the id '"student-data"'. The code is wrapped in an IIFE to ensure it executes immediately when the script
//is loaded.
//The .then() method after the fetch() call checks if the response is okay using reponse.ok. If it's not, it throws an error.
//The catch() method catches any errors that occur during the fetch process and displays an error message. 
//Inside the catch block, a new <p> element is created to display the error message, and it's appended to the document body. The error message is also logged to the console
//for debugging purposes. 

(function() {
    //Fetch student data from students.json
    fetch('students.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(students => {
            //Get the container element
            const container = document.getElementById("student-data");

            //Loop through each student and create HTML elements to display their data
            students.forEach(student => {
                // Create a <div> element for each student
                const studentDiv = document.createElement("div");
                studentDiv.classList.add("student");

                //Create <p> elements for each property and append them to the student <div>
                const namePara = document.createElement("p");
                namePara.textContent = "Name: " + student.name;
                studentDiv.appendChild(namePara);

                const agePara = document.createElement("p");
                agePara.textContent = "Age: " + student.age;
                studentDiv.appendChild(agePara);

                const gradePara = document.createElement("p");
                gradePara.textContent = "Grade: " + student.grade;
                studentDiv.appendChild(gradePara);

                const majorPara = document.createElement("p");
                majorPara.textContent = "Major: " + student.major;
                studentDiv.appendChild(majorPara);

                //Append the student <div> to the container
                container.appendChild(studentDiv);
            });
        })
        .catch(error => {
            // Display error message
            const errorMessage = document.createElement("p");
            errorMessage.textContent = "Error fetching student data: " + error.message;
            document.body.appendChild(errorMessage);
            console.error('Error fetching student data:', error);
        });
})();



//Function to fetch student data asynchronously
function fetchData() {
    return new Promise((resolve, reject) => {
        //Simulate fetching data from students.json with Fetch API
        fetch('students.json')
            .then(response => {
                //Check if response is ok
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(students => {
                //Simulate delay of 2 seconds
                setTimeout(() => {
                    //Resolve with array of student objects
                    resolve(students);
                }, 2000);
            })
            .catch(error => {
                //Reject with error message
                reject(error.message);
            });
    });
}



//Filter and display Computer Science students with age greater than 20
document.getElementById("filterComputerScience").addEventListener("click", function() {
    //Fetch data asynchronously
    fetchData()
        .then(students => {
            //Filter students based on specified criteria
            const filteredStudents = students.filter(student => student.major === "Computer Science" && student.age > 20);
            // Display filtered students
            displayStudents(filteredStudents);
        })
        .catch(error => {
            //Display error message if fetching data fails
            displayError(error);
        });
});

//Calculate and display average age of all students
document.getElementById("calculateAverageAge").addEventListener("click", function() {
    //Fetch data asynchronously
    fetchData()
        .then(students => {
            //Calculate total age of all students
            const totalAge = students.reduce((sum, student) => sum + student.age, 0);
            //Calculate average age
            const averageAge = totalAge / students.length;
            //Display average age
            displayMessage("Average Age of All Students: " + averageAge.toFixed(2));
        })
        .catch(error => {
            //Display error message if fetching data fails
            displayError(error);
        });
});

//Filter and display students with odd index values
document.getElementById("filterOddIndex").addEventListener("click", function() {
    fetchData()
        .then(students => {
            const filteredStudents = students.filter((student, index) => index % 2 !== 0);
            displayStudents(filteredStudents);
        })
        .catch(error => {
            displayError(error);
        });
});

//Helper function to display students' information
function displayStudents(students) {
    //Get the container element
    const container = document.getElementById("student-data");
    container.innerHTML = ""; //Clear previous data
     
    //Loop through each student and create HTML elements to display their data
    students.forEach(student => {
        //Create a <div> element for each student
        const studentDiv = document.createElement("div");
        studentDiv.classList.add("student");


         // Loop through each property of the student object and create <p> elements
        Object.keys(student).forEach(key => {
            const para = document.createElement("p");
            para.textContent = `${key}: ${student[key]}`;
            studentDiv.appendChild(para);
        });

        // Append the student <div> to the container
        container.appendChild(studentDiv);
    });
}

//Helper function to display error message
function displayError(error) {
    //Get the container element
    const container = document.getElementById("student-data");
    //Display error message
    container.textContent = "Error: " + error;
}

//Helper function to display a message
function displayMessage(message) {
    const container = document.getElementById("student-data");
    container.textContent = message;
}










