import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../modules/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './loadingComponents';

function App() {

  
  const [activities, setActivities] = useState<Activity[]>([]) 
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submiting, setSubmiting] = useState(false);

  useEffect (()=> {
   agent.Activities.list().then(response => {
      let activites: Activity[] = []
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(response);
      setLoading(false);
    })
  }, [])

  function handleSelectActivity(id: string){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){
    setSubmiting(true);
    if(activity.id){
      agent.Activities.update(activity).then( () => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmiting(false);
      } )
    }
    else{
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmiting(false);
      })
    }
  }

  function handleDeleteActivity(id: string){
    setSubmiting(true);
    agent.Activities.delete(id).then(()=> {
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmiting(false);
    })
    
  }

  if(loading) return <LoadingComponent content='Loading app'/>  
  
  return (
    <Fragment>
      <NavBar openForm={handleFormOpen}/>
      
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}    
          createOrEdit={handleCreateOrEditActivity}     
          deleteActivity={handleDeleteActivity}
          submiting={submiting}
          />
      </Container>
      
    </Fragment>
  );
}

export default App;
