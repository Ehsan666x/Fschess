
// // Register the plugin with FilePond
// FilePond.registerPlugin(FilePondPluginImagePreview);

// // Get a reference to the file input element
// const inputElement = document.querySelector('input[type="file"]');

// // Create the FilePond instance
// const pond = FilePond.create(inputElement);



const inputElement = document.querySelector('input[type="file"]');


FilePond.registerPlugin(
    
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    // FilePondPluginImageCrop,
    FilePondPluginFileValidateSize,
    // FilePondPluginImageTransform
    FilePondPluginFileValidateType
);



FilePond.setOptions({
    stylePanelAspectRatio: 100 / 100,
    //stylePanelAspectRatio:10/10,
    //imageResizeTargetWidth:50,
    //imageResizeTargetHeight:10,
    maxFileSize:200000,
    acceptedFileTypes:['image/*'],
})

const pond = FilePond.create( 
    inputElement,
    {labelIdle:	'<span class="filepond--label-action"> <h1>Change</h1> </span>'}
);

const froot = document.querySelector('.filepond--root');
froot.addEventListener('FilePond:addfile',async function(e){
  let f=pond.getFile().file;
  let data=new FormData();
  
  data.append('infile',f);
//   for (var p of data) {
//     console.log(p);
//   }
  fetch('http://localhost/profiles',{
    method: 'POST',
    body:data
  }).then(r=>{if(r.ok){window.location=r.url}}).catch(er=>{console.log(er)})
})

//FilePond.parse(document.body);


// const submit=document.getElementById('sub');
// submit.addEventListener('click',function(){
//     console.log(inputElement.files);
// })