import { FunctionComponent } from "preact";
import { FormTarea } from "../components/FormTartea.tsx";
import { tarea, Estado, Cr } from "../types.ts";
import { Signal, useSignal } from "@preact/signals";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { MostrarLista } from "../components/MostrarLista.tsx";
import { Actualizartarea } from "../components/Actualizartarea.tsx";


const Cruello: FunctionComponent = () => {

    const Lista_to_do = useSignal<tarea[]>([]);
    const Lista_in_progress = useSignal<tarea[]>([]);
    const Lista_in_review = useSignal<tarea[]>([]);
    const Lista_done = useSignal<tarea[]>([]);

    const crea = useSignal<Cr>(Cr.No_CREA);
    const tar = useSignal<tarea>({
        name:"",
        estado: Estado.TO_DO
    })

    const cambiaracrar = (p:Signal<Cr>) => {
        p.value = Cr.crear
    }

    return (
        <div>
        <div class={"fondo"}>
            <button class={"botoncrear"} onClick={()=>{cambiaracrar(crea)}}>Crear</button>
            <MostrarLista tar={tar} verdad={crea} to_do={Lista_to_do} in_p={Lista_in_progress} in_r={Lista_in_review} done={Lista_done}/>
            
        </div>

         { Cr.crear.includes(crea.value) &&
        <FormTarea  verdad={crea} to_do={Lista_to_do} in_p={Lista_in_progress} In_r={Lista_in_review} done={Lista_done}/>}

        {Cr.Actualizar.includes(crea.value) &&
        <Actualizartarea verdad={crea} to_do={Lista_to_do} in_p={Lista_in_progress} in_r={Lista_in_review} done={Lista_done} tar={tar}/>}

    
    </div>)
}


export default Cruello