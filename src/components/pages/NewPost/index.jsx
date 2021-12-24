import {useForm} from "react-hook-form";
import {useHistory}from "react-router-dom";
import {getAuth} from 'firebase/auth';
import "./styles.css";
import {useState} from "react";



export const NewPost = () =>{
    const {register, handleSubmit}=useForm();
    const history=useHistory();

    const SubmitPost=async(formVals)=>{
        const formattedData={
            fields:{
                id:{
                    stringValue: formVals.id
                },
               
                caption:{
                    stringValue: formVals.caption
                },

                email:{
                    stringValue: getAuth().currentUser.email
                },
                image:{
                    stringValue: formVals.image
                }
            }
        } 
        console.log(formVals, formattedData);
        try{
                 const response= await fetch('https://firestore.googleapis.com/v1/projects/instagram-ae65b/databases/(default)/documents/posts/',
          {
            headers: {
                'Content-Type': 'application/json'
            },
                method: "POST",
                body: JSON.stringify(formattedData)
            })
            history.push('/');
            console.log(response);
            }catch (error){
                console.log("error",error);
            }
            
        };
            
    return(
        <div className="post-page">
        <form className="form-layout" onSubmit={handleSubmit(SubmitPost)}>
        <h2>Submit a new post</h2>
        <br/>
        <label htmlFor="image">Image Url</label>
        <input
        {...register("image")}
        name="image"
        required
        />
        <label htmlFor="caption">Caption</label>
        <input {...register("caption")}
        name="caption"
        required
        />
        <label htmlFor="id">Unique ID</label>
        <input {...register("id")}
        name="id"
        required
        />
    
        
        <input type="submit" value="submit post"/>
        <br/>
        </form>
        
        </div>
        ); };
   