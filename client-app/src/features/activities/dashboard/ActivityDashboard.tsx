import React from 'react';
import { Grid } from 'semantic-ui-react';
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
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submiting: boolean;

}

//add activites and Props in ACTIVITYDASHBOARD as parameters so we can use it
export default function ActivityDashboard({activities, selectedActivity, deleteActivity, 
    selectActivity, cancelSelectActivity, editMode, openForm, closeForm, createOrEdit, submiting}: Props){
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                activities={activities} 
                selectActivity={selectActivity} 
                deleteActivity={deleteActivity}
                submiting={submiting}
                />
            </Grid.Column>

            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetatils 
                activity={selectedActivity} 
                cancelSelectActivity={cancelSelectActivity}
                openForm={openForm}
                
                />}
                {editMode &&
                <ActivityForm closeForm={closeForm} 
                activity={selectedActivity} createOrEdit={createOrEdit}
                submiting={submiting}
                
                />}

            </Grid.Column>
        </Grid>
    )
}