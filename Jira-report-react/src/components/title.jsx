import SelectSearch from 'react-select-search';
import devicesJson from '../assets/devices.json'
import 'react-select-search/style.css'

function Title({jsonData, formData, setFormData, toggleDevice, handleChange}) {
    const handleSelect = (capsule)=>{
        const e = {
            target : {name: "capsule", value: capsule }
        }
        handleChange(e);
    }

   const capsulesList =() =>{

        const list = formData.devices.flatMap(selectedDevice => {
            const device = devicesJson.find(d => d.name === selectedDevice);
            return device ? device.capsules : [];
        });

        const capsules = [...new Set(list)].map((capsule) => ({ name: capsule, value: capsule,})).sort();
        return capsules;
   }

    return ( 
        
        <div className="d-flex flex-wrap gap-2">

            {/* Seleção de dispositivos */}
            <div className='px-2 border border-top-0 border-bottom-0'>
                <label>Device:</label>

                <div className="d-flex align-items-end">
                    {jsonData.devices.map((device) => (
                        <button
                            key={device}
                            className={`btn ${formData.devices.includes(device) ? "btn-success" : "btn-outline-success"} mx-1`}
                            onClick={() => toggleDevice(device)}
                        >
                            {device}
                        </button>

                    ))}
                </div>
            </div>

            {/* Seleção de Idioma */}
            <div>
                <label className="mx-2">Language:</label>
                <select className="form-select border-success text-success"  name="language" onChange={handleChange} value={formData.language}>    
                    {jsonData.languages.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </select>
            </div>

            {/* Seleção de Registro (SQE ou SEL) */}
            <div>
                <label className="mx-2">Team:</label>
                <select className="form-select border-success text-success"  name="registerType" onChange={handleChange} value={formData.registerType}>
                    {jsonData.team.map((registerType) => (
                        <option key={registerType} value={registerType}>{registerType}</option>
                    ))}
                </select>
            </div>

            {/* Seleção de Interação MULTI TURN  / MULTI INTENT*/}
            <div>
                <label className="mx-2">Test Type:</label>
                <select className="form-select border-success text-success"  name="interactionType" onChange={handleChange} value={formData.interactionType}>
                    {jsonData.testType.map((interactionType) => (
                        <option key={interactionType} value={interactionType}>{interactionType}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="">Capsule Name:</label>
                <SelectSearch 
                    className   = "border-success text-success rounded select-search"
                    options     = {capsulesList()} 
                    value       = {formData.capsule}
                    onChange    = {handleSelect}
                    closeOnSelect
                    search
                    //multiple
                />
            </div>

            
        </div>
     );
}

export default Title;