import { toast } from 'react-toastify';

export const notify = (style,msg) =>{
    switch(style){
        case 'warning':
            toast.warn(msg,{position:toast.POSITION.TOP_RIGHT,autoClose:2000});
        break;
        case 'danger':
            toast.error(msg,{position:toast.POSITION.TOP_RIGHT,autoClose:2000});
        break;
        case 'success':
            toast.success(msg,{position:toast.POSITION.TOP_RIGHT,autoClose:3000});
        break;
        case 'basic':
            toast(msg,{position:toast.POSITION.TOP_RIGHT,autoClose:2000});
        break;
        default:
            break;
        }       
}

export const convertDate = (data) => { 
    return new Date(data).getDate()+"/"+new Date(data).getMonth()
    +"/"+new Date(data).getFullYear()+" at : "+new Date(data).getHours()
    +":"+new Date(data).getMinutes()+":"+new Date(data).getSeconds()
  }



