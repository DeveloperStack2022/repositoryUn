
export interface findManyPersonas {
    id:number;
    nombres:string;
    apellidos:string;
    gradoPolicial:string;
    _count:{
      invitaciones:number;
    }
  }
  
export interface GET_DATA {
    findManyPersonas: findManyPersonas[]
}