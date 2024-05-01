export enum Estado {
    TO_DO = "To_do",
    IN_PROGRESS = "In_progress",
    IN_REVIEW = "In_review",
    DONE = "Done"  
}

export enum Cr {
    crear = "Crear",
    No_CREA = "no_crea",
    Actualizar = "actulizar"
}


export type tarea = {
    name: string,
    estado: Estado
}
