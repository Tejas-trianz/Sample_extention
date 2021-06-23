// chrome://extensions/
let myLeads = []
const saveBtn = document.getElementById("save-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const dltBtn = document.getElementById("delete-btn")
const saveTabBtn = document.getElementById("savetab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))


function render(leads) {
    let listItem = ''
    for (let i = 0; i < leads.length; i++) {
        listItem += `<li>
                        <a target='_blank' href='${leads[i]}'>
                            ${leads[i]}
                        </a>
                    </li>`;
    }
    ulEl.innerHTML = listItem
};

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads)
}

saveBtn.addEventListener("click", () => {
    let inputVal = inputEl.value
    
    if (inputVal) {
        myLeads.push(inputVal)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
        inputEl.value = ''
    }
});

saveTabBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        // let activeTab = tabs[0]
        // let activeTabID = activeTab.id
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
});

dltBtn.addEventListener('dblclick', () => {
    localStorage.clear()
    myLeads = []
    render(myLeads)
});
