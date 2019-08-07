xhttp=false;
if(window.XMLHttpRequest)
{
    xhttp=new XMLHttpRequest();
}
else
{
    xhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
let template=[];
let k=0;
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
    template[k++]=this.responseText;
}
};
xhttp.open("GET", "http://localhost:7002/getFinalname", false);
xhttp.send();
xhttp.open("GET", "http://localhost:7002/getFinalprice", false);
xhttp.send();
let template1=``;
template1+=`
<h1>products: ${template[0]}</h1>
<br/>
<h1>Total: ${template[1]}</h1>`
document.getElementById('result').innerHTML=template1;