import configData from '../assets/config.json'
import axios from "axios";


const jira = {

    createIssue : async(summary , description) => {
        const headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${configData.key}`,
            "Content-Type": "application/json" 
           }
           
        let bodyContent = JSON.stringify({
               "fields": {
                  "project":
                  {
                     "key": configData.project.key
                  },
                  "summary": summary,
                  "description": description,
                  "issuetype": {
                     "name": configData.issuetype.name
                  },
                  "versions":  configData.versions,
                  "customfield_13551": "Hi Bixby\r\nUtterance",
                  "customfield_14310": {
                     "id": configData.customfield_14310.id
                  },
                  "customfield_13556": {
                     "id": configData.customfield_13556.id
                 }
              }
        });
           
           const reqOptions = {
             url: configData.url_jira + "/issue/",
             method: "POST",
             headers: headersList,
             data: bodyContent,
           }
    
           console.log(bodyContent)
           
           const response = await axios.request(reqOptions);
           console.log(response.data);
    
           setGeneratedLink(`https://jira-la.secext.samsung.net/browse/${response.data.key}`) 
    
    }


}


export default jira