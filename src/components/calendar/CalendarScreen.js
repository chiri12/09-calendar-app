import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'moment/locale/es'; //cambiar el idioma del moment a espannol
import 'react-big-calendar/lib/css/react-big-calendar.css';// estos estilos son propios de calendario y se ponen para que salga bien el calendario 
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';



moment.locale('es');//para cambiar el idioma a espannol


const localizer = momentLocalizer(moment); 

/*const  events = [{
  title: 'Cumpleannos del jefe',
  start: moment().toDate(),
  end: moment().add( 2, 'hours').toDate(),
  bgcolor: 'fafafa',
  notes: 'Comprar el pastel',
  user: {
    _id:'123',
    name:'Adrian'
  }
}];*/


export const CalendarScreen = () => {
  
  const dispatch = useDispatch(); 

  const {events, activeEvent } = useSelector( state => state.calendar);
  

   //const eventos = localStorage.getItem('calendar');
   //console.log(eventos);


  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const onDoubleClick = (e) => {   
    dispatch( uiOpenModal() );      
  }

  const onSelectEvent = (e) => {    
    dispatch( eventSetActive(e) );  
    
  }

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);

  }

  const onSelectSlot = (e) => {
    dispatch( eventClearActiveEvent() );
  }


  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'

    }

    return {
      style 
    }

  }


  return (
    <div className='calendar-screen'>
        <Navbar />

        <Calendar
            localizer={ localizer }
            events={ events }
            startAccessor="start"
            endAccessor="end"
            messages={ messages }
            eventPropGetter={ eventStyleGetter }
            onDoubleClickEvent={ onDoubleClick }
            onSelectEvent={ onSelectEvent }
            onView={ onViewChange }
            onSelectSlot={ onSelectSlot }
            selectable={true}
            view={ lastView }
            components= {{
              event: CalendarEvent
            }}


       />

        <AddNewFab />
               {
                 (activeEvent) && <DeleteEventFab />    //si esta activo el evento se muestra el delet sino no
               }      
              
       
        

       <CalendarModal />


    </div>
  )
}
