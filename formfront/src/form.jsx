import "./index.css"
import { useState } from "react";
function Form(){
    const [email,setemail]=useState(null)
    const [name,setname]=useState(null)
    const [number,setnumber]=useState(null)
    const [warning,setwarning]=useState(false)
    const [final,setfinal]=useState(null)

    async function setdata(e) {
        e.preventDefault(); 

     if(email&&name&&number){
        setwarning(false)
        console.log(`name=${name} email=${email} number${number}`)
        const response =await fetch('http://localhost:7000/add',{
            method:'POST',
            body:JSON.stringify({
                name,
                email,
                number
            }),
            headers:{
                "Content-Type":'application/json'
            }
        }).then(res=>res.json()).then((data=>
        {if(data){
            console.log(data)
            setfinal(data)
        }else{setfinal("Registered")}})).catch((e)=>{
            setfinal("registered")
        } )     
     }else{
        setwarning(true)
     }
    }

    return(
        <>
        <form>
            <div id="par">
           <div id="namediv">
           <label className="name" for="name">Enter your name</label ><br/>
           <input onChange={(e)=>{setname(e.target.value)}} type="text" placeholder="eg..Toufiq" id="name" className={warning?"no":"warn"}/><br/>
           </div>
               <div id="emaildiv">
               <label className="email" for="email">Enter your Email</label><br/>
               <input onChange={(e)=>setemail(e.target.value)} type="email" placeholder="eg..Toufiq@gmail.com" id="email" className={warning?"no":"warn"}/><br/>
               </div>
                <div id="numberdiv">
                <label className="number" for="email">Enter your Number</label><br/>
                <input onChange={(e)=>setnumber(e.target.value)} type="number" placeholder="xxxxxxxxxx" id="number" className={warning?"no":"warn"}/><br/>

                </div>
                <button onClick={setdata}>Submit</button>
            </div>
        </form>
       {final?<h2>{final}</h2>:""}
        </>
    )
}
export default Form;