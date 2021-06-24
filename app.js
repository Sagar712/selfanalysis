const allTabs = document.querySelectorAll('.icons');
allTabs[0].style.borderBottom = "4px solid rgb(223, 77, 58)";
allTabs[1].style.borderBottom = "4px solid white";
allTabs[2].style.borderBottom = "4px solid white";
let taskSlected="";
let CategorySelected = "";

window.addEventListener("resize", (e) => {
    //alert("Keyboard detected!!");
});

function animatToast(msg, bgColor) {
    const toastNote = document.querySelector('.toastNotify');
    if(toastNote.classList = "toastNotify animate")
        toastNote.classList.remove('animate');
    toastNote.innerHTML = msg;
    toastNote.style.backgroundColor = bgColor;
    toastNote.classList.add('animate');
    setTimeout(() => {
        toastNote.classList.remove('animate');
    }, 2005);
    console.log(toastNote.classList);
}

const con1 = document.getElementById("content1"),
    con2 = document.getElementById("content2"),
    con3 = document.getElementById("content3");

function swipeleft1(){
    con1.style.transform="translateX(0%)";
    con2.style.transform="translateX(100%)";
    con3.style.transform="translateX(200%)";

    allTabs[0].style.borderBottom = "4px solid rgb(223, 77, 58)";
    allTabs[1].style.borderBottom = "4px solid white";
    allTabs[2].style.borderBottom = "4px solid white";
    document.getElementById("allcont").scrollTop=0;
}

function swipeleft2(){
    con1.style.transform="translateX(-100%)";
    con2.style.transform="translateX(0%)";
    con3.style.transform="translateX(100%)";
    allTabs[0].style.borderBottom = "4px solid white";
    allTabs[1].style.borderBottom = "4px solid rgb(223, 77, 58)";
    allTabs[2].style.borderBottom = "4px solid white";
    document.getElementById("allcont").scrollTop=0;
}

function swipeleft3(){
    con1.style.transform="translateX(-200%)";
    con2.style.transform="translateX(-100%)";
    con3.style.transform="translateX(0%)";
    allTabs[0].style.borderBottom = "4px solid white";
    allTabs[1].style.borderBottom = "4px solid white";
    allTabs[2].style.borderBottom = "4px solid rgb(223, 77, 58)";
    document.getElementById("allcont").scrollTop=0;
}

function putCategory(index) {
    document.getElementById('taskSel').innerHTML = " -- Choose Task -- ";
    CategorySelected = index;
    taskSlected="";
}

function togglePop() {
    document.querySelector('.popup').classList.toggle('active');
    document.querySelector('.ovelay2').classList.toggle('active');
}

function ChooseTask() {
    if(CategorySelected == "")
        animatToast("Please choose any one category", "rgb(114, 195, 233)");
    else{
        togglePop();
        renderTasks();
    }
}

function setTask(task) {
    document.getElementById('taskSel').innerHTML = task.innerText;
    taskSlected = task.innerText;
    togglePop();
}

if(localStorage.getItem('Data-Storaging-Analysis') == null){
    const Struct = {
        Tasks:{},
        Records:{}
    }
    localStorage.setItem('Data-Storaging-Analysis', JSON.stringify(Struct));
    renderTasks();
}
else{
    renderTasks();
}

function renderTasks() {
    let Struct = JSON.parse(localStorage.getItem('Data-Storaging-Analysis'));
    let TasksL = Struct.Tasks;
    let i=1;
    let temp = '';
    console.log(Struct);
    while(TasksL[i]!=null){
        if(CategorySelected == TasksL[i].category){
            console.log(TasksL[i]);
            temp = temp.concat(`<li onclick="setTask(this)">${TasksL[i].task}</li>`);
        }
        i++;
    }
    document.querySelector('.taskContainer').innerHTML = temp;
    
}

function addTask() {
    let task = document.getElementById('newTask');
    let Struct = JSON.parse(localStorage.getItem('Data-Storaging-Analysis'));
    let TasksL = Struct.Tasks;
    let i=1;
    while(TasksL[i] != null){
        i++;
    }
    TasksL[i] = {
        category: CategorySelected,
        task: task.value
    } 
    Struct.Tasks = TasksL;
    localStorage.setItem('Data-Storaging-Analysis', JSON.stringify(Struct));
    renderTasks();
    task.value = "";
    task.focus();
}

function Submitted() {
    console.log(taskSlected+" <--> "+CategorySelected);
    let tim1="", tim2="";
    let today = new Date();
    tim1 = document.querySelector('#clk1').value;
    tim2 = document.querySelector('#clk2').value;
    if(tim1 != "" && taskSlected!="" && CategorySelected!=""){
        let splits = tim1.split(":");
        let total1 = parseInt(splits[0])*60 + parseInt(splits[1]);
        splits = tim2.split(":");
        let total2 = parseInt(splits[0])*60 + parseInt(splits[1]);
        let total = total2-total1;
        if(total>0){
            let Struct = JSON.parse(localStorage.getItem('Data-Storaging-Analysis'));
            let Records = Struct.Records;
            let i=1;
            while(Records[i] != null){
                i++;
            }
            Records[i] = {
                task: taskSlected,
                category: CategorySelected,
                time: total,
                date: today.toDateString()
            }
            Struct.Records = Records;
            localStorage.setItem('Data-Storaging-Analysis', JSON.stringify(Struct));
            console.log(Math.round(total/60)+" : "+total%60);
            animatToast('Item added successfuly!', 'rgb(142, 228, 142)');
        }//indianred rgb(142, 228, 142)
        else
            animatToast('Insufficient Inputs Error!', 'rgb(230, 154, 154)');
    }
    else
        animatToast('Insufficient Inputs Error!', 'rgb(230, 154, 154)');
    
    RenderAnalysis();
}

function deleteAll() {
    if(confirm("You are about to wipe out all data")){
        localStorage.removeItem('Data-Storaging-Analysis');
        animatToast('Deleted successfuly', 'rgb(142, 228, 142)');
    }
    else
        animatToast('Deletion Aborted!', 'rgb(230, 154, 154)');
}

function RenderAnalysis() {
    const percent = document.querySelectorAll('.percentH');
    const hours = document.querySelectorAll('.HrsH');
    let Struct = JSON.parse(localStorage.getItem('Data-Storaging-Analysis'));
    let Records = Struct.Records;
    let cat1=0, cat2=0, cat3=0, cat4=0;
    let i=1;
    while(Records[i] != null){
        if(Records[i].category == "Urgent & Important"){
            cat1 += Records[i].time
        }
        else if(Records[i].category == "Urgent & Not Important"){
            cat2 += Records[i].time
        }
        else if(Records[i].category == "Not Urgent & Important"){
            cat3 += Records[i].time
        }
        else if(Records[i].category == "Not Urgent & Not Important"){
            cat4 += Records[i].time
        }
        i++;
    }
    let total = cat1+cat2+cat3+cat4;
    console.log(cat1+" "+cat2+" "+cat3+" "+cat4);
    percent[0].innerText = `${Math.round((cat1/total)*100)} %`;
    hours[0].innerText = `${Math.round(cat1/60)} h ${cat1%60} m`;
    percent[1].innerText = `${Math.round((cat2/total)*100)} %`;
    hours[1].innerText = `${Math.round(cat2/60)} h ${cat2%60} m`;
    percent[2].innerText = `${Math.round((cat3/total)*100)} %`;
    hours[2].innerText = `${Math.round(cat3/60)} h ${cat3%60} m`;
    percent[3].innerText = `${Math.round((cat4/total)*100)} %`;
    hours[3].innerText = `${Math.round(cat4/60)} h ${cat4%60} m`;

    //---------Options-------------
    const options = document.querySelector('.DateOpt');
    let Str = '<option value="none" selected disabled hidden>Select an Option</option>';
    let temp = "";
    for (let index = 1; index < i; index++) {
        const element = Records[index].date;
        if(temp!=element)
            Str = Str.concat(`<option value="${element}"> ${element}</option>`);
        temp = element;
    } 
    options.innerHTML = Str;
    let dateTod = new Date();
    console.log(dateTod);
}
RenderAnalysis();

function UpdateAnalysis() {
    const dateIs = document.querySelector('.DateOpt').value;
    console.log(dateIs);
    const percent = document.querySelectorAll('.percentH');
    const hours = document.querySelectorAll('.HrsH');
    let Struct = JSON.parse(localStorage.getItem('Data-Storaging-Analysis'));
    let Records = Struct.Records;
    let cat1=0, cat2=0, cat3=0, cat4=0;
    let i=1;
    while(Records[i] != null){
        if(Records[i].date == dateIs){
            if(Records[i].category == "Urgent & Important"){
                cat1 += Records[i].time
            }
            else if(Records[i].category == "Urgent & Not Important"){
                cat2 += Records[i].time
            }
            else if(Records[i].category == "Not Urgent & Important"){
                cat3 += Records[i].time
            }
            else if(Records[i].category == "Not Urgent & Not Important"){
                cat4 += Records[i].time
            }
        }
        i++;
    }
    let total = cat1+cat2+cat3+cat4;
    console.log(cat1+" "+cat2+" "+cat3+" "+cat4);
    percent[0].innerText = `${Math.round((cat1/total)*100)} %`;
    hours[0].innerText = `${Math.round(cat1/60)} h ${cat1%60} m`;
    percent[1].innerText = `${Math.round((cat2/total)*100)} %`;
    hours[1].innerText = `${Math.round(cat2/60)} h ${cat2%60} m`;
    percent[2].innerText = `${Math.round((cat3/total)*100)} %`;
    hours[2].innerText = `${Math.round(cat3/60)} h ${cat3%60} m`;
    percent[3].innerText = `${Math.round((cat4/total)*100)} %`;
    hours[3].innerText = `${Math.round(cat4/60)} h ${cat4%60} m`;
}

//download(localStorage.getItem('Data-Storaging-Analysis'), "Testing.json", "application/json");

//function for downloading localStorage stuff

function download(data, strFileName, strMimeType) {

    var self = window, // this script is only for browsers anyway...
        defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
        mimeType = strMimeType || defaultMime,
        payload = data,
        url = !strFileName && !strMimeType && payload,
        anchor = document.createElement("a"),
        toString = function(a){return String(a);},
        myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
        fileName = strFileName || "download",
        blob,
        reader;
        myBlob= myBlob.call ? myBlob.bind(self) : Blob ;
  
    if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
        payload=[payload, mimeType];
        mimeType=payload[0];
        payload=payload[1];
    }


    if(url && url.length< 2048){ // if no filename and no mime, assume a url was passed as the only argument
        fileName = url.split("/").pop().split("?")[0];
        anchor.href = url; // assign href prop to temp anchor
          if(anchor.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
            var ajax=new XMLHttpRequest();
            ajax.open( "GET", url, true);
            ajax.responseType = 'blob';
            ajax.onload= function(e){ 
              download(e.target.response, fileName, defaultMime);
            };
            setTimeout(function(){ ajax.send();}, 0); // allows setting custom ajax headers using the return:
            return ajax;
        } // end if valid url?
    } // end if url?


    //go ahead and download dataURLs right away
    if(/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(payload)){
    
        if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
            payload=dataUrlToBlob(payload);
            mimeType=payload.type || defaultMime;
        }else{			
            return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
                navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
                saver(payload) ; // everyone else can save dataURLs un-processed
        }
        
    }//end if dataURL passed?

    blob = payload instanceof myBlob ?
        payload :
        new myBlob([payload], {type: mimeType}) ;


    function dataUrlToBlob(strUrl) {
        var parts= strUrl.split(/[:;,]/),
        type= parts[1],
        decoder= parts[2] == "base64" ? atob : decodeURIComponent,
        binData= decoder( parts.pop() ),
        mx= binData.length,
        i= 0,
        uiArr= new Uint8Array(mx);

        for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);

        return new myBlob([uiArr], {type: type});
     }

    function saver(url, winMode){

        if ('download' in anchor) { //html5 A[download]
            anchor.href = url;
            anchor.setAttribute("download", fileName);
            anchor.className = "download-js-link";
            anchor.innerHTML = "downloading...";
            anchor.style.display = "none";
            document.body.appendChild(anchor);
            setTimeout(function() {
                anchor.click();
                document.body.removeChild(anchor);
                if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
            }, 66);
            return true;
        }

        // handle non-a[download] safari as best we can:
        if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
            url=url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
            if(!window.open(url)){ // popup blocked, offer direct download:
                if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
            }
            return true;
        }

        //do iframe dataURL download (old ch+FF):
        var f = document.createElement("iframe");
        document.body.appendChild(f);

        if(!winMode){ // force a mime that will download:
            url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
        }
        f.src=url;
        setTimeout(function(){ document.body.removeChild(f); }, 333);

    }//end saver




    if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
        return navigator.msSaveBlob(blob, fileName);
    }

    if(self.URL){ // simple fast and modern way using Blob and URL:
        saver(self.URL.createObjectURL(blob), true);
    }else{
        // handle non-Blob()+non-URL browsers:
        if(typeof blob === "string" || blob.constructor===toString ){
            try{
                return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
            }catch(y){
                return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
            }
        }

        // Blob but not URL support:
        reader=new FileReader();
        reader.onload=function(e){
            saver(this.result);
        };
        reader.readAsDataURL(blob);
    }
    return true;
}; /* end download() */