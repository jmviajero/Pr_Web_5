import { Signal } from "@preact/signals";
import { FunctionComponent } from "preact";
import { Cr, Estado, tarea } from "../types.ts";
import { useState } from "preact/hooks";

type Señales = {
    verdad: Signal<Cr>
    to_do : Signal<tarea[]>
    in_p : Signal<tarea[]>
    in_r : Signal<tarea[]>
    done : Signal<tarea[]>
    tar : Signal<tarea>
}



export const Actualizartarea : FunctionComponent<Señales> = ({verdad, to_do, in_p, in_r, done, tar}) => {

    function noactualiza(verdad: Signal<Cr>) {
        verdad.value=Cr.No_CREA
    }
    const [v, setv] = useState<boolean>(false)
    const [tar2, settar] = useState<tarea>({
        name: tar.value.name,
        estado: Estado.TO_DO
    })

    
    const admintarea = (e:string) => {
        settar((p)=>({
            ...p,
            name: e
        }))
        setv(true)
    }

    
    const admintarea2 = (e:string) => {
        if(Estado.TO_DO.includes(e)){
            settar((p)=>({
                ...p,
                estado: Estado.TO_DO
            }))
        }
        else if(Estado.IN_PROGRESS.includes(e)){
            settar((p)=>({
                ...p,
                estado: Estado.IN_PROGRESS
            }))
        }
        else if(Estado.IN_REVIEW.includes(e)){
            settar((p)=>({
                ...p,
                estado: Estado.IN_REVIEW
            }))
        }
        else if(Estado.DONE.includes(e)){
            settar((p)=>({
                ...p,
                estado: Estado.DONE
            }))
        }
    }

    const actualizar = (t: tarea) => {
        if(t.estado == Estado.TO_DO){
            to_do.value = [...to_do.value, t]; 
        }
        else if(t.estado == Estado.IN_PROGRESS){
            in_p.value = [...in_p.value, t];
        }
        else if(t.estado == Estado.IN_REVIEW){
            in_r.value = [...in_r.value, t];
        }
        else if(t.estado == Estado.DONE){
            done.value = [...done.value, t];
        }

        if(tar.value.estado == Estado.TO_DO){
            to_do.value.splice(to_do.value.indexOf(tar.value),1)
        }
        if(tar.value.estado == Estado.IN_PROGRESS){
            in_p.value.splice(in_p.value.indexOf(tar.value),1)
        }
        if(tar.value.estado == Estado.IN_REVIEW){
            in_r.value.splice(in_r.value.indexOf(tar.value),1)
        }
        if(tar.value.estado == Estado.DONE){
            done.value.splice(done.value.indexOf(tar.value),1)
        }

        settar({
            name: "",
            estado: Estado.TO_DO
        });
    }

    return(<div>
        <div class= "fondo2" onClick={()=>{noactualiza(verdad)}} />
        
        <form onSubmit={()=>{noactualiza(verdad)}}>
            <div class = "tarea2">
                <input type={"text"} placeholder={"Nombre de la tarea"} value={tar2.name} onInput={(e)=> admintarea(e.currentTarget.value) }/><br/>
                <select value={tar2.estado} onChange={(e)=> admintarea2(e.currentTarget.value)}>
                    <option>{Estado.TO_DO}</option>
                    <option>{Estado.IN_PROGRESS}</option>
                    <option>{Estado.IN_REVIEW}</option>
                    <option>{Estado.DONE}</option>
                </select><br/>
             <button onClick={()=> {actualizar(tar2)}} type={"submit"} >Actualizar</button> 
            </div>
        </form>

    </div>)
}