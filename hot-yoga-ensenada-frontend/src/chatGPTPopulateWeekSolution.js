/* 

QUESTION

Using this same example, how can I can I logically make JavaScript populate a new week of classes every week on Sunday but only once?

RESPONSE

To generate a new set of yoga classes every week on Sunday, you can create a function that generates the array of yogaClasses based on the current date. You can then call this function once a week, on Sunday, using a setInterval or setTimeout method with an appropriate time delay.

Here's an example of how you can modify the previous code to generate new yogaClasses every Sunday:

*/


/* function getWeeklyYogaClasses() {
  const today = new Date();
  const daysUntilSunday = (7 - today.getDay()) % 7;
  const sunday = new Date(today.getTime() + daysUntilSunday * 24 * 60 * 60 * 1000);
  const yogaClasses = [
    { id: 1, day: 'Tuesday', time: '10:00 AM' },
    { id: 2, day: 'Tuesday', time: '6:00 PM' },
    { id: 3, day: 'Thursday', time: '10:00 AM' },
    { id: 4, day: 'Thursday', time: '6:00 PM' },
    { id: 5, day: 'Saturday', time: '2:00 PM' },
    { id: 6, day: 'Saturday', time: '4:00 PM' },
  ];
  return yogaClasses.map((yogaClass) => {
    const classDate = new Date(sunday.getTime());
    if (yogaClass.day === 'Tuesday') {
      classDate.setDate(sunday.getDate() + 2);
    } else if (yogaClass.day === 'Thursday') {
      classDate.setDate(sunday.getDate() + 4);
    } else if (yogaClass.day === 'Saturday') {
      classDate.setDate(sunday.getDate() + 6);
    }
    return { ...yogaClass, date: classDate };
  });
}

function YogaClass({ id, day, time, date }) {
  return (
    <div>
      <h2>Yoga Class {id}</h2>
      <p>Day: {day}</p>
      <p>Time: {time}</p>
      <p>Date: {date.toDateString()}</p>
    </div>
  );
}

function App() {
  const [yogaClasses, setYogaClasses] = useState(getWeeklyYogaClasses());

  // The Key Is the SetInterval Function to Fire Every Week! Wow
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const today = new Date();
      if (today.getDay() === 0) {
        setYogaClasses(getWeeklyYogaClasses());
      }
    }, 24 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {yogaClasses.map((yogaClass) => (
        <YogaClass
          key={yogaClass.id}
          id={yogaClass.id}
          day={yogaClass.day}
          time={yogaClass.time}
          date={yogaClass.date}
        />
      ))}
    </div>
  );
}

  let user = {
    username: req.body.userEmail,
    password: req.body.password
  }
  req.login(user, function(err) {
    if (err) { return next(err); }
    res.send('user logged into passport');
  });

  

    User.register(newUser, req.body.regUserPassword, function(err, user) {
    if (err) {
      console.log('Error: ' + err);
      res.status(400).json({ message: 'Error registering user' });
    } else {
      console.log('User registered successfully: ' + user.username);
      res.status(200).json(user);
    }
  });
};


 */