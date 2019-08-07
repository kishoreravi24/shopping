console.log("working");
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
let template=["username","fruitname","quantity"];
var k=0;
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
    template[k++]=this.responseText;
}
};
xhttp.open("GET", "http://localhost:7002/gettingAllname", false);
xhttp.send();
xhttp.open("GET","http://localhost:7002/gettingAllfruitname",false);
xhttp.send();
xhttp.open("Get","http://localhost:7002/gettingAllquantity",false);
xhttp.send();
xhttp.open("Get","http://localhost:7002/gettingAllprice",false);
xhttp.send();
let total=Number(template[2])*Number(template[3]);
console.log(total);
let template1=``;
template1+=`
<h1>username: ${template[0]}</h1>
<br/>
<h1>fruitname: ${template[1]}</h1>
<br/>
<h1>quantity: ${template[2]}</h1>
<br/>
<h1>price: ${template[3]}</h1>
<br/>
<h1>Total: ${total}</h1>
`
document.getElementById("result").innerHTML=template1;
function addExtra()
{
    window.location=(`http://localhost:7002/cart/${template[1]}/${total}`);
}
function purchase(){
    window.location=(`http://localhost:7002/cart1/${template[1]}/${total}`);
}