const uploadBox = document.querySelector(".upload-box");
const previewImg =  uploadBox.querySelector("img"); // it will select the first img tag element in upload box
const fileInput = uploadBox.querySelector("input"); // it will select the first input tag element in upload box

const width = document.querySelector(".width input");
const height=document.querySelector(".height input");
const button = document.querySelector(".wrapper button");

const ratioInput = document.querySelector(".ratio input");

let ogImageRatio;


//function to load a image for res
const loadFile = (e) => { // here e is an event object which is passed as argument in loadFile function
    const file = e.target.files[0]; // getting first user selected file
    if(!file) return; // return if user hasn't selected any file
    previewImg.src = URL.createObjectURL(file); //it creates a temporary URL for selected file and sets it as the source of previewImg

    previewImg.addEventListener("load", () => { // once img loaded
        width.value=previewImg.naturalWidth;
        height.value=previewImg.naturalHeight;
        ogImageRatio = width/height;
        // const aspectRatio = previewImg.width / previewImg.height; // getting aspect ratio of the image
        document.querySelector(".wrapper").classList.add("active");
    });
   
}





//Function for downloading the image
const downloadImg  = ()=>{ 
    const canvas = document.createElement("canvas");  //new HTML <canvas> element is created dynamically 
    const ctx = canvas.getContext("2d");   //retrieves the 2D drawing context from the canvas element

    canvas.width = width.value;  
    canvas.height = height.value;  

    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    const reduceQuality = document.querySelector(".quality input").checked; //check if reduced quality check box is checked or not
    const quality = reduceQuality ? 0.2 : 1.0; //kya checkbox checked hai agr checked hai to quality ko 20% kr do varna same hi rahene do

    const link = document.createElement("a");  // here we are creating an anchor tag
    link.href = canvas.toDataURL('image/png',quality);  
    link.download= new Date().getTime();
    link.click(); 
}

width.addEventListener("input",()=>{
    previewImg.style.width = width.value + "px";
});
height.addEventListener("input",()=>{
    previewImg.style.height = height.value + "px";
});


height.addEventListener("keyup",()=>{
    const width = ratioInput.checked? height.value * ogImageRatio : width.value;
    width.value=Math.floor(width);

});
width.addEventListener("keyup",()=>{
    const height = ratioInput.checked?width.value/ogImageRatio:height.value;
    height.value = Math.floor(height);

});




button.addEventListener("click",downloadImg);

fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click()); // is event is browse to upload pe kahi pe bhi click krne m file upload ka option aa jayega