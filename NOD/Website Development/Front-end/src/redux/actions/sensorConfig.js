import firebase from '../../config/firebase';
const database = firebase.database();

export const fetchSensorConfig = (config) => ({
    type: 'FETCH_CONFIG',
    config
  })

export const startFetchConfig = () => {
    return (dispatch) => {
        return database.ref(`sensorConfig`).once('value').then((snapshot) =>{
            const config = [];
            snapshot.forEach((childSnapshot) => {
                config.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            });
            dispatch(fetchSensorConfig(config[0]));
        });
    }
};

export const addConfig = (config) => ({
    type: 'ADD_CONFIG',
    config
});

export const startAddConfig = (configData = {}) => {
    return (dispatch) => {
        return database.ref(`sensorConfig`).push(configData).then((ref) => {
          dispatch(addConfig({
            id: ref.key,
            ...configData
        }));
        });
      };
  };

export const editConfig = (id,updates) => ({
    type: 'EDIT_CONFIG',
    id,
    updates
});


  export const startEditConfig = (id = 0, updates = {}) => {
    return (dispatch) => {
        return database.ref(`sensorConfig/${id}`).update(updates)
        .then(() =>{
            dispatch(editConfig(id,updates));
            return true;
        }).catch((e) =>{
            return false;
        });
    };
  };