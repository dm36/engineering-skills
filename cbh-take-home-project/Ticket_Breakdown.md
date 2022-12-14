# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1:
Add a function to support the ability for facilities to save a custom id for a given agent

#### Acceptance criteria:

Function that allows facilities to save a custom id for a provided agent

#### Implementation details:

This function should take three inputs- the facility's id, the id of the agent they want to update and the custom id that they want to set / update. This is so that if generateReport is submitted by that same facilities user- it will use the provided custom id for the agent.

There should be unit tests for this function to verify that this function works in different cases. There should be constraints on the custom id that is provided (i.e. facilties should not be able to tie the same custom id to several agents- this can be checked by querying the database), the custom id should not be an empty string and have a length > 0 and be less than 30 characters. The function should check that the provided agent and faciltiies id exist before storing this information away in the database.

For example if facilities A wanted to set agent1's custom id to test1id- the code should verify that member A exists and agent1 exists before storing away the custom id in the database. A non-relational schema could be used here- like MongoDB for example. The data structure would look like so: {'facility1': {'agent1': 'test1id', 'agent2': 'test2id'}, 'facility2': {'agent1': 'testtest', 'agent2': 'test2'}}

The getShiftsByFacility funciton should also be updated so that if a user calls getShiftsByFacility with a facility id- the function will now use this data structure to additionally return the custom id metadata for each agent. If facility has used this function it should save away this information as a flag for a given facility so that this can be checked by other functions.

#### Time estimate:

2 days

### Ticket 2:

Build a UI utilizing the above function so that a facility is able to save custom ids for multiple agents.

#### Acceptance criteria:

Working UI where a facilities user is able to save custom ids for multiple agents- and it uses the above function to store away this data in the database.

####  Implementation details:

This UI can be built in React- the facility provides their facilties id so that we can narrow down on which facility is making the updates.

The facility then submits the number of agents they want to create custom ids for. 

The UI provides 2 text fields per agent- the first text field is the agent, and the second field is the custom id. Using these two inputs as well as the facility provided the information is stowed away in the database- leveraging the function implemented in ticket 1.

#### Time estimate:

2 days

### Ticket 3:

Ensure that a report generated by a facility uses the custom ids provided.

#### Acceptance criteria
A user invoking the generateReport function will see custom ids for each agent.

#### Implementation details

The generateReport function should be updated to additionally take a facilities id. Then using the flag implemented in ticket1- the function should check whether a facility has chosen to use custom ids for agents. If not behavior will remain the same.

If the user has used custom ids for agents- then the generateReport function will incorporate the custom id metadata returned from getShiftsByFacility in the generated report.

#### Time estimate:

2 days