import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Form from './components/form.jsx';
import Title from "./components/title.jsx";
import jsonData from '../src/assets/data.json'
import jira from "./services/jira.js";

import configData from './assets/config.json'
import axios from "axios";


function App() {

    const [formData, setFormData]                   = useState({

        devices:            ["FH"],
        capsule:            "airCare",
        utterance:          "",
        occurrence:         "",
        expected:           "",
        conversationId:     "tr-",
        server:             "bxb3Stg2US",
        softwareVersion:    "",
        language:           "pt-BR",
        registerType:       "SQE",
        interactionType:    "Single-turn",
        nextUtterance:      "",
        previousUtterance:  "",
        statusIntent1:      "PASS",
        statusIntent2:      "PASS",
        occurrenceIntent1:  "",
        occurrenceIntent2:  "",
        dialog:             "",
        createIssue:        "false",

    });
    const [activeSection, setActiveSection]         = useState("");
    const [generatedLink,setGeneratedLink]          = useState("");
    const [generatedTemplate, setGeneratedTemplate] = useState("");
    const [errorMessage, setErrorMessage]           = useState("");
    

    /* Funções de manipulação */

    const handleCheck = (e) => {
        e.target.value = e.target.checked ? "true" : "false";
        handleChange(e)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleDevice = (device) => {
        setFormData((prevData) => ({
            ...prevData,
            devices: prevData.devices.includes(device) ? prevData.devices.filter((d) => d !== device) : [...prevData.devices, device],
        }));
    };

    /* Gerar template PLM */

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedTemplate);
    };

    const handleGenerate = async () => {
        setErrorMessage("");
        setGeneratedTemplate("");
        try {

            const template = generatePLMTemplate({
                            ...formData,
                            type: activeSection,
                            errorType: activeSection,
                            device: formData.devices.join(", "),
            });

            setGeneratedTemplate(template);
        } catch (error) {
            console.log(error)
           /*  setErrorMessage(error.response?.data?.error || "Erro ao gerar template."); */
           // setErrorMessage("Erro ao gerar template.");

        }

    };

    const generatePLMTemplate = (data) => {

        let {

            type,
            device,
            language,
            capsule,
            errorType,
            utterance,
            occurrence,
            expected,
            conversationId,
            server,
            softwareVersion,
            registerType,
            interactionType,
            nextUtterance,
            previousUtterance,
            statusIntent1,
            statusIntent2,
            occurrenceIntent1,
            occurrenceIntent2,
            dialog,

        } = data;


        if (interactionType === "Multi-intent") {
            occurrence = "\n"+"   Intent-1: (" + statusIntent1 + ") "+occurrenceIntent1 + "\n" + 
                        "   Intent-2: ("+ statusIntent2 + ") "+occurrenceIntent2 + "\n"
        }

        // Verificação de campos obrigatórios
        if (!type || !device || !language || !capsule || !errorType || !utterance || !occurrence || !expected || !conversationId || !server || !softwareVersion || !registerType) {

            console.error("Erro: Campos obrigatórios ausentes.");
            setErrorMessage("Erro ao gerar template. Todos os campos deveriam ser preechidos");
            const template = "Todos os campos são obrigatórios."
            return template;

        }else{
            let interactionTypeLabel = interactionType === "Multi-turn"

            ? "TURN-FAIL"
            //: interactionType === "Multi-intent"
            //? "INTENT: "
            : "UTTERANCE";

            const title = `[${registerType}][${device}][${capsule}][${interactionType}][${language}][${errorType}]:`

            const description = `${interactionType === "Multi-turn" ? "[DIALOG]\n"+dialog+"\n" : ""}`+
                                `[${interactionTypeLabel}] ${utterance}\n` + 
                                `[OCCURRENCE] ${occurrence}\n` +
                                `[EXPECTED] ${expected}\n` +
                                `[CONVERSATION ID] ${conversationId}\n` +
                                `[SERVER] ${server}\n` +
                                `[SOFTWARE VERSION] ${softwareVersion}\n`;

            
            //setDescriptionIssue(description);
            //setSummaryIssue(title);

            if (formData.createIssue === "true") {
                //createIssue(title,description);
                jira.createIssue(title,description);

            }

        
            const template = `${title}\n\n` + description;

            console.log("Template gerado com sucesso!");

            console.log(template);
            //console.log(summaryIssue);
            //console.log(descriptionIssue);

            return template;
        }

       

    };

    const createIssue = async(summary , description) => {
        const headersList = {
            "Accept": "*/*",
            //"User-Agent": "Thunder Client (https://www.thunderclient.com)",
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

    /* Renderização */

    return (
        <div className="container mt-0">

            {/* Menu de Seleção */}
            <div className="d-flex justify-content-center mb-4">

                    {jsonData.issueType.map((type) => (
                        <button 
                            key={type} 
                            className={`btn ${activeSection === type ? "btn-primary" : "btn-outline-primary"} mx-2`}
                            onClick={() => setActiveSection(type)}
                        >
                                {type}
                        </button>   

                    ))}
            </div>

            {/* Exibição do Formulário */}
    
            {activeSection && (

                
                <div className="d-flex flex-wrap gap-2 border rounded p-3">

                    <Title
                        jsonData     = {jsonData}
                        formData     = {formData}
                        setFormData  = {setFormData}
                        toggleDevice = {toggleDevice}
                        handleChange = {handleChange}
                    />
                    {/* Campos de formulário */}
                            
                    <Form
                        servers      = {jsonData.servers} 
                        capsules     = {jsonData.capsules} 
                        handleChange = {handleChange} 
                        formData     = {formData}
                    />


                    <div className="">
                        <div className="form-check mx-2 d-flex align-items-center">
                                <input className="form-check-input" type="checkbox" name="createIssue" onChange={handleCheck} value={formData.createIssue} id="createIssue"/>
                                <label className="mx-2 form-check-label" htmlFor="createIssue">
                                    Create Issue
                                </label>
                        </div>
                        <div>
                            <button className="btn btn-success mt-3" onClick={handleGenerate}>Gerar Template</button>
                        </div>
                    </div>
                </div>


            )}

            {/* Exibição do Template Gerado */}

            {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}

            {generatedTemplate && (
            <div className="card p-4 mt-3">
                <h3>Template Gerado</h3>
                <pre className="bg-light p-3">{generatedTemplate}</pre>
                
                { formData.createIssue === "true" &&(
                    <pre className="bg-light p-3">[Issue] : <a className="link-opacity-10" href={generatedLink} target="_blank">{generatedLink}</a></pre>
                )}
                
                <button className="btn btn-secondary mt-2" onClick={handleCopy}>
                    Copiar Template
                </button>

            </div>
            

            )}
        </div>

    );

}

export default App; 