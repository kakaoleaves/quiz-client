import './App.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getWeatherForecast } from 'services/auth';
import { useEffect } from 'react';

const localizer = momentLocalizer(moment);

function App() {

  useEffect(() => {
    getWeatherForecast().then((data) => {
      console.log(data);
    }
    );
  }, []);

  return (
    <div className="App">
      <Calendar 
        localizer={localizer}
        style={{height: 500}}
      />
    </div>
  );
}

export default App;
