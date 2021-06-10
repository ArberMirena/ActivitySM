import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Activity } from '../../../app/modules/activity';
import ActivityDetatils from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivitiyList';

//interface so we can accept the passing parameters
interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm:(id: string) => void;
    closeForm: () => void;

}

//add activites and Props in ACTIVITYDASHBOARD as parameters so we can use it
export default function ActivityDashboard({activities, selectedActivity, 
    selectActivity, cancelSelectActivity, editMode, openForm, closeForm}: Props){
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity}/>
            </Grid.Column>

            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetatils 
                activity={selectedActivity} 
                cancelSelectActivity={cancelSelectActivity}
                openForm={openForm}
                
                />}
                {editMode &&
                <ActivityForm closeForm={closeForm} activity={selectedActivity} />}

            </Grid.Column>
        </Grid>
    )
}