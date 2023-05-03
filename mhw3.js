let switcher= document.querySelector("#icona");
let linee= document.querySelectorAll("#icona div");
let pulsanti= document.querySelector("#pulsanti");
let container=document.querySelector("#container_pulsanti");
console.log(pulsanti);
switcher.addEventListener("click", mostraPulsanti);


function mostraPulsanti(){
    if(pulsanti.style.display=="flex"){
        pulsanti.style.display="none";
        switcher.setAttribute("style","flex-direction:column");
        linee.forEach((element)=>{
            element.setAttribute("style","-webkit-transform:rotate(90deg);");
            element.style.margin="-12px 50px -12px -12px";
         })

    }
    else{
    pulsanti.style.display="flex";
    console.log(container);
    switcher.setAttribute("style","flex-direction:row");
    switcher.style.position="fixed";
    switcher.style.margin="-15px 550px"
    switcher.style.zIndex="2";
     linee.forEach((element)=>{
        element.setAttribute("style","-webkit-transform:rotate(180deg);");
        element.style.margin="4px";
     })
    

    }
}

// PARTE API ////////////////////////////////////////////////////////


function onResponse(response){
  
  return response.json();
}

function onJson(json){
 
  const news= document.querySelector("#news");
  const img= json[0].main_image;
  let pic= document.createElement("img");
  pic.src=img;
  let titolo= document.createElement("p");
  titolo.innerHTML=json[0].title;
  titolo.classList.add("titolo");
 
  
  news.append(pic);
  news.append(titolo);
  
  

  
  
}

const url = 'https://mmo-games.p.rapidapi.com/latestnews';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6c5ea973a4msh4c15a904865afa3p1bf18ejsn3a827cd09410',
		'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com'
	}
};

try {
	fetch(url, options).then(onResponse).then(onJson);
	
	
} catch (error) {
	console.error(error);
}

//API CON OAUTH2.0

//OTTENIAMO IL TOKEN 
let token;

function onTokenJson(json){
  token= json.access_token;
  
}
function onTokenResponse(response){
  return response.json();
}


fetch('https://oauth.battle.net/token', {
    method: 'POST',
    headers: {
        'Authorization': 'Basic ' + btoa('4a085a5cf0ca422684a57b24b8a1f384:5MgnvUSRJY1XEJd7whfNjZr0Fr3j3Svh')
    },
    body: new URLSearchParams({
        'grant_type': 'client_credentials'
    })
}).then(onTokenResponse).then(onTokenJson);


/////
const classifica= document.querySelector("#classifica");

function onBattleJson(json){

  console.log(classifica.childNodes);
 
  //pulisco prima la classifica
  classifica.innerHTML='';
  for(let i=0;i<3;i++){
    
    let giocatore= document.createElement("p");
    giocatore.innerHTML=json.row[i].data[4].string;
    
    giocatore.classList.add("top_tre");
    classifica.append(giocatore);
    
  }
}

function onBattleResponse(response){
  return response.json();
}




function mostraClassifica(e){
  
  let nome= e.srcElement.id;
  //console.log(nome);
  fetch('https://eu.api.blizzard.com/data/d3/season/28/leaderboard/rift-'+nome+'?access_token='+token,
  ).then(onBattleResponse).then(onBattleJson);
}


const classi= document.querySelectorAll(".job");
classi.forEach(classe=>{
     classe.addEventListener("click", mostraClassifica);
})      