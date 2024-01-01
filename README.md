# Mock-dkyerema-prlakshm

Project name: Mock

Team Members: Pranavi Lakshminarayanan and Dorinda Kyeremateng

Link to Deployed Webpage: https://prlakshm.github.io/mock-deploy/

Design Choices:

We chose to split up our program by components. In the “src/components” folder, there is an App.tsx that is the highest level component. This sets up the entire webpage. Mock.tsx calls MockHistory and MockInput to render the main bulk of the webpage with a history log and command input box. MockHistory.tsx sets up the history log of the webpage. MockInput.tsx takes in the user command input, parses it, and responds with the appropriate output. We display the appropriate error messages if the command is invalid, if no csv file is loaded, if the csv file is blank, or if there are no search results in MockInput. ControlledInput.tsx has ControlledInput that is essentially the command input box. It is called in MockInput.

In our “tests” folder, App.spec.ts has all our playwright tests. Our “data” folder has MockedData.ts which has all our mock csv lists.

We chose to store our history as a 2D array where the elements can be either string or string[][]. This allows us to return a response message or a string[][] if we are returning csv rows (such as for view or search). Also, we use a boolean to keep track of the mode. This boolean is true for brief mode and false for verbose. We start it off with true because the webpage starts off in brief mode.

We chose to split our command string by spaces and read in each of the command words separately to check for the general command (“load_file,” “view,” “search,” or “mode”) and then the specific parameters for that command.

We chose to make our webpage more understandable by adding boxes around each history log item. We also centered out HTML tables and colored every other row to make it look pretty and be easier to read. These css styles were added to main.css in the “src/styles” folder.

Errors/Bugs:
To our knowledge, there are no bugs in our code. It follows the user story guidelines of allowing a user to submit commands into the command box, read the appropriate response from the history window, and switch between brief and verbose modes as the user wishes.

Tests:
Our tests confirm that appropriate responses are returned in the history box when a user inputs the set commands. For instance, load_file followed by the filename and whether the CSV has headers or not will load the file as the current working data. We also test sequences of commands, like loading multiple csv files. We tested our view on if no csv was loaded or if a blank csv was loaded. We check for our error messages and what happens when we search before and after loading a csv.
