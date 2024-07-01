export interface Post{
    id:string;
    title:string;
    content:string;
    imagePath:string;
    link:string;
    creator:string;
}

export interface updatePost{
    id:string;
    title:string;
    content:string;
    imagePath:string;
    link:string;
    advantages:Advantage[];
    keyFeatures:string[];
    useCases:UseCases;
    postCategory:string
}


export interface Advantage{
    advantage:string,
    discription:string,
}

export interface  UseCases{
    customerSupport:string,
    contentCreation:string,
    codingAssistance:string,
}

export interface category{
    id:string,
    name:string
}