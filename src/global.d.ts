export {}
declare global{
    type Tpost = {
        id?:string,
        title: string;
        text: string;
    } 
    type TappropriatePostEmbedProp={
        post:Tpost
    }
}