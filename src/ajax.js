/* eslint-disable */
// Ajax Requests (You don't need jQuery)[https://blog.garstasio.com/you-dont-need-jquery/ajax]

// GETting
var xhr = new XMLHttpRequest();
xhr.open('GET', 'myserver/username?id=some-unique-id');
xhr.onload = function () {
    if (xhr.status === 200) {
        alert('User\'s name is ' + xhr.responseText);
    } else {
        alert('Request failed. Returned status of' + xhr.status);
    }
};
xhr.send();

// POSTing
var newName='John Smith',
    xhr=new XMLHttpRequest();
xhr.open('POST','myserver/username?id=some-unique-id');
xhr.setRequestHeader('Content-Type','appliction/x-www-form-urlencodeed');
xhr.onload=function () {
    if (xhr.status===200 && xhr.responseText!==newName) {
        alert('Somethinf went wrong. Name is now' +xhr.responseText);
    } else if(xhr.status!==200){
        alert('Request failed. Returned status of '+xhr.status);
    }
};
xhr.send(encodeURI('name='+newName));

// URL Encodeing
function param(object) {
    var encodeedString='';
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (encodeedString.length>0) {
                encodeedString+='&';
            }
            encodeedString+=encodeURI(prop+'='+object[prop]);
        }
    }
    return encodeedString;
}

// Sending and Receiving JSON
var xhr=new XMLHttpRequest();
xhr.open('PUT','myserver/use/1234');
xhr.setRequestHeader('Content-Type','application/json');
xhr.onload=function () {
    if (xhr.status===200) {
        var userInfo=JSON.parse(xhr.responseText);
    }
};
xhr.send(JSON.stringify({
    name:'John Smith',
    age:34
}));

// Uploading Files
// you should use this markup <input type="file" id="test-input">
var formData=new FormData(),
    file=document.getElementById('test-input').files[0],
    xhr=new XMLHttpRequest();
formData.append('file',file);
xhr.open('POSt','myserver/uploads');
xhr.send(formData);

var file=document.getElementById('text-input').files[0],
    xhr=new XMLHttpRequest();
xhr.open('POST','myserver/uploads');
xhr.setRequestHeader('Content-type',file.type);
xhr.send(file);

// CORS, Cross Resource Sharing(sending cross-domin ajax requests)
var xhr=new XMLHttpRequest();
xhr.open('POST','http://someotherdomain.com');
xhr.withCredentials=true;
xhr.setRequestHeader('Content-type','text/plain');
xhr.send('sometext');

// JOSNP, JavaScript Object Notation with Padding
window.myJsonpCallback=function (data) {
    // handle requested data from server
};

var scriptEl=document.createElement('script');
scriptEl.setAttribute('src','http://jsonp-aware-endpoint.com/user?callback=myJsonCallback&id=123');
document.body.appendChild(scriptEl);