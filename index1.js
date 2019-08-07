const search=()=>{
    var x=document.getElementById('search').value;
    fetch(`http://localhost:3000/shopping?productName=${x}`)
    .then(response=>response.json())
    .then((data)=>{
        showResult(data[0]);
    })
    xhttp=false;
    if(window.XMLHttpRequest)
    {
        xhttp=new XMLHttpRequest();
    }
    else
    {
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    //xhttp.overrideMimeType("application/json");
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        showName(this.responseText);
    }
 };
    xhttp.open("GET", "http://localhost:7002/gettingUsername", true);
    xhttp.send();
}
var buyname,buyname1,buyname2;
function showName(Names)
{
    buyname=Names;
    let temp=``;
    temp+=`<h1>username: ${Names}</h1>`
    document.getElementById('usernames').innerHTML=temp;
}
function showResult(values){
    buyname1=values.productName;
    buyname2=values.price;
    let template=``;
    template+=`
    <h3>productName:${values.productName}</h3>
    <br/>
    <h3>from:${values.from}</h3>
    <br/>
    <h3>nutrients:${values.nutrients}</h3>
    <br/>
    <h3>price:${values.price}</h3>
    <br/>
    <h3>organic:${values.organic}</h3>
    <br/>
    <h3>description:${values.description}</h3>`
    document.getElementById('result').innerHTML=template;
}
function buy(){
    var quantity=document.getElementById('quantity').value;
    window.location=(`http://localhost:7002/buy/${buyname}/${buyname1}/${quantity}/${buyname2}`);
}
