const File=require("../models/ImageLinks");
const cloudinary=require("cloudinary").v2;

exports.localFileUpload=async (req,res)=>{
    try{
       const file=req.files.file;

       let path=__dirname+"/files/"+Date.now()+`.${file.name.split('.')[1]}`;

       file.mv(path,(err)=>{
        console.log(err);
       });

       res.json({
        success:true,
        message:"Local file uploaded successfully",
       })
    }catch(error){
        console.log(error);

    }
}

function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options={folder};
    if(quality){
        options.quality=quality;
    }
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUpload=async (req,res)=>{
    try{
        const {name}=req.body;
        // console.log(name);

        const file=req.files.imageFile;
        // console.log(file);

        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File Format not supported",
            })
        }

        const response=await uploadFileToCloudinary(file,"Codehelp");
        // console.log(response);

        const fileData=await File.create({
            name,
            url:response.url,
        })

        res.json({
            success:true,
            url:response.url,
            message:"Image successfully uploaded",
        })


    }catch(error){
           console.log(error);
           res.status(400).json({
            success:false,
            message:"Something went wrong!",
           })
    }
}


// exports.videoUpload=async (req,res)=>{
//     try{
//         const {name,tags,email}=req.body;
//         console.log(name,tags,email);

//         const file=req.files.videoFile;
//         //console.log(file);

//         const supportedTypes=["mp4","mov"];
//         const fileType=file.name.split('.')[1].toLowerCase();

//         if(!isFileTypeSupported(fileType,supportedTypes)){
//             return res.status(400).json({
//                 success:false,
//                 message:"File Format not supported",
//             })
//         }

//         const response=await uploadFileToCloudinary(file,"Codehelp");
//         console.log(response);

//         const fileData=await File.create({
//             name,
//             tags,
//             email,
//             imageUrl:response.url,
//         })

//         res.json({
//             success:true,
//             imageUrl:response.url,
//             message:"Video successfully uploaded",
//         })   
             
//     }catch(error){
//            console.log(error);
//            res.status(400).json({
//             success:false,
//             message:"Something went wrong!",
//            })
//     }
// }

// exports.imageSizeReducer=async (req,res)=>{
//     try{
//         const {name,tags,email}=req.body;
//         console.log(name,tags,email);

//         const file=req.files.imageFile;
//         console.log(file);

//         const supportedTypes=["jpg","jpeg","png"];
//         const fileType=file.name.split('.')[1].toLowerCase();

//         if(!isFileTypeSupported(fileType,supportedTypes)){
//             return res.status(400).json({
//                 success:false,
//                 message:"File Format not supported",
//             })
//         }

//         const response=await uploadFileToCloudinary(file,"Codehelp",70);
//         console.log(response);

//         const fileData=await File.create({
//             name,
//             tags,
//             email,
//             imageUrl:response.url,
//         })

//         res.json({
//             success:true,
//             imageUrl:response.url,
//             message:"Image successfully uploaded",
//         })


//     }catch(error){
//            console.log(error);
//            res.status(400).json({
//             success:false,
//             message:"Something went wrong!",
//            })
//     }
// }