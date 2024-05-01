import { FunctionComponent } from "preact";
import { tarea, Estado, Cr } from "../types.ts";
import { Signal } from "@preact/signals";
import { useState } from "preact/hooks";

type Crar = {
    verdad: Signal<Cr>
    to_do: Signal<tarea[]>
    in_p: Signal<tarea[]>
    In_r: Signal<tarea[]>
    done: Signal<tarea[]>
}

export const FormTarea:FunctionComponent<Crar> = ({verdad, to_do, in_p, In_r, done}) => {
    const [v, setv] = useState<boolean>(false)
    const [tar, settar] = useState<tarea>({
        name: "",
        estado: Estado.TO_DO
    })

    const nocrea = (pag: Signal<Cr>) => {
        pag.value = Cr.No_CREA;
    }


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
    
    const añadir = (t: tarea) => {
        if(t.estado == Estado.TO_DO){
            to_do.value = [...to_do.value, t]; 
        }
        else if(t.estado == Estado.IN_PROGRESS){
            in_p.value = [...in_p.value, t];
        }
        else if(t.estado == Estado.IN_REVIEW){
            In_r.value = [...In_r.value, t];
        }
        else if(t.estado == Estado.DONE){
            done.value = [...done.value, t];
        }

        settar({
            name: "",
            estado: Estado.TO_DO
        });
    }

    return (
    <div >
        <div class= "fondo2" onClick={()=>{nocrea(verdad)}} />
        
        <form onSubmit={()=>{nocrea(verdad)}}>
            <div class = "tarea">
                <input type={"text"} placeholder={"Nombre de la tarea"} value={tar.name} onInput={(e)=> admintarea(e.currentTarget.value) }/><br/>
                <select value={tar.estado} onChange={(e)=> admintarea2(e.currentTarget.value)}>
                    <option>{Estado.TO_DO}</option>
                    <option>{Estado.IN_PROGRESS}</option>
                    <option>{Estado.IN_REVIEW}</option>
                    <option>{Estado.DONE}</option>
                </select><br/>
             <button onClick={()=> {añadir(tar)}} type={"submit"} disabled = {v === false}>Crear</button> 
            </div>
        </form>
    </div>)
}