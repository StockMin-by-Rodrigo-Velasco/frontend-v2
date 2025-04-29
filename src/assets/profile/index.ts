import img0 from './img0.svg';
import img1 from './img1.svg';
import img2 from './img2.svg';
import img3 from './img3.svg';
import img4 from './img4.svg';

export function perfilImg(img: string): string{
    switch (img) {
        case 'img0': return img0;
        case 'img1': return img1;
        case 'img2': return img2;
        case 'img3': return img3;
        case 'img4': return img4; 
    
        default: return img1
    }
}

export function perfilColor(color: string): string{
    switch (color) {
        case 'color0': return '#000000';
        case 'color1': return '#FF7F50';
        case 'color2': return '#DE3163';
        case 'color3': return '#F564F1';
        case 'color4': return '#29D567'; 
    
        default: return '#FF7F50'
    }
}