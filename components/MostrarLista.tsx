import { FunctionComponent } from "preact";
import { Cr, Estado, tarea } from "../types.ts";
import { Signal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

type Señales = {
    verdad: Signal<Cr>
    to_do : Signal<tarea[]>
    in_p : Signal<tarea[]>
    in_r : Signal<tarea[]>
    done : Signal<tarea[]>
    tar : Signal<tarea>
}

export const MostrarLista: FunctionComponent<Señales> = ({to_do, in_p, in_r, done, verdad, tar}) => {
    
   
    const cambiar_actulizar = (c: Signal<Cr>, e: tarea) => {
        c.value = Cr.Actualizar
        tar.value=e
    }

    return(
        <div class={"crearceldas"}>
            <div>
                <h1>To_Do</h1>
                <div class={"lista"}>
                    <ul class={"cont2"}> 
                    {to_do.value.map((e)=>
                        <div class={"cont"} onClick={()=>cambiar_actulizar(verdad, e)} key={e}>
                            <h1>{e.name}</h1>
                            <p>Estado: {e.estado}</p>
                        </div>
                    )}
                    </ul>
                </div>
            </div>
            <div>
                <h1>In_Progress</h1>
                <div class={"lista"}>
                    <ul class={"cont2"}> 
                    {in_p.value.map((e)=>
                        <div class={"cont"} onClick={()=>cambiar_actulizar(verdad, e)} key={e}>
                            <h1>{e.name}</h1>
                            <p>Estado: {e.estado}</p>
                        </div>
                    )}
                    </ul>
                </div>
            </div>
            <div>
                <h1>In_Review</h1>
                <div class={"lista"}>
                <ul class={"cont2"}> 
                    {in_r.value.map((e)=>
                        <div class={"cont"} onClick={()=>cambiar_actulizar(verdad, e)} key={e}>
                            <h1>{e.name}</h1>
                            <p>Estado: {e.estado}</p>
                        </div>
                    )}
                    </ul>
                </div>
            </div>
            <div>
                <h1>Done</h1>
                <div class={"lista"}>
                <ul class={"cont2"}> 
                    {done.value.map((e)=>
                        <div class={"cont"} onClick={()=>cambiar_actulizar(verdad, e)} key={e}>
                            <h1>{e.name}</h1>
                            <p>Estado: {e.estado}</p>
                        </div>
                    )}
                    </ul>
                </div>
            </div>
            </div>
    )
}