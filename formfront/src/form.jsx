import "./index.css"
import { useState } from "react";
function Form(){
    const [email,setemail]=useState(null)
    const [name,setname]=useState(null)
    const [number,setnumber]=useState(null)
    const [warning,setwarning]=useState(false)
    const [final,setfinal]=useState(null)
    const[loder,setloader]=useState(false)
    console.log(loder)

    async function setdata(e) {
        e.preventDefault(); 
        

     if(email&&name&&number){
       
        
        console.log(`name=${name} email=${email} number${number}`)
        setloader(true)
        console.log("this",loder)
        setwarning(true)
        console.log("that",loder)
        const response =await fetch('https://formserver.vercel.app/add',{
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
            setfinal("Registered")
        } ).finally(setloader(false))  
     }else{
        setwarning(true)
        setloader(false)
     }
    }

    return(
        <>
        {final==="Registered"?(<>
        <h1 id="sel">Registered</h1>
        <div id="data"><h2 id="nam">Name         : {name}</h2>
        <h2 id="mail">E-mail      : {email}</h2>
        <h2 id="pho">Pho-Number   : {number}</h2></div>
        </>):(<>
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
        {final?<h2 id="already">Already Registered</h2>:""}
        {loder?(<><h3>Loading...</h3></>):""}
        </>)}
        </>
    )
}
export default Form;