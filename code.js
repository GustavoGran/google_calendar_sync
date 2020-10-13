  function syncCompanyCalendar(){
    syncCalendarById('name.surname@company.com',14,'Company',CalendarApp.EventColor.PALE_GREEN);
  }
  
  function syncUniversityCalendar(){
    syncCalendarById('name.surname@university.com',14,'University',CalendarApp.EventColor.YELLOW);
  }  
  
  function syncPesonalCalendar(){
    syncCalendarById('name.surname@gmail.com',14,'Personal',CalendarApp.EventColor.GRAY);
  }

  function syncVolunteerWorkCalendar(){
    syncCalendarById('name.surname@ngo.com',14,'Volunteer Work',CalendarApp.EventColor.PALE_GREEN);
  }
  

  function syncCalendarById(calId,numDaysAhead, alias='',color=CalendarApp.EventColor.PALE_GREEN) {
    var today = new Date();
    var endDate = new Date();
    endDate.setDate(today.getDate()+numDaysAhead);
    
    if(alias === '') {alias = calId} 
   
    var currentCal = CalendarApp.getDefaultCalendar();
    var tosyncCal = CalendarApp.getCalendarById(calId);
    
    var currentEvents = currentCal.getEvents(today,endDate);
    var tosyncEvents = tosyncCal.getEvents(today,endDate);
    
    Logger.log('Number of events on Current Cal: ' + currentEvents.length);
    Logger.log('Number of events on Cal to Sync: ' + tosyncEvents.length);
    
    var alreadySyncedEvents = currentEvents.filter(ev => ev.getTitle() == 'Blocked - ' + alias);
    Logger.log('Already Synced Events: ' + alreadySyncedEvents.length);
    
    //Delete preivously synced events
    alreadySyncedEvents.map(function (ev){ev.deleteEvent();});
    
    // Add events from Calendar to Sync
    
    tosyncEvents.map(
      function (syncEvent) {
        currentCal.createEvent('Blocked - ' + alias ,
                               syncEvent.getStartTime(),
                               syncEvent.getEndTime()
                               )
        .setVisibility(CalendarApp.Visibility.DEFAULT)
        .setColor(color);
      }
    );
  }
  
