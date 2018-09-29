
# Christine Wilde's Stream Two Project

Please note the entire project is described under the "Documentation for project" folder in the word document named FinalProjectStreamTwo.doc.

The goal of the stream two project is to build a front and backend Website that pulls data from a database and presents the data in a well presented graphical format using technologies such as Python, D3.js and DC.js.

Project subject:
The subject chosen is the UK fishing industry and the quota restrictions that the UK currently abides to via the EU fishing laws in EU waters.  One of the key mechanisms to control fishing due to fear of ‘over-fishing’ is to implement a fishing quota on nations. The aim here was to analyse the UK fishing industry statistics over a 5 year stretch and show this on well presented dashboard. 

The Website includes the following technologies:

* D3.js - This was used to build the fishing graphs and make them interactive based on the data pulled from Mongo DB.
* DC.js - DC. js helped to plot the graphs more easily.
* Crossfilter.js - The Crossfilter library was used to enable the two-way binding.
* Queue.js - The queue() function was used in order to pull data from the API.
* Mongo DB - A nonSQL database.
* Flask - The Flask framework was used to deliver the stored Mongo DB data to the dashboard front-end Website.
* HTML5, CSS, JavaScript - To design and code the front end.


Using the technologies above the below Website features were achieved:

1. ## Dashboard - overall
This includes Bootstrap nav bar, a CSS animated fish and Bootstap modal for further fish information.

2. ## Main Line Chart feature
This highlights the 'Amount of Fish Types Through the Years'.

3. ## A Pie Chart showing each individual UK regions 
This provides the user the option of obtaining statistics for individual UK regions namely England, Wales, Scotland and Northern Ireland.

4. ## A Pie Chart to show the main regional ports in the UK
The main regional ports pie chart is there to highlight where the fish is caught in the individual UK regions. 

5. ## A Select Menu with all the fish names listed
The fish name select menu was an important feature to answer the project question of how well cod was doing. 

6. ## A tour button
This takes the user through the individual charts providing a short explanation of each one.

### Installation

The below table explains how to deploy the application.



```sh

1. For the live version please go to the Heroku deployed app at: https://ancient-depths-24629.herokuapp.com/
2. To run locally download all files from https://github.com/ChristineMWilde/Stream_Two_Project_GH.
3. All requirements are found in the requirements.txt file.
4. The project can be open and run using the Pycharm application.
5. Please read "FinalProjectStreamTwo.doc" for detailed information on this project. This document is found under the folder "Documentation for project" folder
```

### TESTING observations:

  * No spaces in the file should be present when importing a .csv data file to Mongo DB! 
  
  * Pycharm and Google dev tools were used extensively since they highlighted typos very well.

  * The Mongo DB field _id needs to be set to false on the Flask code since this causes a JSON error.

