setTimeout(function(){
    //console.log("enter")

    let selectorElementFather = "#zephyrScale-v1-testLibrary > div > div > floating-header > div > ng-transclude > header-content > aui-navigation > nav > div > div"
    var   selectorRoot = "#ktm-result-details-single-view-1 > div.ktm-test-player-run-data.ng-scope > div > div.ktm-test-player-run-data-body.ng-scope > div:nth-child(1) > div.ktm-collapsable-section-content.ng-scope > editable-fields-section > div > div:nth-child(23) > div.ktm-test-player-execution-field-value > custom-field-value > editable-field > div > div > div.ktm-editable-field-value.ng-scope"
    

    if(window.location.origin == 'https://jira.yourdomain'){
        selectorElementFather = "#zephyrScale-v1-testLibrary > div > div > floating-header > div > ng-transclude > header-content > aui-navigation > nav > div > div"
        selectorRoot = "#ktm-result-details-single-view-1 > div.ktm-test-player-run-data.ng-scope > div > div.ktm-test-player-run-data-body.ng-scope > div:nth-child(1) > div.ktm-collapsable-section-content.ng-scope > editable-fields-section > div > div:nth-child(23) > div.ktm-test-player-execution-field-value > custom-field-value > editable-field > div > div > div.ktm-editable-field-value.ng-scope"
    }

    console.log("selector=>"+selectorRoot)
    var elementFather = document.querySelector(selectorElementFather)
    const htmlBtnModelIssue = `
        <!-- Trigger/Open The Modal -->
        <button id="myBtn" class="btn btn-outline-primary mx-2">TempLite  
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bug" viewBox="0 0 16 16">
            <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A5 5 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A5 5 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623M4 7v4a4 4 0 0 0 3.5 3.97V7zm4.5 0v7.97A4 4 0 0 0 12 11V7zM12 6a4 4 0 0 0-1.334-2.982A3.98 3.98 0 0 0 8 2a3.98 3.98 0 0 0-2.667 1.018A4 4 0 0 0 4 6z"/>
            </svg>
        </button>

        <!-- The Modal -->
        <div id="myModal" class="modal">

            <!-- Modal content -->
            <div class="modal-content">
                <div>
                    <span>TempLite</span>
                    <span class="close">&times;</span>
                </div>
            
                <div id="root">
                    <div id="btnGenerate"></div>
                </div>
                
            </div>

        </div>
    ` 

    let originalHtml = elementFather.innerHTML

    elementFather.innerHTML = originalHtml + htmlBtnModelIssue
    //console.log("executed")

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
       
}, 5000);


 