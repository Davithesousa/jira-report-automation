function SingleTurn({handleChange,formData,capsules, servers}) {

    const handleSelect = (capsule)=>{
        console.log(capsule)
        const e = {
            target : {name: "capsule", value: capsule }
        }
        handleChange(e)
    }
    

    return (
        <div className="w-100 mt-3">

            <label className="bold">Utterance Tested:</label>
            <input className="form-control mt-1" name="utterance" onChange={handleChange} value={formData.utterance} />
            
            <label className="bold mt-3">Occurrence:</label>
            <input className="form-control mt-1" name="occurrence" onChange={handleChange} value={formData.occurrence} />
            
            <label className="bold mt-3">Expected Result:</label>
            <input className="form-control mt-1" name="expected" onChange={handleChange} value={formData.expected} />
            
            <label className="bold mt-3">Conversation ID:</label>
            <input className="form-control mt-1" name="conversationId" onChange={handleChange} value={formData.conversationId} />
            
            <label className="bold mt-3">Server:</label>
            <select className="form-select"  name="server" onChange={handleChange} value={formData.server}>
                {
                    servers.map((serve) => (
                        <option key={serve} value={serve}>{serve}</option>
                    ))
                    
                }  
            </select>
           
            <label className="bold mt-3">Software Version:</label>
            <input className="form-control mt-1" name="softwareVersion" onChange={handleChange} value={formData.softwareVersion} />   
        
        </div>
     
      
    );
}

function MultiTurn({handleChange,formData,capsules, servers}) {
    const handleSelect = (capsule)=>{
        console.log(capsule)
        const e = {
            target : {name: "capsule", value: capsule }
        }
        handleChange(e)
    }
    return (
        <div className="w-100 mt-3">

            <label className="bold">Dialog Multi-turn</label>
            <div className="form-floating">
                <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" name="dialog" onChange={handleChange} value={formData.dialog} style={{height: '100px'}}></textarea>
                {/* <label htmlFor="floatingTextarea">Dialog Multi-turn</label> */}
            </div>
            <label className="bold mt-3">Utterance</label>
            <input className="form-control mt-1" name="utterance" onChange={handleChange} value={formData.utterance} />
            
            <label className="bold mt-3">Occurrence:</label>
            <input className="form-control mt-1" name="occurrence" onChange={handleChange} value={formData.occurrence} />
            
            <label className="bold mt-3">Expected Result:</label>
            <input className="form-control mt-1" name="expected" onChange={handleChange} value={formData.expected} />
            
            <label className="bold mt-3">Conversation ID:</label>
            <input className="form-control mt-1" name="conversationId" onChange={handleChange} value={formData.conversationId} />
            
            <label className="bold mt-3">Server:</label>
            <select className="form-select"  name="server" onChange={handleChange} value={formData.server}>
                {
                    servers.map((serve) => (
                        <option key={serve} value={serve}>{serve}</option>
                    ))
                    
                }  
            </select>
            
            <label className="bold mt-3">Software Version:</label>
            <input className="form-control mt-1" name="softwareVersion" onChange={handleChange} value={formData.softwareVersion} />   
        
        </div>
     
      
    );
}

function MultiIntent({handleChange,formData,capsules, servers}) {
    const handleCheck = (e) =>{
        e.target.value = e.target.checked ? "FAIL" : "PASS"
        handleChange(e)
    }
    
    return (
        <div className="w-100 mt-3">
           
            <label className="bold">Utterance Tested:</label>
            <input className="form-control mt-1" name="utterance" onChange={handleChange} value={formData.utterance} />
            
            <label className="bold mt-3">Occurrence:</label>
            <div className="d-flex flex-wrap gap-4">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="statusIntent1"  onChange={handleCheck} value={formData.statusIntent1} id="failIntent1"/>
                    <label className="form-check-label" htmlFor="failIntent1">
                        Fail - Intent 1 
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="statusIntent2" onChange={handleCheck} value={formData.statusIntent2} id="failIntent2"/>
                    <label className="form-check-label" htmlFor="failIntent2">
                        Fail - Intent 2
                    </label>
                </div>
            </div>
            {
               formData.statusIntent1 === "FAIL" && 
                <input className="form-control mt-1" id="occurrenceIntent1" name="occurrenceIntent1" placeholder="Ocurrence Intent 1" onChange={handleChange} value={formData.occurrenceIntent1} />
            }
            {
               formData.statusIntent2 === "FAIL" && 
                <input className="form-control mt-1" id="occurrenceIntent2" name="occurrenceIntent2" placeholder="Ocurrence Intent 2" onChange={handleChange} value={formData.occurrenceIntent2} />
            }
            
            <label className="bold mt-3" >Expected Result:</label>
            <input className="form-control mt-1" name="expected" onChange={handleChange} value={formData.expected} />
            
            <label className="bold mt-3">Conversation ID:</label>
            <input className="form-control mt-1" name="conversationId" onChange={handleChange} value={formData.conversationId} />
            
            <label className="bold mt-3">Server:</label>
            <select className="form-select"  name="server" onChange={handleChange} value={formData.server}>
                {
                    servers.map((serve) => (
                        <option key={serve} value={serve}>{serve}</option>
                    ))
                }  
            </select>
          
            <label className="bold mt-3">Software Version:</label>
            <input className="form-control mt-1" name="softwareVersion" onChange={handleChange} value={formData.softwareVersion} />   
        
        </div>
     
      
    );
}
  
export default function Form({handleChange,formData,capsules,servers}) {
    if (formData.interactionType === "Single-turn") {
        return (
        
            <SingleTurn 
                servers     = {servers}
                capsules    = {capsules} 
                handleChange= {handleChange} 
                formData    = {formData}
            />
            
        )
    }
    if (formData.interactionType === "Multi-intent") {
        return (
        
            <MultiIntent
                servers     = {servers}
                capsules    = {capsules} 
                handleChange= {handleChange} 
                formData    = {formData}
            />
            
        )
    }
    if (formData.interactionType === "Multi-turn") {
        return (
        
            <MultiTurn 
                servers     = {servers}
                capsules    = {capsules} 
                handleChange= {handleChange} 
                formData    = {formData}
            />
            
        )
    }

    
}