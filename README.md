#Daily Calendar App

### Concept
Given a set of events, render the events on a single day calendar (similar to Outlook, Calendar.app, and Google Calendar). There are several properties of the layout:

1. No events may visually overlap.
2. If two events collide in time, they must have the same width.
3. An event should utilize the maximum width available, but constraint 2) takes precedence over this constraint.

Each event is represented by a *JS object* with a start and end attribute. The value of these attributes is the number of minutes since 9am. So {start:30, end:90) represents an event from 9:30am to 10:30am. The events should be **rendered in a container that is 620px wide (600px + 10px padding on the left/right) and 720px (12*60px) (the day will end at 9pm)**. 
The styling of the events should match the screenshot below.

You may structure your code however you like, but **you must implement the following function in the global namespace.** The function takes in an array of events and will lay out the events according to the above description.

<code>function layOutDay(events) {} </code>

This function will be invoked from the console for testing purposes. If it cannot be invoked, the submission will be rejected.

**In your submission, please implement the calendar with the following input:**

<code>[ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ];</code>

###FAQ
**Are frameworks such as JQuery, MooTools, etc. allowed?**  Yes, but please include the file with your source code. 

**Is there a maximum bound on the number of events?**  You can assume a maximum of 100 events for rendering reasons, but your solution should be generalized.

**What browsers need to be supported?** Your solution should work on all modern standards-compliant browsers, within the constraints of same origin policy. We won't be running a web server for testing.

**Does my solution need to match the image pixel for pixel?** No, we will not be testing for pixel matching.

Example Screenshot
![calendar-example](https://raw.github.com/reshadn/day-calendar-app/master/calendar-example.png?login=reshadn&token=b7ecac8b9f9c1ec59fc3317fa0585e34)


