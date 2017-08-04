
export function $inputFocus(id) {
    let inputs=document.getElementById(id).getElementsByTagName("input"); 

    function keyDown(event) { 
        let focus = document.activeElement;
            event = window.event || event,
            key = event.keyCode; 
        if(!document.getElementById(id).contains(focus)) return; 
        
        console.log(key);
        // debugger
        for(var i=0; i<inputs.length; i++) { 
            if(inputs[i]===focus) break; 
        } 
        switch(key) { 
            case 37: 
                if(i>0) inputs[i-1].focus(); 
                break; 
            // case 38: 
            //     if(i-4>=0) inputs[i-4].focus(); 
            //     break; 
            case 39: 
            case 13:
                if(i<inputs.length-1) inputs[i+1].focus(); 
                break; 
            // case 40: 
            //     if(i+4 <inputs.length) inputs[i+4].focus(); 
            //     break; 
        } 
    } 
}