import React, {useEffect , useState} from 'react';
import { read } from '../services/network';
import './PatientPage.css';

function PatientPage() {
    const [data, setData] = useState(null);

    const [display, setDisplay] = useState(0);

    useEffect(() => {getInfo();} , []);
    
    const getInfo = async () => {
       await read(`patients`).then(r => {setData(r)}).catch(err => console.log(err));
    };

    console.log(data);
    console.log("render");

    return (
        <>
        { Array.isArray(data) ?
    <div id='patient'>
        <h2>Select a Patient:</h2>
        <select onChange={async (e) => {
            await read(`patients/byId/${e.target.value}`).then(r => {setDisplay(r)});
            }}>
            {data && data.map((e) => <option value={e.id}>{e.name}</option>)}
        </select>
        {display !== 0 && <div>
            <div className='field'>Patient Name: <span>{display.name}</span></div>
            <div className='field'>Date of birth: <span>{display.dateOfBirth}</span></div>
            <div className='field'>City: <span>{display.City.name}</span></div>
            {display.CovidTests[0] && <div className='field'>Covid Test Result: <span>{display.CovidTests[0].isSick ? 'sick' : 'healthy'}</span></div>}
            <div className='field'>Symptoms:</div>
            <ul>
            {display.SymptomsByPatients.map((e) => <li>{e.Symptom.name}</li>)}
            </ul>
            </div>}
    </div>

    :
    <div>
        <h1>server not connected</h1>
    </div>
}
    </>
    );
}

export default PatientPage;