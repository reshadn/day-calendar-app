(function () {
    'use strict';

    var sampleEvents,
    calendar;

    //setup Calendar Constructor
    function Calendar() {
        var END_OF_DAY = 720,
            $eventsDisplay = document.getElementById('events');

        this.layOutDay = function (events) {
            // If no events are provided set events to an empty array to clear the calendar             
            var events = events || [],
                timeSlots = [],
                event,
                eventsLen = events.length,
                i, j,
                timeSlotsLen,
                horizontalIndex,
                view = '';

            // Prepare the calendar time slots array of arrays to organize all the events
            for (i = 0; i < END_OF_DAY; i++) {
                timeSlots[i] = [];
            }

            events = events.sort(function (a, b) {
                if (a.start > b.start) return 1;
                if (a.start < b.start) return -1;
                // a must be equal to b
                return 0;
            });

            // arrange the events based on their starting time
            for (i = 0; i < eventsLen; i++) {
                event = events[i];
                // set an unique key for each event
                event.key = i + 1;

                // Prevent invalid events
                if (event.end <= END_OF_DAY & event.start <= END_OF_DAY && event.start < event.end) {
                    for (j = event.start; j < event.end; j++) {
                        timeSlots[j].push(event.key);
                    }
                }
            }
            // Calculate the horizontal position and # of overlapping events
            for (i = 0; i < END_OF_DAY; i++) {
                horizontalIndex = 0;
                timeSlotsLen = timeSlots[i].length;

                // Check for at least one event in the row
                if (timeSlotsLen > 0) {

                    // Track the largest group of events per row
                    for (j = 0; j < timeSlotsLen; j++) {
                        event = events[timeSlots[i][j] - 1];

                        if (!event.overlapCount || event.overlapCount < timeSlotsLen) {
                            // set the overlapCount to help determine the proper width 
                            event.overlapCount = timeSlotsLen;

                            // Calculate the horizontal order of events in the same row
                            if (!event.hindex) {
                                event.hindex = horizontalIndex;
                            }
                            // Increment index so that other conflicting events don't receive the same value
                            horizontalIndex++;
                        }
                    }
                }
            }

            // Calculate the event dimensions, build the event markup
            for (i = 0; i < eventsLen; i++) {
                event = events[i];
                
                // Set event height
                event.height = event.end - event.start;

                // Determine the width of each event by 
                // evenly dividing it over the width of the calendar
                event.width = Math.round(100 / event.overlapCount);

                // Calculate the event's horizontal position 
                event.left = event.width * event.hindex;
                
                console.log(event);
                //generate html string for each event
                view = view + this.buildView(event);
            }

            // render the calendar
            $eventsDisplay.innerHTML = view;

        };

    };

    // Generate the html string per event
    Calendar.prototype.buildView = function (event) {
        var template = '<div class="event-item"' + 'style="top:{{top}}px;height:{{height}}px;width:{{width}}%;left:{{left}}%;">' + '<p class="event-title">Sample Event</p>' + '<p class="event-location">Sample Location</p>' + '</div>';

        template = template.replace('{{top}}', event.start);
        template = template.replace('{{height}}', event.height);
        template = template.replace('{{width}}', event.width);
        template = template.replace('{{left}}', event.left);

        return template;
    };

    calendar = new Calendar();

    // add layOutDay to the global namespace to be invoked via the console 
    window.layOutDay = function (events) {
        calendar.layOutDay(events);
    };

    // Prepare and load sample calendar
    sampleEvents = [{start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670}];
    layOutDay(sampleEvents);

})();